<?php

namespace App\Controller;

use App\Entity\Blog;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class BlogsController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/blogs', name: 'api_blogs_create', methods: ['POST'])]
    public function createBlog(Request $request): JsonResponse
    {
        $input = json_decode($request->getContent(), true);
        $title = $input['title'] ?? '';
        $content = $input['content'] ?? '';
        $tags = $input['tags'] ?? '';
        $image = $input['image'] ?? null;

        if (empty($title) || empty($content)) {
            return $this->json(['message' => 'Title and content are required.'], 400);
        }

        try {
            $blog = new Blog();
            $blog->setTitle($title);
            $blog->setContent($content);
            $blog->setTags($tags);
            $blog->setImage($image);

            $this->entityManager->persist($blog);
            $this->entityManager->flush();

            return $this->json(['message' => 'Blog created successfully!'], 201);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    #[Route('/blogs', name: 'api_blogs_get_all', methods: ['GET'])]
    public function getAllBlogs(): JsonResponse
    {
        try {
            $blogRepository = $this->entityManager->getRepository(Blog::class);
            $blogs = $blogRepository->findBy([], ['createdAt' => 'DESC']);
            
            $data = array_map(function(Blog $blog) {
                return [
                    'id' => $blog->getId(),
                    'title' => $blog->getTitle(),
                    'content' => $blog->getContent(),
                    'tags' => $blog->getTags(),
                    'image' => $blog->getImage(),
                    'created_at' => $blog->getCreatedAt()->format('Y-m-d H:i:s')
                ];
            }, $blogs);

            return $this->json($data);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    #[Route('/blogs/{id}', name: 'api_blogs_get_one', methods: ['GET'])]
    public function getBlogById(int $id): JsonResponse
    {
        try {
            $blogRepository = $this->entityManager->getRepository(Blog::class);
            $blog = $blogRepository->find($id);

            if ($blog) {
                return $this->json([
                    'id' => $blog->getId(),
                    'title' => $blog->getTitle(),
                    'content' => $blog->getContent(),
                    'tags' => $blog->getTags(),
                    'image' => $blog->getImage(),
                    'created_at' => $blog->getCreatedAt()->format('Y-m-d H:i:s')
                ]);
            } else {
                return $this->json(['message' => 'Blog not found'], 404);
            }
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
            $blogRepository = $this->entityManager->getRepository(Blog::class);
            $blog = $blogRepository->find($id);
            
            if ($blog) {
                $this->entityManager->remove($blog);
                $this->entityManager->flush();
                return $this->json(['message' => 'Blog deleted successfully!']);
            }
            
            return $this->json(['message' => 'Blog not found'], 404);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Database error: ' . $e->getMessage()], 500);
        }
    }
}
