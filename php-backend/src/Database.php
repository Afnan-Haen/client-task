<?php
namespace App;

use PDO;

class Database {
    private static $connection = null;

    public static function getConnection() {
        if (self::$connection === null) {
            $dbPath = __DIR__ . '/../data/database.sqlite';
            
            // Ensure data directory exists
            if (!is_dir(dirname($dbPath))) {
                mkdir(dirname($dbPath), 0777, true);
            }

            $isNew = !file_exists($dbPath);

            self::$connection = new PDO('sqlite:' . $dbPath);
            self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

        }
        return self::$connection;
    }

}
