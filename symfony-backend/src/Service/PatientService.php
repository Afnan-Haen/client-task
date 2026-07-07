<?php

namespace App\Service;

use App\Entity\Patient;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use InvalidArgumentException;
use RuntimeException;

class PatientService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function createProfile(array $input): void
    {
        $full_name = $input['full_name'] ?? '';
        $phone_number = $input['phone_number'] ?? '';
        $age = $input['age'] ?? '';
        $gender = $input['gender'] ?? '';
        $condition = $input['condition'] ?? '';
        $user_id = $input['user_id'] ?? '';

        if (empty($full_name) || empty($phone_number) || empty($age) || empty($gender) || empty($condition) || empty($user_id)) {
            throw new InvalidArgumentException("Missing fields");
        }

        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->find($user_id);

        if (!$user) {
            throw new RuntimeException("User not found", 404);
        }

        $patient = new Patient();
        $patient->setUser($user);
        $patient->setFullName($full_name);
        $patient->setPhoneNumber($phone_number);
        $patient->setAge((int) $age);
        $patient->setGender($gender);
        $patient->setCondition($condition);

        $this->entityManager->persist($patient);
        $this->entityManager->flush();
    }

    public function getAllPatients(): array
    {
        $patientRepository = $this->entityManager->getRepository(Patient::class);
        $patients = $patientRepository->findAll();
        
        return array_map(function(Patient $patient) {
            return [
                'id' => $patient->getId(),
                'user_id' => $patient->getUser()->getId(),
                'full_name' => $patient->getFullName(),
                'phone_number' => $patient->getPhoneNumber(),
                'age' => $patient->getAge(),
                'gender' => $patient->getGender(),
                'condition' => $patient->getCondition(),
                'created_at' => $patient->getCreatedAt()->format('Y-m-d H:i:s')
            ];
        }, $patients);
    }

    public function getProfileByUserId(int $user_id): array
    {
        $patientRepository = $this->entityManager->getRepository(Patient::class);
        $patient = $patientRepository->findOneBy(['user' => $user_id]);
        
        if (!$patient) {
            throw new RuntimeException("Profile not found", 404);
        }

        return [
            'id' => $patient->getId(),
            'user_id' => $patient->getUser()->getId(),
            'full_name' => $patient->getFullName(),
            'phone_number' => $patient->getPhoneNumber(),
            'age' => $patient->getAge(),
            'gender' => $patient->getGender(),
            'condition' => $patient->getCondition(),
            'created_at' => $patient->getCreatedAt()->format('Y-m-d H:i:s')
        ];
    }
}
