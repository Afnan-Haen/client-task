# PHP Backend Project

## Overview
This is a simple PHP backend project that handles user authentication and database interactions. It is structured to separate concerns, making it easier to maintain and extend.

## Project Structure
```
php-backend
├── public
│   └── login.php
├── config
│   └── config.php
├── src
│   ├── db.php
│   ├── controllers
│   │   └── AuthController.php
│   └── routes.php
├── composer.json
└── README.md
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd php-backend
   ```

2. **Install dependencies**
   Make sure you have Composer installed. Run the following command to install the required dependencies:
   ```bash
   composer install
   ```

3. **Configuration**
   Update the `config/config.php` file with your database connection parameters and any other necessary environment variables.

## Usage

- The `public/login.php` file handles user login requests. You can send a POST request to this endpoint with the necessary credentials.
- The `src/db.php` file manages the database connection and can be used to perform queries.
- The `src/controllers/AuthController.php` contains methods for user authentication, such as logging in and logging out.
- The `src/routes.php` file defines the application's routes, linking HTTP requests to the appropriate controller methods.

## Contributing
Feel free to fork the repository and submit pull requests for any improvements or features you'd like to add.

## License
This project is licensed under the MIT License - see the LICENSE file for details.