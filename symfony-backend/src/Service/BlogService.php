<?php

namespace App\Service;

use App\Entity\Blog;
use Doctrine\ORM\EntityManagerInterface;
use InvalidArgumentException;
use RuntimeException;

class BlogService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function createBlog(array $input): void
    {
        $title = $input['title'] ?? '';
        $content = $input['content'] ?? '';
        $tags = $input['tags'] ?? '';
        $image = $input['image'] ?? null;

        if (empty($title) || empty($content)) {
            throw new InvalidArgumentException('Title and content are required.');
        }

        $blog = new Blog();
        $blog->setTitle($title);
        $blog->setContent($content);
        $blog->setTags($tags);
        $blog->setImage($image);

        $this->entityManager->persist($blog);
        $this->entityManager->flush();
    }

    public function getAllBlogs(): array
    {
        $blogRepository = $this->entityManager->getRepository(Blog::class);
        $blogs = $blogRepository->findBy([], ['createdAt' => 'DESC']);
        
        return array_map(function(Blog $blog) {
            return [
                'id' => $blog->getId(),
                'title' => $blog->getTitle(),
                'content' => $blog->getContent(),
                'tags' => $blog->getTags(),
                'image' => $blog->getImage(),
                'created_at' => $blog->getCreatedAt()->format('Y-m-d H:i:s')
            ];
        }, $blogs);
    }

    public function getBlogById(int $id): array
    {
        $blogRepository = $this->entityManager->getRepository(Blog::class);
        $blog = $blogRepository->find($id);

        if (!$blog) {
            throw new RuntimeException('Blog not found', 404);
        }

        return [
            'id' => $blog->getId(),
            'title' => $blog->getTitle(),
            'content' => $blog->getContent(),
            'tags' => $blog->getTags(),
            'image' => $blog->getImage(),
            'created_at' => $blog->getCreatedAt()->format('Y-m-d H:i:s')
        ];
    }

    public function deleteBlogById(int $id): void
    {
        $blogRepository = $this->entityManager->getRepository(Blog::class);
        $blog = $blogRepository->find($id);
        
        if (!$blog) {
            throw new RuntimeException('Blog not found', 404);
        }
        
        $this->entityManager->remove($blog);
        $this->entityManager->flush();
    }
}
