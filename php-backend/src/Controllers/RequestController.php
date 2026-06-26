<?php
namespace App\Controllers;

use App\Database;

class RequestController {
    
    // Set CORS headers uniformly
    private function setCorsHeaders() {
        $frontendUrl = getenv('FRONTEND_URL') ?: 'http://localhost:3000';
        header('Access-Control-Allow-Origin: ' . $frontendUrl);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
        header('Content-Type: application/json');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }

    public function createRequest() {
        $this->setCorsHeaders();

        $input = file_get_contents("php://input");
        $data = json_decode($input, true);

        $patient_id = $data['patient_id'] ?? '';
        $doctor_id = $data['doctor_id'] ?? '';

        if(empty($patient_id) || empty($doctor_id)){
            http_response_code(400);
            echo json_encode(["message" => "Missing patient_id or doctor_id"]);
            exit();
        }

        try{
            $db = Database::getConnection();

            // Check if request already exists
            $checkStmt = $db->prepare("SELECT id FROM requests WHERE patient_id = :patient_id AND doctor_id = :doctor_id");
            $checkStmt->execute([':patient_id' => $patient_id, ':doctor_id' => $doctor_id]);
            if ($checkStmt->fetch()) {
                http_response_code(409);
                echo json_encode(["message" => "Request already exists"]);
                exit();
            }

            $stmt = $db->prepare("INSERT INTO requests (patient_id, doctor_id) VALUES (:patient_id, :doctor_id)");
            $stmt->execute([
                ':patient_id' => $patient_id,
                ':doctor_id' => $doctor_id
            ]);
            http_response_code(201);
            echo json_encode(["message" => "Request created successfully"]);
        }
        catch(\PDOException $e){
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }

    public function getDoctorRequests($doctor_id) {
        $this->setCorsHeaders();

        try {
            $db = Database::getConnection();
            // Fetch requests along with patient profile details
            $stmt = $db->prepare("
                SELECT r.id, r.status, r.created_at, p.full_name, p.age, p.gender, p.condition, p.phone_number, u.email
                FROM requests r
                JOIN patients p ON r.patient_id = p.user_id
                JOIN users u ON p.user_id = u.id
                WHERE r.doctor_id = :doctor_id
                ORDER BY r.created_at DESC
            ");
            $stmt->execute([':doctor_id' => $doctor_id]);
            $requests = $stmt->fetchAll();
            echo json_encode($requests);
        }
        catch(\PDOException $e){
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }

    public function updateRequestStatus($request_id) {
        $this->setCorsHeaders();

        $input = file_get_contents("php://input");
        $data = json_decode($input, true);
        $status = $data['status'] ?? '';

        if(empty($status)){
            http_response_code(400);
            echo json_encode(["message" => "Missing status"]);
            exit();
        }

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("UPDATE requests SET status = :status WHERE id = :id");
            $stmt->execute([
                ':status' => $status,
                ':id' => $request_id
            ]);
            echo json_encode(["message" => "Request status updated"]);
        }
        catch(\PDOException $e){
            http_response_code(500);
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }
}
