<?php

namespace App\Service;

use App\Entity\Request as AppointmentRequest;
use App\Entity\User;
use App\Entity\Patient;
use Doctrine\ORM\EntityManagerInterface;
use InvalidArgumentException;
use RuntimeException;

class RequestService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function createRequest(array $input): void
    {
        $patient_id = $input['patient_id'] ?? '';
        $doctor_id = $input['doctor_id'] ?? '';

        if (empty($patient_id) || empty($doctor_id)) {
            throw new InvalidArgumentException("Missing patient_id or doctor_id");
        }

        $userRepository = $this->entityManager->getRepository(User::class);
        $patient = $userRepository->find($patient_id);
        $doctor = $userRepository->find($doctor_id);

        if (!$patient || !$doctor) {
            throw new RuntimeException("Patient or Doctor not found", 404);
        }

        $requestRepository = $this->entityManager->getRepository(AppointmentRequest::class);
        
        $existingRequest = $requestRepository->findOneBy([
            'patient' => $patient,
            'doctor' => $doctor
        ]);
        
        if ($existingRequest) {
            throw new RuntimeException("Request already exists", 409);
        }

        $appointmentRequest = new AppointmentRequest();
        $appointmentRequest->setPatient($patient);
        $appointmentRequest->setDoctor($doctor);

        $this->entityManager->persist($appointmentRequest);
        $this->entityManager->flush();
    }

    public function getDoctorRequests(int $doctor_id): array
    {
        $userRepository = $this->entityManager->getRepository(User::class);
        $doctorUser = $userRepository->find($doctor_id);

        if (!$doctorUser) {
            throw new RuntimeException("Doctor not found", 404);
        }

        $requestRepository = $this->entityManager->getRepository(AppointmentRequest::class);
        $patientRepository = $this->entityManager->getRepository(Patient::class);
        
        $requests = $requestRepository->findBy(['doctor' => $doctorUser], ['createdAt' => 'DESC']);
        
        $data = [];
        foreach ($requests as $req) {
            $patientUser = $req->getPatient();
            $patientProfile = $patientRepository->findOneBy(['user' => $patientUser]);
            
            $data[] = [
                'id' => $req->getId(),
                'status' => $req->getStatus(),
                'created_at' => $req->getCreatedAt()->format('Y-m-d H:i:s'),
                'full_name' => $patientProfile ? $patientProfile->getFullName() : null,
                'age' => $patientProfile ? $patientProfile->getAge() : null,
                'gender' => $patientProfile ? $patientProfile->getGender() : null,
                'condition' => $patientProfile ? $patientProfile->getCondition() : null,
                'phone_number' => $patientProfile ? $patientProfile->getPhoneNumber() : null,
                'email' => $patientUser->getEmail()
            ];
        }
        
        return $data;
    }

    public function updateRequestStatus(int $id, array $input): void
    {
        $status = $input['status'] ?? '';

        if (empty($status)) {
            throw new InvalidArgumentException("Missing status");
        }

        $requestRepository = $this->entityManager->getRepository(AppointmentRequest::class);
        $appointmentRequest = $requestRepository->find($id);

        if (!$appointmentRequest) {
            throw new RuntimeException("Request not found", 404);
        }

        $appointmentRequest->setStatus($status);
        $this->entityManager->flush();
    }
}
