<?php
use App\Router;
use App\Controllers\AuthController;
use App\Controllers\BlogsController;
use App\Controllers\DoctorController;
use App\Controllers\PatientController;
use App\Controllers\RequestController;
use App\Controllers\AdminController;

$router = new Router();

$router->post('/register', [AuthController::class, 'registerUser']);
$router->post('/login', [AuthController::class, 'loginUser']);
$router->post('/logout', [AuthController::class, 'logoutUser']);

$router->get('/seed-admin', [AdminController::class, 'seedAdmin']);
$router->post('/admin/doctors', [AdminController::class, 'createDoctor']);

$router->post('/blogs', [BlogsController::class, 'createBlog']);
$router->get('/blogs', [BlogsController::class, 'getAllBlogs']);
$router->get('/blogs/{id}', [BlogsController::class, 'getBlogById']);
$router->put('/blogs/{id}', [BlogsController::class, 'updateBlogById']);
$router->delete('/blogs/{id}', [BlogsController::class, 'deleteBlogById']);

$router->post('/doctor/profile', [DoctorController::class, 'CreateDocProfile']);
$router->get('/doctors', [DoctorController::class, 'getAllDoctors']);
$router->get('/doctor/profile/{user_id}', [DoctorController::class, 'getDoctorProfileByUserId']);
$router->get('/doctors/specialization/{specialization}', [DoctorController::class, 'getDoctorBySpecialization']);

$router->post('/patient/profile', [PatientController::class, 'CreatePatientProfile']);
$router->get('/patients', [PatientController::class, 'getAllPatients']);
$router->get('/patient/profile/{user_id}', [PatientController::class, 'getPatientProfileByUserId']);

$router->post('/requests', [RequestController::class, 'createRequest']);
$router->get('/doctor/requests/{doctor_id}', [RequestController::class, 'getDoctorRequests']);
$router->put('/requests/{id}/status', [RequestController::class, 'updateRequestStatus']);

$router->run();