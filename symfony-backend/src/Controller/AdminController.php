<?php

namespace App\Controller;

use App\Service\AdminService;
use InvalidArgumentException;
use RuntimeException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class AdminController extends AbstractController
{
    private AdminService $adminService;

    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }

    #[Route('/seed-admin', name: 'api_seed_admin', methods: ['GET'])]
    public function seedAdmin(): JsonResponse
    {
        try {
            $this->adminService->seedAdmin();
            return $this->json(["message" => "Admin user created successfully."]);
        } catch (RuntimeException $e) {
            return $this->json(["message" => $e->getMessage()], $e->getCode() ?: 400);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/admin/doctors', name: 'api_admin_doctors', methods: ['POST'])]
    public function createDoctor(Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true) ?? [];
        
        try {
            $this->adminService->createDoctor($input);
            return $this->json(['message' => 'Doctor created successfully!'], 201);
        } catch (InvalidArgumentException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        } catch (RuntimeException $e) {
            return $this->json(['message' => $e->getMessage()], $e->getCode() ?: 400);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
