<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class AuthController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/register', name: 'api_register', methods: ['POST'])]
    public function registerUser(Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true);
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        $role = $input['role'] ?? 'patient';

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
            $user->setRole($role);

            $this->entityManager->persist($user);
            $this->entityManager->flush();

            return $this->json(['message' => 'User registered successfully!'], 201);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    #[Route('/login', name: 'api_login', methods: ['POST'])]
    public function loginUser(Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true);
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        if (empty($email) || empty($password)) {
            return $this->json(['message' => 'Email and password are required.'], 400);
        }

        try {
            $userRepository = $this->entityManager->getRepository(User::class);
            $user = $userRepository->findOneBy(['email' => $email]);

            if (!$user) {
                return $this->json(['message' => 'No user detected. Please register first.'], 404);
            } else if (password_verify($password, $user->getPassword())) {
                return $this->json([
                    'message' => 'Login successful!',
                    'user' => [
                        'id' => $user->getId(),
                        'email' => $user->getEmail(),
                        'role' => $user->getRole()
                    ]
                ]);
            } else {
                return $this->json(['message' => 'Invalid password.'], 401);
            }
        } catch (\Exception $e) {
            return $this->json(['message' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    #[Route('/logout', name: 'api_logout', methods: ['POST'])]
    public function logoutUser(): JsonResponse
    {
        return $this->json(['message' => 'Logged out successfully.']);
    }
}
