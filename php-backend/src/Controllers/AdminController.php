<?php
namespace App\Controllers;

use App\Database;

class AdminController {
    public function seedAdmin() {
        try {
            $db = Database::getConnection();
            $email = 'admin@medapp.com';
            $password = 'admin';
            $passwordHash = password_hash($password, PASSWORD_BCRYPT);
            $role = 'admin';

            $stmt = $db->prepare("SELECT id FROM users WHERE email = :email");
            $stmt->execute([':email' => $email]);
            if ($stmt->fetch()) {
                echo json_encode(["message" => "Admin user already exists."]);
                return;
            }

            $stmt = $db->prepare("INSERT INTO users (email, password, role) VALUES (:email, :password, :role)");
            $stmt->execute([
                ':email' => $email,
                ':password' => $passwordHash,
                ':role' => $role
            ]);
            echo json_encode(["message" => "Admin user created successfully."]);
        } catch (\PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }

    public function createDoctor() {
        $frontendUrl = getenv('FRONTEND_URL') ?: 'http://localhost:3000';
        header('Access-Control-Allow-Origin: ' . $frontendUrl);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Content-Type: application/json');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }

        $input = json_decode(file_get_contents('php://input'), true);
        
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        $specialization = $input['specialization'] ?? '';
        $experience = $input['experience'] ?? '';
        $available_from = $input['available_from'] ?? '';
        $available_to = $input['available_to'] ?? '';
        $about = $input['about'] ?? '';
        $first_name = $input['first_name'] ?? '';

        if (empty($email) || empty($password)) {
            http_response_code(400);
            echo json_encode(['message' => 'Email and password are required.']);
            return;
        }

        try {
            $db = Database::getConnection();
            $db->beginTransaction();

            // 1. Create User
            $stmt = $db->prepare("SELECT id FROM users WHERE email = :email");
            $stmt->execute([':email' => $email]);
            if ($stmt->fetch()) {
                $db->rollBack();
                http_response_code(409);
                echo json_encode(['message' => 'User with this email already exists.']);
                return;
            }

            $passwordHash = password_hash($password, PASSWORD_BCRYPT);
            $stmt = $db->prepare("INSERT INTO users (email, password, role) VALUES (:email, :password, 'doctor')");
            $stmt->execute([
                ':email' => $email,
                ':password' => $passwordHash
            ]);
            
            $user_id = $db->lastInsertId();

            // 2. Create Doctor Profile
            $stmt = $db->prepare("INSERT INTO doctors (user_id, specialization, experience, available_from, available_to, about, first_name) VALUES (:user_id, :specialization, :experience, :available_from, :available_to, :about, :first_name)");
            $stmt->execute([
                ':user_id' => $user_id,
                ':specialization' => $specialization,
                ':experience' => $experience,
                ':available_from' => $available_from,
                ':available_to' => $available_to,
                ':about' => $about,
                ':first_name' => $first_name
            ]);

            $db->commit();
            http_response_code(201);
            echo json_encode(['message' => 'Doctor created successfully!']);
            
        } catch (\PDOException $e) {
            $db->rollBack();
            http_response_code(500);
            echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
        }
    }
}
