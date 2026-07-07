<?php

namespace App\Controller;

use App\Service\BlogService;
use InvalidArgumentException;
use RuntimeException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class BlogsController extends AbstractController
{
    private BlogService $blogService;

    public function __construct(BlogService $blogService)
    {
        $this->blogService = $blogService;
    }

    #[Route('/blogs', name: 'api_blogs_create', methods: ['POST'])]
    public function createBlog(Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true) ?? [];

        try {
            $this->blogService->createBlog($input);
            return $this->json(['message' => 'Blog created successfully!'], 201);
        } catch (InvalidArgumentException $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    #[Route('/blogs', name: 'api_blogs_get_all', methods: ['GET'])]
    public function getAllBlogs(): JsonResponse
    {
        try {
            $data = $this->blogService->getAllBlogs();
            return $this->json($data);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    #[Route('/blogs/{id}', name: 'api_blogs_get_one', methods: ['GET'])]
    public function getBlogById(int $id): JsonResponse
    {
        try {
            $data = $this->blogService->getBlogById($id);
            return $this->json($data);
        } catch (RuntimeException $e) {
            return $this->json(['message' => $e->getMessage()], $e->getCode() ?: 404);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    #[Route('/blogs/{id}', name: 'api_blogs_update', methods: ['PUT'])]
    public function updateBlogById(int $id, Request $request): JsonResponse
    {
        return $this->json(['message' => 'Update not implemented yet.'], 501);
    }

    #[Route('/blogs/{id}', name: 'api_blogs_delete', methods: ['DELETE'])]
    public function deleteBlogById(int $id): JsonResponse
    {
        try {
            $this->blogService->deleteBlogById($id);
            return $this->json(['message' => 'Blog deleted successfully!']);
        } catch (RuntimeException $e) {
            return $this->json(['message' => $e->getMessage()], $e->getCode() ?: 404);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
