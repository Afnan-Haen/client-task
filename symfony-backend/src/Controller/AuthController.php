<?php

namespace App\Controller;

use App\Service\AuthService;
use InvalidArgumentException;
use RuntimeException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class AuthController extends AbstractController
{
    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    #[Route('/register', name: 'api_register', methods: ['POST'])]
    public function registerUser(Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true) ?? [];

        try {
            $this->authService->registerUser($input);
            return $this->json(['message' => 'User registered successfully!'], 201);
        } catch (InvalidArgumentException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        } catch (RuntimeException $e) {
            return $this->json(['message' => $e->getMessage()], $e->getCode() ?: 400);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    #[Route('/login', name: 'api_login', methods: ['POST'])]
    public function loginUser(Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true) ?? [];

        try {
            $user = $this->authService->loginUser($input);
            
            return $this->json([
                'message' => 'Login successful!',
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'role' => $user->getRole()
                ]
            ]);
        } catch (InvalidArgumentException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        } catch (RuntimeException $e) {
            return $this->json(['message' => $e->getMessage()], $e->getCode() ?: 400);
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
