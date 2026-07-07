<?php

namespace App\Controller;

use App\Service\RequestService;
use InvalidArgumentException;
use RuntimeException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class RequestController extends AbstractController
{
    private RequestService $requestService;

    public function __construct(RequestService $requestService)
    {
        $this->requestService = $requestService;
    }

    #[Route('/requests', name: 'api_requests_create', methods: ['POST'])]
    public function createRequest(Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true) ?? [];

        try {
            $this->requestService->createRequest($input);
            return $this->json(["message" => "Request created successfully"], 201);
        } catch (InvalidArgumentException $e) {
            return $this->json(["message" => $e->getMessage()], 400);
        } catch (RuntimeException $e) {
            return $this->json(["message" => $e->getMessage()], $e->getCode() ?: 400);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/doctor/requests/{doctor_id}', name: 'api_doctor_requests_get', methods: ['GET'])]
    public function getDoctorRequests(int $doctor_id): JsonResponse
    {
        try {
            $data = $this->requestService->getDoctorRequests($doctor_id);
            return $this->json($data);
        } catch (RuntimeException $e) {
            return $this->json(["message" => $e->getMessage()], $e->getCode() ?: 404);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }

    #[Route('/requests/{id}/status', name: 'api_request_status_update', methods: ['PUT'])]
    public function updateRequestStatus(int $id, Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true) ?? [];

        try {
            $this->requestService->updateRequestStatus($id, $input);
            return $this->json(["message" => "Request status updated"]);
        } catch (InvalidArgumentException $e) {
            return $this->json(["message" => $e->getMessage()], 400);
        } catch (RuntimeException $e) {
            return $this->json(["message" => $e->getMessage()], $e->getCode() ?: 404);
        } catch (\Exception $e) {
            return $this->json(["message" => "Database error: " . $e->getMessage()], 500);
        }
    }
}
