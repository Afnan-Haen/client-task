<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Doctor;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class AdminController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/seed-admin', name: 'api_seed_admin', methods: ['GET'])]
    public function seedAdmin(): JsonResponse
    {
        try {
            $email = 'admin@medapp.com';
            $password = 'admin';

            $userRepository = $this->entityManager->getRepository(User::class);
            $existingUser = $userRepository->findOneBy(['email' => $email]);
            
            if ($existingUser) {
                return $this->json(["message" => "Admin user already exists."]);
            }

            $user = new User();
            $user->setEmail($email);
            $user->setPassword(password_hash($password, PASSWORD_BCRYPT));
            $user->setRole('admin');

            $this->entityManager->persist($user);
            $this->entityManager->flush();

            return $this->json(["message" => "Admin user created successfully."]);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/admin/doctors', name: 'api_admin_doctors', methods: ['POST'])]
    public function createDoctor(Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true);
        
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        $specialization = $input['specialization'] ?? '';
        $experience = $input['experience'] ?? '';
        $available_from = $input['available_from'] ?? '';
        $available_to = $input['available_to'] ?? '';
        $about = $input['about'] ?? '';

        if (empty($email) || empty($password)) {
            return $this->json(['message' => 'Email and password are required.'], 400);
        }

        try {
            $userRepository = $this->entityManager->getRepository(User::class);
            $existingUser = $userRepository->findOneBy(['email' => $email]);
            
            if ($existingUser) {
                return $this->json(['message' => 'User with this email already exists.'], 409);
            }

            $user = new User();
            $user->setEmail($email);
            $user->setPassword(password_hash($password, PASSWORD_BCRYPT));
            $user->setRole('doctor');

            $this->entityManager->persist($user);
            
            $doctor = new Doctor();
            $doctor->setUser($user);
            $doctor->setSpecialization($specialization);
            $doctor->setExperience((int) $experience);
            $doctor->setAvailableFrom($available_from);
            $doctor->setAvailableTo($available_to);
            $doctor->setAbout($about);

            $this->entityManager->persist($doctor);
            $this->entityManager->flush();

            return $this->json(['message' => 'Doctor created successfully!'], 201);
            
        } catch (\Exception $e) {
            return $this->json(['message' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
