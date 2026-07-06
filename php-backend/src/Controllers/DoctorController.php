<?php
namespace App\Controllers;

use App\Database;

class DoctorController{
    public function CreateDocProfile(){
        // Set CORS headers
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

        //read input
        $input = file_get_contents("php://input");
        $data = json_decode($input, true);
        
        $specialization=$data['specialization'] ?? '';
        $experience=$data['experience'] ?? '';
        $available_from=$data['available_from'] ?? '';
        $available_to=$data['available_to'] ?? '';
        $about=$data['about'] ?? '';
        $user_id=$data['user_id'] ?? '';

        if(empty($specialization) || empty($experience) || empty($available_from) || empty($available_to) || empty($about) || empty($user_id)){
            http_response_code(400);
            echo json_encode(["message" => "Missing fields"]);
            exit();
        }

        try{
            $db = Database::getConnection();
            $stmt = $db->prepare("INSERT INTO doctors (user_id, specialization, experience, available_from, available_to, about) VALUES (:user_id, :specialization, :experience, :available_from, :available_to, :about)");
            $stmt->execute([
                ':user_id' => $user_id,
                ':specialization' => $specialization,
                ':experience' => $experience,
                ':available_from' => $available_from,
                ':available_to' => $available_to,
                ':about' => $about
            ]);
            http_response_code(201);
            echo json_encode(["message" => "Doctor profile created successfully"]);
        }
        catch(\PDOException $e){
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }

    public function getAllDoctors(){
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
    $db = Database::getConnection();
    $stmt = $db->query("SELECT d.*, u.email FROM doctors d JOIN users u ON d.user_id = u.id");
    $doctors = $stmt->fetchAll();
    echo json_encode($doctors);
    }

    public function getDoctorProfileByUserId($user_id) {
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

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("SELECT d.*, u.email FROM doctors d JOIN users u ON d.user_id = u.id WHERE d.user_id = :user_id");
            $stmt->execute([':user_id' => $user_id]);
            $profile = $stmt->fetch();
            
            if ($profile) {
                echo json_encode($profile);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Profile not found"]);
            }
        } catch(\PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }

    public function getDoctorBySpecialization($specialization) {
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

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("SELECT * FROM doctors WHERE specialization = :specialization");
            $stmt->execute([':specialization' => $specialization]);
            $doctors = $stmt->fetchAll();
            echo json_encode($doctors);
        } catch(\PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }
}
