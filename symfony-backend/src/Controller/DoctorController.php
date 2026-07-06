<?php

namespace App\Controller;

use App\Entity\Doctor;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class DoctorController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/doctor/profile', name: 'api_doctor_create_profile', methods: ['POST'])]
    public function CreateDocProfile(Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true);
        
        $specialization = $input['specialization'] ?? '';
        $experience = $input['experience'] ?? '';
        $available_from = $input['available_from'] ?? '';
        $available_to = $input['available_to'] ?? '';
        $about = $input['about'] ?? '';
        $user_id = $input['user_id'] ?? '';

        if (empty($specialization) || empty($experience) || empty($available_from) || empty($available_to) || empty($about) || empty($user_id)) {
            return $this->json(["message" => "Missing fields"], 400);
        }

        try {
            $userRepository = $this->entityManager->getRepository(User::class);
            $user = $userRepository->find($user_id);
            
            if (!$user) {
                return $this->json(["message" => "User not found"], 404);
            }

            $doctor = new Doctor();
            $doctor->setUser($user);
            $doctor->setSpecialization($specialization);
            $doctor->setExperience((int) $experience);
            $doctor->setAvailableFrom($available_from);
            $doctor->setAvailableTo($available_to);
            $doctor->setAbout($about);

            $this->entityManager->persist($doctor);
            $this->entityManager->flush();

            return $this->json(["message" => "Doctor profile created successfully"], 201);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/doctors', name: 'api_doctors_get_all', methods: ['GET'])]
    public function getAllDoctors(): JsonResponse
    {
        try {
            $doctorRepository = $this->entityManager->getRepository(Doctor::class);
            $doctors = $doctorRepository->findAll();
            
            $data = array_map(function(Doctor $doctor) {
                return [
                    'id' => $doctor->getId(),
                    'user_id' => $doctor->getUser()->getId(),
                    'email' => $doctor->getUser()->getEmail(),
                    'specialization' => $doctor->getSpecialization(),
                    'experience' => $doctor->getExperience(),
                    'available_from' => $doctor->getAvailableFrom(),
                    'available_to' => $doctor->getAvailableTo(),
                    'about' => $doctor->getAbout(),
                    'created_at' => $doctor->getCreatedAt()->format('Y-m-d H:i:s')
                ];
            }, $doctors);

            return $this->json($data);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/doctor/profile/{user_id}', name: 'api_doctor_get_profile', methods: ['GET'])]
    public function getDoctorProfileByUserId(int $user_id): JsonResponse
    {
        try {
            $doctorRepository = $this->entityManager->getRepository(Doctor::class);
            // Notice we use the relation directly:
            $doctor = $doctorRepository->findOneBy(['user' => $user_id]);
            
            if ($doctor) {
                return $this->json([
                    'id' => $doctor->getId(),
                    'user_id' => $doctor->getUser()->getId(),
                    'email' => $doctor->getUser()->getEmail(),
                    'specialization' => $doctor->getSpecialization(),
                    'experience' => $doctor->getExperience(),
                    'available_from' => $doctor->getAvailableFrom(),
                    'available_to' => $doctor->getAvailableTo(),
                    'about' => $doctor->getAbout(),
                    'created_at' => $doctor->getCreatedAt()->format('Y-m-d H:i:s')
                ]);
            } else {
                return $this->json(["message" => "Profile not found"], 404);
            }
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/doctors/specialization/{specialization}', name: 'api_doctor_by_spec', methods: ['GET'])]
    public function getDoctorBySpecialization(string $specialization): JsonResponse
    {
        try {
            $doctorRepository = $this->entityManager->getRepository(Doctor::class);
            $doctors = $doctorRepository->findBy(['specialization' => $specialization]);
            
            $data = array_map(function(Doctor $doctor) {
                return [
                    'id' => $doctor->getId(),
                    'user_id' => $doctor->getUser()->getId(),
                    'specialization' => $doctor->getSpecialization(),
                    'experience' => $doctor->getExperience(),
                    'available_from' => $doctor->getAvailableFrom(),
                    'available_to' => $doctor->getAvailableTo(),
                    'about' => $doctor->getAbout(),
                    'created_at' => $doctor->getCreatedAt()->format('Y-m-d H:i:s')
                ];
            }, $doctors);

            return $this->json($data);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }
}
