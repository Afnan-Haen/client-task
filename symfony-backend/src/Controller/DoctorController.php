<?php

namespace App\Controller;

use App\Service\DoctorService;
use InvalidArgumentException;
use RuntimeException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class DoctorController extends AbstractController
{
    private DoctorService $doctorService;

    public function __construct(DoctorService $doctorService)
    {
        $this->doctorService = $doctorService;
    }

    #[Route('/doctor/profile', name: 'api_doctor_create_profile', methods: ['POST'])]
    public function CreateDocProfile(Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true) ?? [];
        
        try {
            $this->doctorService->createProfile($input);
            return $this->json(["message" => "Doctor profile created successfully"], 201);
        } catch (InvalidArgumentException $e) {
            return $this->json(["message" => $e->getMessage()], 400);
        } catch (RuntimeException $e) {
            return $this->json(["message" => $e->getMessage()], $e->getCode() ?: 400);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/doctors', name: 'api_doctors_get_all', methods: ['GET'])]
    public function getAllDoctors(): JsonResponse
    {
        try {
            $data = $this->doctorService->getAllDoctors();
            return $this->json($data);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/doctor/profile/{user_id}', name: 'api_doctor_get_profile', methods: ['GET'])]
    public function getDoctorProfileByUserId(int $user_id): JsonResponse
    {
        try {
            $data = $this->doctorService->getProfileByUserId($user_id);
            return $this->json($data);
        } catch (RuntimeException $e) {
            return $this->json(["message" => $e->getMessage()], $e->getCode() ?: 404);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/doctors/specialization/{specialization}', name: 'api_doctor_by_spec', methods: ['GET'])]
    public function getDoctorBySpecialization(string $specialization): JsonResponse
    {
        try {
            $data = $this->doctorService->getDoctorsBySpecialization($specialization);
            return $this->json($data);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }
}
