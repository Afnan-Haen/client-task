<?php
namespace App\Controllers;

use App\Database;

class AuthController {
    public function registerUser() {
        $frontendUrl = getenv('FRONTEND_URL') ?: 'http://localhost:3000';
        header('Access-Control-Allow-Origin: ' . $frontendUrl);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Content-Type: application/json');

        $input = json_decode(file_get_contents('php://input'), true);
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        $role = $input['role'] ?? 'patient';

        if (empty($email) || empty($password)) {
            http_response_code(400);
            echo json_encode(['message' => 'Email and password are required.']);
            return;
        }

        try {
            $db = Database::getConnection();
            
            // Check if user already exists
            $stmt = $db->prepare("SELECT id FROM users WHERE email = :email");
            $stmt->execute([':email' => $email]);
            if ($stmt->fetch()) {
                http_response_code(409); // Conflict
                echo json_encode(['message' => 'User with this email already exists.']);
                return;
            }

            // Insert new user
            $passwordHash = password_hash($password, PASSWORD_BCRYPT);
            $stmt = $db->prepare("INSERT INTO users (email, password, role) VALUES (:email, :password, :role)");
            $stmt->execute([
                ':email' => $email,
                ':password' => $passwordHash,
                ':role' => $role
            ]);

            http_response_code(201); // Created
            echo json_encode(['message' => 'User registered successfully!']);
            
        } catch (\PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function loginUser() {
        // Set CORS headers
        $frontendUrl = getenv('FRONTEND_URL') ?: 'http://localhost:3000';
        header('Access-Control-Allow-Origin: ' . $frontendUrl);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Content-Type: application/json');

        // Read and parse input
        $input = json_decode(file_get_contents('php://input'), true);
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        if (empty($email) || empty($password)) {
            http_response_code(400);
            echo json_encode(['message' => 'Email and password are required.']);
            return;
        }

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("SELECT * FROM users WHERE email = :email");
            $stmt->execute([':email' => $email]);
            $user = $stmt->fetch();

            if (!$user) {
                http_response_code(404);
                echo json_encode(['message' => 'No user detected. Please register first.']);
            } else if (password_verify($password, $user['password'])) {
                // In a production app, we would start a session or generate a JWT here.
                // For this starter, we just return a success message.
                echo json_encode([
                    'message' => 'Login successful!',
                    'user' => [
                        'id' => $user['id'],
                        'email' => $user['email'],
                        'role' => $user['role'] ?? 'patient'
                    ]
                ]);
            } else {
                http_response_code(401);
                echo json_encode(['message' => 'Invalid password.']);
            }
        } catch (\PDOException $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }

    public function logoutUser() {
        $frontendUrl = getenv('FRONTEND_URL') ?: 'http://localhost:3000';
        header('Access-Control-Allow-Origin: ' . $frontendUrl);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Content-Type: application/json');

        echo json_encode(['message' => 'Logged out successfully.']);
    }
}