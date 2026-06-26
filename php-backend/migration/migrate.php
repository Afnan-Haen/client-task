<?php

require_once __DIR__ . '/../src/Database.php';

use App\Database;

$db = Database::getConnection();

$migrations = [
    'create_users_table.php',
    'create_blog_table.php',
    'add_image_columns.php',
    'add_role_to_users.php',
    'create_doctor_table.php',
    'create_patients_table.php',
    'create_requests_table.php'
];

foreach ($migrations as $migration) {
    echo "Running {$migration}...\n";
    $sql = require __DIR__ . '/' . $migration;
    
    try {
        $db->exec($sql);
        echo "Successfully ran {$migration}\n";
    } catch (\PDOException $e) {
        // Ignore "duplicate column name" error for add_image_columns if it was already run
        if (strpos($e->getMessage(), 'duplicate column name') !== false) {
            echo "Skipping {$migration}: Column already exists.\n";
        } else {
            echo "Error running {$migration}: " . $e->getMessage() . "\n";
        }
    }
}

echo "Migrations completed!\n";
