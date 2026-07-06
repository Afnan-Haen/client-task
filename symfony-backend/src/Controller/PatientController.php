<?php

namespace App\Controller;

use App\Entity\Patient;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class PatientController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/patient/profile', name: 'api_patient_create_profile', methods: ['POST'])]
    public function CreatePatientProfile(Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true);

        $full_name = $input['full_name'] ?? '';
        $phone_number = $input['phone_number'] ?? '';
        $age = $input['age'] ?? '';
        $gender = $input['gender'] ?? '';
        $condition = $input['condition'] ?? '';
        $user_id = $input['user_id'] ?? '';

        if (empty($full_name) || empty($phone_number) || empty($age) || empty($gender) || empty($condition) || empty($user_id)) {
            return $this->json(["message" => "Missing fields"], 400);
        }

        try {
            $userRepository = $this->entityManager->getRepository(User::class);
            $user = $userRepository->find($user_id);

            if (!$user) {
                return $this->json(["message" => "User not found"], 404);
            }

            $patient = new Patient();
            $patient->setUser($user);
            $patient->setFullName($full_name);
            $patient->setPhoneNumber($phone_number);
            $patient->setAge((int) $age);
            $patient->setGender($gender);
            $patient->setCondition($condition);

            $this->entityManager->persist($patient);
            $this->entityManager->flush();

            return $this->json(["message" => "Patient profile created successfully"], 201);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/patients', name: 'api_patients_get_all', methods: ['GET'])]
    public function getAllPatients(): JsonResponse
    {
        try {
            $patientRepository = $this->entityManager->getRepository(Patient::class);
            $patients = $patientRepository->findAll();
            
            $data = array_map(function(Patient $patient) {
                return [
                    'id' => $patient->getId(),
                    'user_id' => $patient->getUser()->getId(),
                    'full_name' => $patient->getFullName(),
                    'phone_number' => $patient->getPhoneNumber(),
                    'age' => $patient->getAge(),
                    'gender' => $patient->getGender(),
                    'condition' => $patient->getCondition(),
                    'created_at' => $patient->getCreatedAt()->format('Y-m-d H:i:s')
                ];
            }, $patients);

            return $this->json($data);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/patient/profile/{user_id}', name: 'api_patient_get_profile', methods: ['GET'])]
    public function getPatientProfileByUserId(int $user_id): JsonResponse
    {
        try {
            $patientRepository = $this->entityManager->getRepository(Patient::class);
            $patient = $patientRepository->findOneBy(['user' => $user_id]);
            
            if ($patient) {
                return $this->json([
                    'id' => $patient->getId(),
                    'user_id' => $patient->getUser()->getId(),
                    'full_name' => $patient->getFullName(),
                    'phone_number' => $patient->getPhoneNumber(),
                    'age' => $patient->getAge(),
                    'gender' => $patient->getGender(),
                    'condition' => $patient->getCondition(),
                    'created_at' => $patient->getCreatedAt()->format('Y-m-d H:i:s')
                ]);
            } else {
                return $this->json(["message" => "Profile not found"], 404);
            }
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }
}
