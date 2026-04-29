# Portfolio Backend

Node.js + Express + PostgreSQL backend for the portfolio contact form.

## Setup

1. **Install PostgreSQL** (if not already installed)

2. **Create Database**
   ```sql
   CREATE DATABASE portfolio_db;
   ```

3. **Configure Environment**
   - Edit `.env` file
   - Set your PostgreSQL credentials:
     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=portfolio_db
     DB_USER=postgres
     DB_PASSWORD=your_password_here
     PORT=3000
     ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Run Server**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

Server runs on `http://localhost:3000`

## API Endpoints

- `POST /api/contact` — Save a contact message
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!"
  }
  ```

- `GET /api/contact` — Retrieve all messages

## Database Schema

```sql
CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

Table is auto-created on server startup.
