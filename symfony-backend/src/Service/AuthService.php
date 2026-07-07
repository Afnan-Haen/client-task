<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use InvalidArgumentException;
use RuntimeException;

class AuthService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function registerUser(array $input): void
    {
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';
        $role = $input['role'] ?? 'patient';

        if (empty($email) || empty($password)) {
            throw new InvalidArgumentException('Email and password are required.');
        }

        $userRepository = $this->entityManager->getRepository(User::class);
        if ($userRepository->findOneBy(['email' => $email])) {
            throw new RuntimeException('User with this email already exists.', 409);
        }

        $user = new User();
        $user->setEmail($email);
        $user->setPassword(password_hash($password, PASSWORD_BCRYPT));
        $user->setRole($role);

        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }

    public function loginUser(array $input): User
    {
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        if (empty($email) || empty($password)) {
            throw new InvalidArgumentException('Email and password are required.');
        }

        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['email' => $email]);

        if (!$user) {
            throw new RuntimeException('No user detected. Please register first.', 404);
        }
        
        if (!password_verify($password, $user->getPassword())) {
            throw new RuntimeException('Invalid password.', 401);
        }

        return $user;
    }
}
