<?php

namespace App\Service;

use App\Entity\Doctor;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use InvalidArgumentException;
use RuntimeException;

class AdminService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function seedAdmin(): void
    {
        $email = 'admin@medapp.com';
        $password = 'admin';

        $userRepository = $this->entityManager->getRepository(User::class);
        $existingUser = $userRepository->findOneBy(['email' => $email]);
        
        if ($existingUser) {
            throw new RuntimeException("Admin user already exists.", 409);
        }

        $user = new User();
        $user->setEmail($email);
        $user->setPassword(password_hash($password, PASSWORD_BCRYPT));
        $user->setRole('admin');

        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }

    public function createDoctor(array $input): void
    {
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        $specialization = $input['specialization'] ?? '';
        $experience = $input['experience'] ?? '';
        $available_from = $input['available_from'] ?? '';
        $available_to = $input['available_to'] ?? '';
        $about = $input['about'] ?? '';

        if (empty($email) || empty($password)) {
            throw new InvalidArgumentException('Email and password are required.');
        }

        $userRepository = $this->entityManager->getRepository(User::class);
        $existingUser = $userRepository->findOneBy(['email' => $email]);
        
        if ($existingUser) {
            throw new RuntimeException('User with this email already exists.', 409);
        }

        $user = new User();
        $user->setEmail($email);
        $user->setPassword(password_hash($password, PASSWORD_BCRYPT));
        $user->setRole('doctor');

        $this->entityManager->persist($user);
        
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
}
