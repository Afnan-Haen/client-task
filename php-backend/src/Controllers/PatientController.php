<?php
namespace App\Controllers;

use App\Database;

class PatientController{
    public function CreatePatientProfile(){
        //cors header
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

        $input = file_get_contents("php://input");
        $data = json_decode($input, true);

        $full_name = $data['full_name'] ?? '';
        $phone_number = $data['phone_number'] ?? '';
        $age = $data['age'] ?? '';
        $gender = $data['gender'] ?? '';
        $condition = $data['condition'] ?? '';
        $user_id = $data['user_id'] ?? '';

        if(empty($full_name) || empty($phone_number) || empty($age) || empty($gender) || empty($condition) || empty($user_id)){
            http_response_code(400);
            echo json_encode(["message" => "Missing fields"]);
            exit();
        }

        try{
            $db = Database::getConnection();
            $stmt = $db->prepare("INSERT INTO patients (user_id, full_name, phone_number, age, gender, condition) VALUES (:user_id, :full_name, :phone_number, :age, :gender, :condition)");
            $stmt->execute([
                ':user_id' => $user_id,
                ':full_name' => $full_name,
                ':phone_number' => $phone_number,
                ':age' => $age,
                ':gender' => $gender,
                ':condition' => $condition
            ]);
            http_response_code(201);
            echo json_encode(["message" => "Patient profile created successfully"]);
        }
        catch(\PDOException $e){
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }

    public function getAllPatients(){
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

        try{
            $db = Database::getConnection();
            $stmt = $db->query("SELECT * FROM patients");
            $patients = $stmt->fetchAll();
            echo json_encode($patients);
        }
        catch(\PDOException $e){
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }

    public function getPatientProfileByUserId($user_id) {
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
            $stmt = $db->prepare("SELECT * FROM patients WHERE user_id = :user_id");
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
}