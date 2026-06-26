<?php
// filepath: /php-backend/php-backend/src/db.php

$host = 'localhost';
$db = 'blog_app';
$user = 'root';
$pass = '';
$doctor_db='doctor';
$patient_db='patient';
$blog_db = "blog";
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

function getConnection() {
    global $dsn, $user, $blog_db, $doctor_db, $patient_db, $pass, $options;
    try {
        return new PDO($dsn, $user, $pass, $doctor_db, $patient_db, $options);
    } catch (\PDOException $e) {
        throw new \PDOException($e->getMessage(), (int)$e->getCode());
    }
}

function getConnection1() {
    global $dsn, $user, $blog_db, $doctor_db, $patient_db, $pass, $options;
    try {
        return new PDO($dsn, $user, $blog_db, $doctor_db, $patient_db, $pass, $options);
    } catch (\PDOException $e) {
        throw new \PDOException($e->getMessage(), (int)$e->getCode());
    }
}
?>