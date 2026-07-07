<?php

namespace App\Service;

use App\Entity\Doctor;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use InvalidArgumentException;
use RuntimeException;

class DoctorService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function createProfile(array $input): void
    {
        $specialization = $input['specialization'] ?? '';
        $experience = $input['experience'] ?? '';
        $available_from = $input['available_from'] ?? '';
        $available_to = $input['available_to'] ?? '';
        $about = $input['about'] ?? '';
        $user_id = $input['user_id'] ?? '';

        if (empty($specialization) || empty($experience) || empty($available_from) || empty($available_to) || empty($about) || empty($user_id)) {
            throw new InvalidArgumentException("Missing fields");
        }

        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->find($user_id);
        
        if (!$user) {
            throw new RuntimeException("User not found", 404);
        }

        $doctor = new Doctor();
        $doctor->setUser($user);
        $doctor->setSpecialization($specialization);
        $doctor->setExperience((int) $experience);
        $doctor->setAvailableFrom($available_from);
        $doctor->setAvailableTo($available_to);
        $doctor->setAbout($about);

        $this->entityManager->persist($doctor);
        $this->entityManager->flush();
    }

    public function getAllDoctors(): array
    {
        $doctorRepository = $this->entityManager->getRepository(Doctor::class);
        $doctors = $doctorRepository->findAll();
        
        return array_map(function(Doctor $doctor) {
            return [
                'id' => $doctor->getId(),
                'user_id' => $doctor->getUser()->getId(),
                'email' => $doctor->getUser()->getEmail(),
                'specialization' => $doctor->getSpecialization(),
                'experience' => $doctor->getExperience(),
                'available_from' => $doctor->getAvailableFrom(),
                'available_to' => $doctor->getAvailableTo(),
                'about' => $doctor->getAbout(),
                'created_at' => $doctor->getCreatedAt()->format('Y-m-d H:i:s')
            ];
        }, $doctors);
    }

    public function getProfileByUserId(int $user_id): array
    {
        $doctorRepository = $this->entityManager->getRepository(Doctor::class);
        $doctor = $doctorRepository->findOneBy(['user' => $user_id]);
        
        if (!$doctor) {
            throw new RuntimeException("Profile not found", 404);
        }

        return [
            'id' => $doctor->getId(),
            'user_id' => $doctor->getUser()->getId(),
            'email' => $doctor->getUser()->getEmail(),
            'specialization' => $doctor->getSpecialization(),
            'experience' => $doctor->getExperience(),
            'available_from' => $doctor->getAvailableFrom(),
            'available_to' => $doctor->getAvailableTo(),
            'about' => $doctor->getAbout(),
            'created_at' => $doctor->getCreatedAt()->format('Y-m-d H:i:s')
        ];
    }

    public function getDoctorsBySpecialization(string $specialization): array
    {
        $doctorRepository = $this->entityManager->getRepository(Doctor::class);
        $doctors = $doctorRepository->findBy(['specialization' => $specialization]);
        
        return array_map(function(Doctor $doctor) {
            return [
                'id' => $doctor->getId(),
                'user_id' => $doctor->getUser()->getId(),
                'specialization' => $doctor->getSpecialization(),
                'experience' => $doctor->getExperience(),
                'available_from' => $doctor->getAvailableFrom(),
                'available_to' => $doctor->getAvailableTo(),
                'about' => $doctor->getAbout(),
                'created_at' => $doctor->getCreatedAt()->format('Y-m-d H:i:s')
            ];
        }, $doctors);
    }
}
