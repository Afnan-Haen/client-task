<?php

namespace App\Controller;

use App\Entity\Request as AppointmentRequest;
use App\Entity\User;
use App\Entity\Patient;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class RequestController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/requests', name: 'api_requests_create', methods: ['POST'])]
    public function createRequest(Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true);

        $patient_id = $input['patient_id'] ?? '';
        $doctor_id = $input['doctor_id'] ?? '';

        if (empty($patient_id) || empty($doctor_id)) {
            return $this->json(["message" => "Missing patient_id or doctor_id"], 400);
        }

        try {
            $userRepository = $this->entityManager->getRepository(User::class);
            $patient = $userRepository->find($patient_id);
            $doctor = $userRepository->find($doctor_id);

            if (!$patient || !$doctor) {
                return $this->json(["message" => "Patient or Doctor not found"], 404);
            }

            $requestRepository = $this->entityManager->getRepository(AppointmentRequest::class);
            
            // Check if request already exists
            $existingRequest = $requestRepository->findOneBy([
                'patient' => $patient,
                'doctor' => $doctor
            ]);
            
            if ($existingRequest) {
                return $this->json(["message" => "Request already exists"], 409);
            }

            $appointmentRequest = new AppointmentRequest();
            $appointmentRequest->setPatient($patient);
            $appointmentRequest->setDoctor($doctor);

            $this->entityManager->persist($appointmentRequest);
            $this->entityManager->flush();

            return $this->json(["message" => "Request created successfully"], 201);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/doctor/requests/{doctor_id}', name: 'api_doctor_requests_get', methods: ['GET'])]
    public function getDoctorRequests(int $doctor_id): JsonResponse
    {
        try {
            $userRepository = $this->entityManager->getRepository(User::class);
            $doctorUser = $userRepository->find($doctor_id);

            if (!$doctorUser) {
                return $this->json(["message" => "Doctor not found"], 404);
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
            
            return $this->json($data);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/requests/{id}/status', name: 'api_request_status_update', methods: ['PUT'])]
    public function updateRequestStatus(int $id, Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true);
        $status = $input['status'] ?? '';

        if (empty($status)) {
            return $this->json(["message" => "Missing status"], 400);
        }

        try {
            $requestRepository = $this->entityManager->getRepository(AppointmentRequest::class);
            $appointmentRequest = $requestRepository->find($id);

            if (!$appointmentRequest) {
                return $this->json(["message" => "Request not found"], 404);
            }

            $appointmentRequest->setStatus($status);
            $this->entityManager->flush();

            return $this->json(["message" => "Request status updated"]);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }
}
