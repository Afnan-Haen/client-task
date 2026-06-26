<?php
namespace App\Controllers;

use App\Database;

class BlogsController {
    public function createBlog() {
        // Set CORS headers
        $frontendUrl = getenv('FRONTEND_URL') ?: 'http://localhost:3000';
        header('Access-Control-Allow-Origin: ' . $frontendUrl);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Content-Type: application/json');

        // Read input
        $input = json_decode(file_get_contents('php://input'), true);
        $title = $input['title'] ?? '';
        $content = $input['content'] ?? '';
        $tags = $input['tags'] ?? '';
        $image = $input['image'] ?? null;

        if(empty($title) || empty($content)) {
            http_response_code(400);
            echo json_encode(['message' => 'Title and content are required.']);
            return;
        }

        try {
            $db = Database::getConnection();
            
            $stmt = $db->prepare("INSERT INTO blogs (title, content, tags, image) VALUES (:title, :content, :tags, :image)");
            $stmt->execute([':title' => $title, ':content' => $content, ':tags' => $tags, ':image' => $image]);

            http_response_code(201);
            echo json_encode(['message' => 'Blog created successfully!']);
        } catch (\PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function getAllBlogs() {
        $frontendUrl = getenv('FRONTEND_URL') ?: 'http://localhost:3000';
        header('Access-Control-Allow-Origin: ' . $frontendUrl);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Content-Type: application/json');

        try {
            $db = Database::getConnection();
            $stmt = $db->query("SELECT * FROM blogs ORDER BY created_at DESC");
            $blogs = $stmt->fetchAll();
            echo json_encode($blogs);
        } catch (\PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

        public function getBlogById($id) {
        $frontendUrl = getenv('FRONTEND_URL') ?: 'http://localhost:3000';
        header('Access-Control-Allow-Origin: ' . $frontendUrl);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Content-Type: application/json');

        try {
            $db = \App\Database::getConnection();
            $stmt = $db->prepare("SELECT * FROM blogs WHERE id = :id");
            $stmt->execute([':id' => $id]);
            $blog = $stmt->fetch();

            if ($blog) {
                echo json_encode($blog);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Blog not found']);
            }
        } catch (\PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function deleteBlogById($id) {
        $frontendUrl = getenv('FRONTEND_URL') ?: 'http://localhost:3000';
        header('Access-Control-Allow-Origin: ' . $frontendUrl);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Content-Type: application/json');

        try {
            $db = \App\Database::getConnection();
            $stmt = $db->prepare("DELETE FROM blogs WHERE id = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(['message' => 'Blog deleted successfully!']);
        } catch (\PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

}