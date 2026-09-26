# 🔐 FlyRank Week 04 — Supabase Authentication API

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-22-5FA04E?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge\&logo=supabase\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Bearer%20Auth-000000?style=for-the-badge\&logo=jsonwebtokens\&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=for-the-badge\&logo=swagger\&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)

</p>

<p align="center">

**A secure Node.js + Express authentication API built for the FlyRank AI Backend Engineering Track.**

</p>

---

## 📖 Overview

This project was developed as part of the **FlyRank AI Backend Engineering Internship — Week 04**.

The project implements a secure authentication system using **Supabase Auth**, **JWT Bearer Authentication**, **Express middleware**, and **Swagger/OpenAPI documentation**.

The API supports:

* 👤 User Sign Up
* 🔑 User Login
* 🚪 User Logout
* 🔐 JWT-based Authentication
* 🛡️ Protected API Routes
* ♻️ Reusable Authentication Middleware
* 📚 Interactive Swagger API Documentation
* 🔒 Bearer Token Authentication

Supabase is responsible for user authentication and token management, while the Express backend verifies authentication before allowing access to protected resources.

---

# 🎯 Assignment

| Detail                | Information                    |
| --------------------- | ------------------------------ |
| **Assignment**        | BE-03 — Auth - Login & Protect |
| **Track**             | Backend AI Engineering         |
| **Week**              | 04                             |
| **Phase**             | Build                          |
| **Authentication**    | Supabase Auth                  |
| **Authorization**     | JWT Bearer Token               |
| **API Documentation** | Swagger / OpenAPI              |

### Objective

Build a secure backend API that handles:

* User registration
* User login
* User logout
* JWT authentication
* Protected routes
* Reusable authentication middleware
* Swagger documentation with Bearer authentication

---

# 🏗️ Authentication Architecture

The authentication flow follows a simple three-part trust model:

```text
┌──────────────┐
│    Client    │
└──────┬───────┘
       │
       │ Email + Password
       ▼
┌──────────────────────┐
│    Supabase Auth     │
└──────────┬───────────┘
           │
           │ JWT Access Token
           ▼
┌──────────────────────┐
│       Client         │
└──────────┬───────────┘
           │
           │ Authorization: Bearer <JWT>
           ▼
┌──────────────────────┐
│   Express Backend    │
└──────────┬───────────┘
           │
           │ Verify JWT with Supabase
           ▼
┌──────────────────────┐
│    Protected Route   │
└──────────────────────┘
```

---

## 🔄 Authentication Flow

```text
1. Client sends email + password
          ↓
2. Supabase authenticates / creates user
          ↓
3. Supabase returns access token
          ↓
4. Client sends JWT in Authorization header
          ↓
5. Express middleware extracts Bearer token
          ↓
6. Supabase verifies the token
          ↓
7. Valid user accesses protected route
          ↓
8. Missing / invalid / expired token → 401
```

The backend therefore does not blindly trust the client. Protected requests must provide a valid Bearer token before the route handler is executed.

---

# 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* JavaScript

### Authentication

* Supabase Auth
* `@supabase/supabase-js`
* JWT Bearer Authentication

### API Documentation

* OpenAPI
* Swagger UI
* `swagger-ui-express`

### Configuration & Tools

* dotenv
* Git
* GitHub

---

# 📁 Project Structure

```text
week-04/
│
├── middleware/
│   └── authMiddleware.js
│
├── supabase/
│   └── client.js
│
├── screenshots/
│   ├── 01-stage2-public-info.png
│   ├── 02-stage2-protected-profile-token.png
│   ├── 03-stage3-valid-token-profile.png
│   ├── 04-stage3-invalid-token-profile.png
│   ├── 05-stage4-middleware-valid-profile.png
│   ├── 06-stage4-middleware-no-token.png
│   ├── 07-stage4-logout-success.png
│   ├── 08-stage4-protected-dashboard.png
│   ├── 09-stage4-dashboard-no-token.png
│   ├── 10-stage5-swagger-protected-profile.png
│   └── 11-stage5-swagger-unauthorized-profile.png
│
├── .dockerignore
├── .env
├── .env.example
├── .gitignore
├── openapi.json
├── package.json
├── server.js
└── README.md
```

> ⚠️ `.env` contains local Supabase credentials and must not be committed to GitHub.

---

# 🔐 Environment Variables

Create a `.env` file inside the `week-04` directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
```

### 🔒 Security Note

Never commit `.env` or private credentials to GitHub.

The project uses `.gitignore` to prevent environment files from being committed.

A safe configuration template is provided through:

```text
.env.example
```

Example:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
```

---

# 🚀 Installation

Navigate to the `week-04` directory:

```bash
cd week-04
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Run the Server

Start the server:

```bash
node server.js
```

Expected output:

```text
Server running on http://localhost:3000
Supabase client initialized successfully
```

---

# 📚 Swagger API Documentation

Swagger UI is available at:

```text
http://localhost:3000/docs
```

Swagger provides:

* Complete API endpoint documentation
* Request and response information
* Bearer JWT authentication
* Interactive API testing
* Protected route testing

---

## 🔑 Swagger Authentication

To test protected routes through Swagger:

```text
1. Login using /auth/login
        ↓
2. Copy the returned access_token
        ↓
3. Click "Authorize 🔒"
        ↓
4. Paste the access token
        ↓
5. Execute protected endpoints
```

Swagger sends the token using:

```http
Authorization: Bearer <access_token>
```

---

# 📡 API Endpoints

| Method | Endpoint               | Authentication | Description                    |
| :----: | ---------------------- | -------------- | ------------------------------ |
|  `GET` | `/`                    | 🟢 Public      | Check API status               |
| `POST` | `/auth/signup`         | 🟢 Public      | Create a new user              |
| `POST` | `/auth/login`          | 🟢 Public      | Login and receive JWT tokens   |
| `POST` | `/auth/logout`         | 🔴 Bearer JWT  | Logout authenticated user      |
|  `GET` | `/public/info`         | 🟢 Public      | Get public information         |
|  `GET` | `/protected/profile`   | 🔴 Bearer JWT  | Get authenticated user profile |
|  `GET` | `/protected/dashboard` | 🔴 Bearer JWT  | Access protected dashboard     |
|  `GET` | `/docs`                | 🟢 Public      | Open Swagger UI                |

---

# 🔑 Authentication Endpoints

## 1️⃣ Sign Up

### Request

```http
POST /auth/signup
Content-Type: application/json
```

```json
{
  "email": "your-email@example.com",
  "password": "YourStrongPassword123"
}
```

### Response

```text
201 Created
```

A new user is created through Supabase Auth.

---

## 2️⃣ Login

### Request

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "your-email@example.com",
  "password": "YourStrongPassword123"
}
```

### Response

```json
{
  "access_token": "YOUR_ACCESS_TOKEN",
  "refresh_token": "YOUR_REFRESH_TOKEN"
}
```

The returned `access_token` is used to access protected endpoints.

---

## 3️⃣ Logout

### Request

```http
POST /auth/logout
Authorization: Bearer <access_token>
```

### Response

```text
204 No Content
```

---

# 🔒 Protected Endpoints

Protected endpoints require:

```http
Authorization: Bearer <access_token>
```

---

## 👤 Get Profile

```http
GET /protected/profile
```

### Example Response

```json
{
  "id": "user-uuid",
  "email": "your-email@example.com",
  "created_at": "2026-09-26T07:00:00.000Z"
}
```

---

## 📊 Protected Dashboard

```http
GET /protected/dashboard
```

### Example Response

```json
{
  "message": "Welcome to your protected dashboard",
  "user": {
    "id": "user-uuid",
    "email": "your-email@example.com"
  }
}
```

---

# 🌐 Public Endpoint

The public information endpoint does not require authentication.

```http
GET /public/info
```

### Response

```json
{
  "message": "Welcome stranger! This info is public."
}
```

This endpoint is useful for demonstrating the difference between public and protected API resources.

---

# 🛡️ Authentication Middleware

Authentication logic is implemented as reusable Express middleware:

```text
middleware/authMiddleware.js
```

The middleware performs the following operations:

```text
Authorization Header
        ↓
Check Bearer Scheme
        ↓
Extract Access Token
        ↓
Verify Token with Supabase
        ↓
 ┌───────────────┐
 │ Valid Token?  │
 └───────┬───────┘
         │
    ┌────┴────┐
    │         │
   YES        NO
    │         │
    ▼         ▼
req.user    401
req.accessToken
    │
    ▼
Protected Route
```

### Middleware Responsibilities

1. Reads the `Authorization` header
2. Checks for the `Bearer` scheme
3. Extracts the access token
4. Verifies the token with Supabase
5. Rejects missing or invalid tokens with `401`
6. Stores the authenticated user in `req.user`
7. Stores the token in `req.accessToken`
8. Passes valid requests to the protected route

This approach allows the same authentication logic to be reused across multiple protected routes.

---

# ❌ Unauthorized Request Handling

## Missing Token

Requests without an access token return:

```json
{
  "error": "Access token required"
}
```

HTTP status:

```text
401 Unauthorized
```

---

## Invalid / Expired Token

Requests with an invalid or expired token return:

```json
{
  "error": "Invalid or expired token"
}
```

HTTP status:

```text
401 Unauthorized
```

---

# 📸 Project Evidence

The project includes screenshots covering the major authentication stages.

## 🌐 Public Endpoint

![Public Endpoint](screenshots/01-stage2-public-info.png)

---

## 🔐 Protected Profile with Token

![Protected Profile](screenshots/02-stage2-protected-profile-token.png)

---

## ✅ Valid JWT Verification

![Valid JWT](screenshots/03-stage3-valid-token-profile.png)

---

## ❌ Invalid JWT Verification

![Invalid JWT](screenshots/04-stage3-invalid-token-profile.png)

---

## 🛡️ Authentication Middleware

![Authentication Middleware](screenshots/05-stage4-middleware-valid-profile.png)

---

## 🚫 Missing Token

![Missing Token](screenshots/06-stage4-middleware-no-token.png)

---

## 🚪 Logout

![Logout](screenshots/07-stage4-logout-success.png)

---

## 📊 Protected Dashboard

![Protected Dashboard](screenshots/08-stage4-protected-dashboard.png)

---

## 🚫 Dashboard Without Token

![Dashboard Without Token](screenshots/09-stage4-dashboard-no-token.png)

---

## 📚 Swagger Protected Profile

![Swagger Protected Profile](screenshots/10-stage5-swagger-protected-profile.png)

---

## 🔒 Swagger Unauthorized Request

![Swagger Unauthorized](screenshots/11-stage5-swagger-unauthorized-profile.png)

---

# 🧪 Tested Authentication Scenarios

The following authentication scenarios were tested during development:

| Test                                   | Status |
| -------------------------------------- | :----: |
| User signup with Supabase              |    ✅   |
| Email confirmation                     |    ✅   |
| Successful login                       |    ✅   |
| Login token generation                 |    ✅   |
| Public endpoint access                 |    ✅   |
| Protected endpoint without token       |    ✅   |
| Protected endpoint with valid token    |    ✅   |
| Protected endpoint with invalid token  |    ✅   |
| Protected endpoint with modified token |    ✅   |
| Reusable authentication middleware     |    ✅   |
| Protected dashboard                    |    ✅   |
| Logout endpoint                        |    ✅   |
| Swagger UI authentication              |    ✅   |
| Swagger protected endpoint access      |    ✅   |
| Swagger unauthorized request           |    ✅   |

---

# 📊 HTTP Status Codes

| Status | Meaning                                  |
| :----: | ---------------------------------------- |
|  `200` | Successful request                       |
|  `201` | User successfully created                |
|  `204` | Logout successful with no response body  |
|  `400` | Invalid or missing request data          |
|  `401` | Authentication required or token invalid |

---

# 🧠 Key Concepts Learned

## 🔑 JWT Bearer Authentication

JWT access tokens allow the backend to identify and authenticate users without storing authentication state directly inside the Express application.

---

## 🧩 Express Middleware

Express middleware provides reusable logic that executes before protected route handlers.

This makes authentication logic reusable across multiple protected endpoints.

---

## ⚡ Supabase Auth

Supabase handles user authentication and token management while the backend verifies access tokens before allowing protected operations.

---

## 📚 OpenAPI & Swagger

OpenAPI describes the API contract, while Swagger UI provides an interactive interface for developers to explore and test the API.

The project also demonstrates Bearer JWT authentication directly inside Swagger UI.

---

# 📈 Assignment Stages

## Stage 0 — Setup

* Node.js server
* Supabase project
* Environment variables
* Supabase client

### Status

✅ Completed

---

## Stage 1 — Signup & Login

* Signup endpoint
* Login endpoint
* Access token generation
* Refresh token generation

### Status

✅ Completed

---

## Stage 2 — Public & Protected Routes

* Public endpoint
* Protected profile endpoint
* Bearer token extraction

### Status

✅ Completed

---

## Stage 3 — Token Verification

* Supabase JWT verification
* Valid token handling
* Invalid token handling
* Expired / invalid token response

### Status

✅ Completed

---

## Stage 4 — Authentication Middleware

* Reusable authentication middleware
* Protected profile
* Protected dashboard
* Logout endpoint

### Status

✅ Completed

---

## Stage 5 — Swagger UI

* OpenAPI specification
* Swagger UI
* Bearer JWT security scheme
* Protected endpoint documentation
* Interactive authentication testing

### Status

✅ Completed

---

## Stage 6 — GitHub Publication

* Secure environment configuration
* Professional documentation
* GitHub publication
* Reproducible setup instructions

### Status

✅ Completed

---

# 🔒 Security

The following security practices are followed:

* 🔐 Supabase credentials are stored in `.env`
* 🚫 `.env` is excluded through `.gitignore`
* 📄 `.env.example` contains placeholders only
* 🛡️ Protected routes require Bearer authentication
* 🔎 JWT tokens are verified through Supabase
* 🚫 Invalid or expired tokens are rejected with `401 Unauthorized`

> **Important:** Never commit real credentials, access tokens, refresh tokens, or other secrets to GitHub.

---

# 🎯 Week 04 Learning Outcomes

By completing this assignment, I practiced:

* Building authentication APIs with Express
* Integrating Supabase Auth
* Working with JWT access tokens
* Implementing Bearer authentication
* Creating reusable authentication middleware
* Protecting API routes
* Handling unauthorized requests
* Implementing login and logout flows
* Documenting APIs using OpenAPI
* Testing protected APIs using Swagger UI
* Managing environment variables securely
* Structuring a production-style authentication backend

---

# 👨‍💻 Author

## Mukim Shah

**AI Backend Developer | Automation Specialist | Full-Stack Developer**

🔗 **GitHub:**
https://github.com/mukim-shah

🔗 **LinkedIn:**
https://www.linkedin.com/in/mukim-shah-377825334/

🌐 **Portfolio:**
https://quickautomate.in

---

# 📄 License

This project was created as part of the **FlyRank AI Backend Engineering Internship** coursework.

---

<p align="center">

### 🚀 FlyRank AI Backend Engineering Internship

**Week 04 — Authentication & API Security**

Built with Node.js • Express • Supabase • JWT • Swagger

</p>
