# Backend-dev Starter

This folder is organized as a simple starter for:

- `backend/` for PHP API logic
- `frontend/` for Next.js UI
- `docs/` for project notes and planning

## Folder Map

### `backend/`
PHP side of the project. This is where requests are validated, business rules run, and MySQL is accessed.

- `config/` for app and database settings
- `controllers/` for request handlers
- `middlewares/` for auth, CORS, and request checks
- `migrations/` for database structure changes
- `models/` for data objects
- `repositories/` for database queries
- `routes/` for API endpoints
- `services/` for business logic
- `tests/` for backend tests
- `public/` for the entry point exposed to the web server
- `storage/` for logs, uploads, and temp files

### `frontend/`
Next.js side of the project. This is what users see in the browser.

- `app/` for pages and routes
- `components/` for reusable UI pieces
- `hooks/` for shared React logic
- `lib/` for API helpers and utilities
- `public/` for static files
- `styles/` for global styling
- `types/` for TypeScript types

### `docs/`
Use this for notes, API drafts, schema ideas, or task lists.

## Simple Build Order

1. Create the MySQL tables you need.
2. Build the PHP API routes and controllers.
3. Connect the Next.js frontend to the PHP API.
4. Add auth, validation, and tests after the basics work.

## What Each Part Does

- `Next.js` handles screens, forms, and calling the API.
- `PHP` handles backend rules, security, and database access.
- `MySQL` stores your app data.
- `API` connects frontend and backend using JSON.

## Login Demo

The starter now includes a minimal login flow:

- `backend/public/index.php` loads the API router.
- `backend/routes/api.php` exposes `POST /login` and `GET /me`.
- `backend/controllers/AuthController.php` reads JSON input and returns JSON responses.
- `backend/services/AuthService.php` checks the password and starts a session.
- `backend/migrations/001_create_users.sql` creates the `users` table.
- `frontend/app/page.tsx` shows a login form that posts to the backend.

## How It Works

1. The frontend sends `email` and `password` to `POST /login`.
2. The backend finds the user in MySQL.
3. The backend compares the password with `password_verify()`.
4. If it matches, the backend stores `user_id` in the session.
5. The frontend shows the success or error message.

## Demo User

If you run the SQL migration as written, you get a sample user row, but you still need to replace the placeholder hash with a real `password_hash()` value:

- Email: `demo@example.com`
- Password: whatever plain text you used before hashing it

The login form in `frontend/app/page.tsx` is prefilled with `demo@example.com` and `password123`, so if you want that demo to work, generate a hash for `password123` and put it in the migration.

## Run Commands

After installing dependencies, use these commands:

- `npm run dev:backend` starts the PHP API on `http://localhost:8000`
- `npm run dev:frontend` starts the Next.js app on `http://localhost:3000`
- `npm run dev` starts both servers together from the root

If `npm run dev` fails, the usual causes are:

- PHP is not installed or not in your `PATH`
- `frontend/node_modules` has not been installed yet
# client-task
