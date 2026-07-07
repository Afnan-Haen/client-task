<?php

namespace App\Controller;

use App\Service\PatientService;
use InvalidArgumentException;
use RuntimeException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class PatientController extends AbstractController
{
    private PatientService $patientService;

    public function __construct(PatientService $patientService)
    {
        $this->patientService = $patientService;
    }

    #[Route('/patient/profile', name: 'api_patient_create_profile', methods: ['POST'])]
    public function CreatePatientProfile(Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true) ?? [];

        try {
            $this->patientService->createProfile($input);
            return $this->json(["message" => "Patient profile created successfully"], 201);
        } catch (InvalidArgumentException $e) {
            return $this->json(["message" => $e->getMessage()], 400);
        } catch (RuntimeException $e) {
            return $this->json(["message" => $e->getMessage()], $e->getCode() ?: 400);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/patients', name: 'api_patients_get_all', methods: ['GET'])]
    public function getAllPatients(): JsonResponse
    {
        try {
            $data = $this->patientService->getAllPatients();
            return $this->json($data);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/patient/profile/{user_id}', name: 'api_patient_get_profile', methods: ['GET'])]
    public function getPatientProfileByUserId(int $user_id): JsonResponse
    {
        try {
            $data = $this->patientService->getProfileByUserId($user_id);
            return $this->json($data);
        } catch (RuntimeException $e) {
            return $this->json(["message" => $e->getMessage()], $e->getCode() ?: 404);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }
}
