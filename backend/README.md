# Backend

This folder is for the PHP API.

## Suggested Use

- `public/` is the web entry point.
- `routes/` defines API URLs.
- `controllers/` receives requests and returns responses.
- `services/` keeps business logic out of controllers.
- `repositories/` wraps MySQL queries.
- `models/` describes data objects.
- `middlewares/` handles auth, validation gates, and CORS.
- `migrations/` changes database structure safely.
- `tests/` checks backend behavior.

## Environment

Copy `backend/.env.example` to `.env` when you start wiring secrets and database credentials.

By default the backend now falls back to a local SQLite database at `backend/storage/backend.sqlite`, so you can run it without setting up MySQL first.
