# 🚀 FlyRank Backend AI Engineering Internship
<div align="center">
<img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
<img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/Docker%20Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Compose">
<img src="https://img.shields.io/badge/better--sqlite3-4A90E2?style=for-the-badge" alt="better-sqlite3">
<img src="https://img.shields.io/badge/OpenAPI-6BA539?style=for-the-badge" alt="OpenAPI">
<img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger">
<img src="https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase Auth">
<img src="https://img.shields.io/badge/JWT-Bearer%20Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT Bearer Auth">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">\n\n\n\n<img src="https\://img.shields.io/badge/Cheerio-HTML%20Parser-E34F26?style=for-the-badge" alt="Cheerio">\n\n\n\n<img src="https\://img.shields.io/badge/Zod-Schema%20Validation-3E67B1?style=for-the-badge" alt="Zod">
<img src="https://img.shields.io/github/stars/mukim-shah/flyrank-backend-ai-internship?style=for-the-badge" alt="GitHub Stars">
<img src="https://img.shields.io/github/last-commit/mukim-shah/flyrank-backend-ai-internship?style=for-the-badge" alt="Last Commit">
</div>

---
# 📖 About

Welcome to my **FlyRank Backend AI Engineering Internship** repository.
This repository contains all assignments, backend projects, API documentation, screenshots, learning notes, and progress completed during my internship at **FlyRank AI**.
The primary objective of this repository is to document my learning journey while building production-quality backend applications using modern backend technologies and best practices.

---

# ⚡ Quick Navigation
- 📂 Repository Structure
- 🏗️ Architecture
- 🚀 Getting Started
- 🛠️ Tech Stack
- 📅 Internship Progress
- 📖 Weekly Assignments
- 🎯 Learning Goals
- 🗺️ Roadmap
- 👨‍💻 Author
---

# 📂 Repository Structure
```text
flyrank-backend-ai-internship/
│
├── README.md
├── server.js
├── package.json
├── package-lock.json
├── openapi.json
├── .gitignore
│
├── week-01/
│   ├── server.js
│   ├── routes.js
│   ├── README.md
│   └── screenshots/
│
├── week-02/
│   ├── server.js
│   ├── routes.js
│   ├── README.md
│   └── screenshot/
│
├── week-03/
│   ├── database.js
│   ├── server.js
│   ├── routes.js
│   ├── tasks.db
│   ├── README.md
│   └── screenshot/
│
├── week-03a/
│   ├── db/
│   │   └── init.sql
│   ├── repositories/
│   │   ├── inMemoryRepository.js
│   │   └── postgresRepository.js
│   ├── screenshot/
│   ├── .dockerignore
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   ├── routes.js
│   ├── server.js
│   ├── service.js
│   └── README.md
│
├── week-04/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── supabase/
│   │   └── client.js
│   ├── screenshots/
│   ├── .dockerignore
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── openapi.json
│   ├── package.json
│   ├── server.js
│   └── README.md
│
├── week-05/
│   ├── cache/
│   │   ├── catalogue-page-1.html
│   │   ├── catalogue-page-2.html
│   │   ├── catalogue-page-3.html
│   │   └── details/
│   ├── output/
│   │   ├── books.json
│   │   ├── errors.json
│   │   ├── raw-books.json
│   │   ├── run-report.json
│   │   └── sample-run-report.json
│   ├── src/
│   │   └── index.js
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
└── ...
```
---

# 🏗️ Architecture

This repository supports **two different execution modes.**

## Standalone Mode
Each week's assignment can run independently.
```bash
npm run week1
npm run week2
npm run week3
```
Architecture:
```text
Client
   │
   ▼
Root server.js
   │
   ├───────────────┬───────────────┬───────────────┐
   ▼               ▼               ▼               ▼
week-01/routes  week-02/routes  week-03/routes  week-03a/routes
```

---
## Multi-Week Mode

Run the complete internship project.
```bash
npm install
npm start
```
Available Routes:
```text
/
├── /week-01
├── /week-02
├── /week-03
├── /week-03a
└── ...
```
---

# 🌐 Live Links

- **Live Demo:** https://flyrank-backend-ai-internship.onrender.com
- **Swagger (Week 02):** https://flyrank-backend-ai-internship.onrender.com/week-02/docs
- **LinkedIn:** https://www.linkedin.com/in/mukim-shah-377825334/
- **GitHub:** https://github.com/mukim-shah
---
# 📄 API Documentation

### Week 02 Swagger
```text
https://flyrank-backend-ai-internship.onrender.com/week-02/docs
```
---
# 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- JavaScript

### Databases
- SQLite
- better-sqlite3
- PostgreSQL
- pg (node-postgres)

### Authentication
- Supabase Auth
- JWT Bearer Authentication
- `@supabase/supabase-js`

### API Development
- REST APIs
- CRUD Operations
- OpenAPI 3.0
- Swagger UI
- Request Validation
- Error Handling
- Protected API Routes
- Authentication Middleware

### DevOps & Infrastructure
- Docker
- Docker Compose
- Docker Named Volumes
- PostgreSQL Containerization
- Environment Variables
- Healthchecks

### Development Tools
- Git
- GitHub
- Postman
- DB Browser for SQLite
- PowerShell

---
# 📅 Internship Progress

| Week | Assignment | Status |
|------|------------|--------|
| ✅ Week 01 | Express Backend with JSON Endpoints | Completed |
| ✅ Week 02 | Express CRUD Task Management API | Completed |
| ✅ Week 03 | Express CRUD API with SQLite Database | Completed |
| ✅ Week 03A | Dockerized Task Management API with PostgreSQL | Completed |
| ✅ Week 04 | Supabase Authentication API | Completed |
| ✅ Week 05 | The Polite Scraper — Responsible Web Scraping Pipeline | Completed |

---
# 📖 Weekly Assignments

# ✅ Week 01 — Simple Express Backend

**Objective:** Build the smallest possible backend server using Express.js with two JSON API endpoints.
### What I Built
- Developed my first Express.js backend application
- Created JSON API endpoints (`/` and `/about`)
- Learned Express routing and request handling
- Returned structured JSON responses
- Organized a basic Node.js project structure
- Used npm scripts to run the application
- Practiced Git & GitHub workflow for version control

### Key Skills
- Express Fundamentals
- JSON APIs
- Express Routing
- Node.js Basics
- Git & GitHub

---
# ✅ Week 02 — Express CRUD Task Management API

**Objective:** Build a RESTful Task Management API with complete CRUD functionality and professional API documentation.

### What I Built
- Developed a complete RESTful CRUD API using Express.js
- Implemented Create, Read, Update and Delete operations
- Added request body validation for POST and PUT endpoints
- Implemented proper HTTP status codes and consistent JSON responses
- Added centralized error handling for invalid requests and missing resources
- Integrated Swagger UI with an OpenAPI 3.0 specification
- Documented every endpoint with request and response examples
- Tested APIs using Postman
- Refactored the project into a modular Express Router architecture
- Created a multi-week repository structure where all assignments can run from a single Express server while still supporting standalone execution

### Key Skills
- REST API Development
- CRUD Operations
- Request Validation
- Error Handling
- Swagger UI
- OpenAPI 3.0
- API Documentation
- Express Router
- Modular Architecture
- Backend Project Organization

---

# ✅ Week 03 — Express CRUD API with SQLite Database
**Objective:** Replace the in-memory task storage from Week 02 with a persistent SQLite database while preserving the existing RESTful API structure.

### What I Built
- Replaced in-memory storage with SQLite
- Integrated better-sqlite3 into the Express application
- Automatically created the database and tasks table
- Seeded initial sample tasks only when the database was empty
- Implemented SQL-based CRUD operations
- Used prepared SQL statements for database queries
- Tested SQL queries using DB Browser for SQLite
- Verified persistent storage across server restarts
- Maintained the same REST API endpoints from Week 02

### Key Skills
- SQLite
- better-sqlite3
- SQL CRUD Operations
- Database Design
- Prepared Statements
- Persistent Storage
- Express + SQLite Integration
- DB Browser for SQLite

---

# ✅ Week 03A — Dockerized Task Management API with PostgreSQL

**Objective:** Containerize the Task Management API, replace the previous SQLite/in-memory storage approach with PostgreSQL, and run the complete application stack using Docker Compose.

### What I Built
- Replaced SQLite-based storage with PostgreSQL
- Integrated PostgreSQL with the Express backend
- Dockerized the Node.js application
- Dockerized the PostgreSQL database
- Created a multi-container Docker Compose setup
- Added PostgreSQL persistent storage using a Docker named volume
- Added environment variable configuration using `.env`
- Added `.env.example` as a safe configuration template
- Created the PostgreSQL database schema using SQL
- Implemented a PostgreSQL repository layer using `pg`
- Added a service layer between API routes and the database repository
- Added PostgreSQL healthcheck using `pg_isready`
- Configured the application to wait for PostgreSQL to become healthy
- Tested complete CRUD operations against PostgreSQL
- Verified database persistence after container recreation
- Tested the API using PowerShell `Invoke-RestMethod`

### 🏗️ Week 03A Architecture
```text
Client
   │
   ▼
Express Routes
   │
   ▼
Service Layer
   │
   ▼
PostgreSQL Repository
   │
   ▼
PostgreSQL Database
   │
   ▼
Docker Named Volume

```

The application follows a layered architecture where HTTP routes communicate with the service layer, which communicates with the PostgreSQL repository. The repository is responsible for database operations.

### 🐳 Docker Architecture
```text
Docker Compose
│
├── app
│   └── Node.js + Express API
│
└── postgres
    └── PostgreSQL 16

```

The application and database run as separate containers, with the application depending on the PostgreSQL healthcheck before startup.

### 🗄️ PostgreSQL

The PostgreSQL database runs inside Docker and uses a named volume for persistent storage.
```text
Database: flyrank_tasks
User: postgres
Port: 5432
Container:
flyrank-postgres
Volume:
postgres_data
```

The Docker named volume allows database data to survive container recreation.
### 🔐 Environment Configuration

Database configuration is managed through environment variables.
```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/flyrank_tasks
PORT=3000
```
A `.env.example` file is also provided as a safe configuration template. The local `.env` file should not be committed to Git.
### 📦 Database Initialization
The PostgreSQL schema is initialized using:
```text
db/init.sql
```
The database initialization creates the `tasks` table:
```sql
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE
);

```
Docker Compose mounts this SQL file into PostgreSQL's initialization directory so the database can automatically create the required table during initialization.

### 🧩 Repository & Service Layer

The active PostgreSQL repository is:
```text
repositories/postgresRepository.js
```

It provides operations for:
- `getAllTasks()`
- `getTaskById(id)`
- `createTask(title, completed)`
- `updateTask(id, title, completed)`
- `deleteTask(id)`

The service layer is implemented in:
```text
service.js

```
This separates database access from HTTP route handling.
### 🌐 Week 03A API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get API information |
| GET | `/health` | Check API health |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task |

### 🚀 Running Week 03A

Inside the `week-03a` directory:
```bash
docker compose up --build
```
To run in detached mode:
```bash
docker compose up -d
```
To check running containers:
```bash
docker compose ps
```
To stop the application:
```bash
docker compose down
```

**Note:** `docker compose down -v` should not be used while testing database persistence because it removes the PostgreSQL volume.

### 🧪 Testing & Verification
The Week 03A API was tested for:
- Health check
- Create task
- Get all tasks
- Get task by ID
- Update task
- Delete task
- Complete CRUD lifecycle
- PostgreSQL database operations
- Docker container startup
- PostgreSQL healthcheck
- Database persistence after container recreation

The persistence test confirmed that data remained available after the application and PostgreSQL containers were stopped and recreated while the Docker named volume was preserved.

### Key Skills
- Docker Fundamentals
- Docker Images
- Docker Containers
- Docker Compose
- PostgreSQL
- PostgreSQL Containerization
- Node.js + PostgreSQL Integration
- `pg` / node-postgres
- SQL Database Initialization
- Environment Variables
- PostgreSQL Healthchecks
- Repository Pattern
- Service Layer Architecture
- Docker Named Volumes
- Persistent Database Storage
- API Testing
- PowerShell API Testing

---

# ✅ Week 04 — Supabase Authentication API

**Objective:** Build a secure Node.js + Express authentication API using Supabase Auth, JWT-based authentication, reusable middleware, protected routes, and Swagger API documentation.

### Assignment
| Detail | Information |
|--------|-------------|
| **Assignment** | BE-03 — Auth - Login & Protect |
| **Track** | Backend AI Engineering |
| **Week** | 04 |
| **Phase** | Build |
| **Authentication** | Supabase Auth |
| **Authorization** | JWT Bearer Authentication |
| **Documentation** | Swagger / OpenAPI |

### What I Built
- Implemented user signup using Supabase Auth
- Implemented user login
- Implemented user logout
- Implemented JWT-based authentication
- Created public API endpoints
- Created protected API endpoints
- Implemented reusable Express authentication middleware
- Added Bearer token extraction from the `Authorization` header
- Added JWT verification through Supabase
- Stored authenticated user information in `req.user`
- Protected profile and dashboard routes
- Added unauthorized request handling
- Added invalid and expired token handling
- Integrated Swagger UI with Bearer JWT authentication
- Added OpenAPI API documentation
- Tested authentication flows and protected routes
- Added secure environment variable configuration

### 🔐 Authentication Architecture

```text
Client
   │
   │ Email + Password
   ▼
Supabase Auth
   │
   │ JWT Access Token
   ▼
Client
   │
   │ Authorization: Bearer <JWT>
   ▼
Express Backend
   │
   │ Verify JWT with Supabase
   ▼
Protected Route

```

### 🔄 Authentication Flow
```text
Client sends email + password
          ↓
Supabase authenticates / creates user
          ↓
Supabase returns access token
          ↓
Client sends JWT in Authorization header
          ↓
Express middleware extracts Bearer token
          ↓
Supabase verifies the token
          ↓
Valid user accesses protected route
          ↓
Missing / invalid / expired token → 401

```

### 🛡️ Authentication Middleware

Authentication logic is implemented in:
```text
middleware/authMiddleware.js
```
The middleware:
1. Reads the `Authorization` header
2. Checks for the `Bearer` scheme
3. Extracts the access token
4. Verifies the token with Supabase
5. Rejects missing or invalid tokens with `401`
6. Stores the authenticated user in `req.user`
7. Stores the token in `req.accessToken`
8. Passes valid requests to the protected route
This allows multiple protected routes to reuse the same authentication logic.

### 🌐 Week 04 API Endpoints

| Method | Endpoint | Authentication | Description |
|--------|----------|----------------|-------------|
| GET | `/` | Public | Check API status |
| POST | `/auth/signup` | Public | Create a new user |
| POST | `/auth/login` | Public | Login and receive JWT tokens |
| POST | `/auth/logout` | Bearer JWT | Logout authenticated user |
| GET | `/public/info` | Public | Get public information |
| GET | `/protected/profile` | Bearer JWT | Get authenticated user profile |
| GET | `/protected/dashboard` | Bearer JWT | Access protected dashboard |
| GET | `/docs` | Public | Open Swagger UI |

### 🔑 Authentication Endpoints

#### Sign Up
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

#### Login
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
Successful login returns authentication tokens:
```json
{
  "access_token": "YOUR_ACCESS_TOKEN",
  "refresh_token": "YOUR_REFRESH_TOKEN"
}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer <access_token>
```
Successful logout returns:
```text
204 No Content
```

### 🔒 Protected Routes
Protected endpoints require:
```http
Authorization: Bearer <access_token>
```

#### Protected Profile
```http
GET /protected/profile
```

#### Protected Dashboard
```http
GET /protected/dashboard
```

### 🌐 Public Route
The public information endpoint does not require authentication:
```http
GET /public/info
```

### ❌ Unauthorized Request Handling
Requests without a token return:
```json
{
  "error": "Access token required"
}
```
with:
```text
401 Unauthorized
```
Requests with an invalid or expired token return:
```json
{
  "error": "Invalid or expired token"
}
```
with:
```text
401 Unauthorized
```
### 📚 Swagger API Documentation
Interactive Swagger documentation is available locally at:
```text
http://localhost:3000/docs
```
Swagger provides:
- Complete API endpoint documentation
- Request and response information
- Bearer JWT authentication
- Interactive API testing
- Protected route testing
Protected endpoints can be tested by logging in, copying the returned `access_token`, selecting **Authorize 🔒** in Swagger, and providing the token.

### 🔐 Environment Configuration
Week 04 uses environment variables for Supabase configuration:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
```

The `.env` file is excluded from GitHub and `.env.example` provides a safe configuration template.

### 🧪 Authentication Testing
The following scenarios were tested:
- User signup with Supabase
- Email confirmation
- Successful login
- Login token generation
- Public endpoint access
- Protected endpoint without token
- Protected endpoint with valid token
- Protected endpoint with invalid token
- Protected endpoint with modified token
- Reusable authentication middleware
- Protected dashboard
- Logout endpoint
- Swagger UI authentication
- Swagger protected endpoint access
- Swagger unauthorized request

### 📊 HTTP Status Codes

| Status | Meaning |
|--------|---------|
| `200` | Successful request |
| `201` | User successfully created |
| `204` | Logout successful with no response body |
| `400` | Invalid or missing request data |
| `401` | Authentication required or token invalid |

### 🔒 Security Practices
- Supabase credentials are stored in `.env`
- `.env` is excluded through `.gitignore`
- `.env.example` contains placeholders only
- Protected routes require Bearer authentication
- JWT tokens are verified through Supabase
- Invalid or expired tokens are rejected with `401 Unauthorized`

### Key Skills
- Supabase Auth
- JWT Authentication
- Bearer Token Authentication
- Express Middleware
- Protected API Routes
- Authentication Flow
- User Signup & Login
- Logout Handling
- Token Verification
- Swagger UI
- OpenAPI Documentation
- Environment Variables
- API Security
- Authentication Testing

---

# 🕷️ Week 05 — The Polite Scraper

**Objective:** Build a small, reliable, and responsible web-scraping pipeline that discovers, extracts, normalizes, validates, caches, stores, and reports structured data from the public **Books to Scrape** practice sandbox.

### Assignment
| Detail | Information |
|--------|-------------|
| **Assignment** | A9 — The Polite Scraper |
| **Track** | Backend AI Engineering |
| **Week** | 05 |
| **Language** | JavaScript / Node.js |
| **Target** | Books to Scrape |
| **Status** | Completed |

### What I Built
- Built a complete polite web-scraping pipeline for the Books to Scrape practice sandbox
- Processed exactly the first 3 catalogue pages
- Discovered 60 unique book detail URLs
- Fetched and cached catalogue and detail HTML locally
- Parsed HTML using Cheerio
- Extracted structured book information from detail pages
- Preserved raw source values such as price_text
- Normalized prices into price_gbp
- Validated normalized records using Zod
- Prevented duplicate records using canonical product URLs
- Added provenance through source_page and fetched_at
- Handled a deliberately broken test URL without terminating the run
- Applied request timeouts and polite request delays
- Generated raw, validated, error, and operational report files
- Designed the pipeline so reruns remain idempotent and do not produce duplicate records

### 🕷️ Scraping Pipeline

```text
Target Classification
    │
    ▼
 Fetch
    │
    ▼
  Cache
    │
    ▼
Discover
    │
    ▼
 Extract
    │
    ▼
Normalize
    │
    ▼
 Validate
    │
    ▼
  Store
    │
    ▼
  Report
```

### 🎯 Assignment Requirements

| Requirement | Result |
|-------------|--------|
| First 3 catalogue pages | ✅ Completed |
| Unique book URLs | ✅ 60 discovered |
| Detail page extraction | ✅ Completed |
| Raw values preserved | ✅ Completed |
| Price normalization | ✅ Completed |
| Schema validation | ✅ Completed |
| Duplicate prevention | ✅ Completed |
| Broken page handling | ✅ Completed |
| Local caching | ✅ Completed |
| Run reporting | ✅ Completed |
| Idempotent reruns | ✅ Completed |

### 📦 Record Structure
Raw records contain the following fields:
```text
title
product_url
price_text
availability_text
rating_text
description
source_page
fetched_at

```
After normalization, the price is represented as:
```text
price_gbp
```
The original price_text is preserved alongside the normalized value.

### 🌐 Target & Scope

The scraper targets:
```text
https://books.toscrape.com/
```

The assignment is intentionally limited to the first 3 catalogue pages and the required book information from the 60 discovered detail pages.
The implementation does not access login-protected, paywalled, private, restricted, or unrelated websites.

### 🤖 Robots & Responsible Scraping
The target's robots endpoint was checked:
```text
https://books.toscrape.com/robots.txt
```
Result:
```text
404 Not Found
No robots file found.
```
A missing robots.txt was not treated as permission to scrape without limits.
The scraper therefore applies responsible collection practices:
- Identifying User-Agent
- Request timeout of 5000 ms
- Minimum 500 ms delay between real network requests
- Local caching to avoid unnecessary requests
- HTTP status validation
- No delay for cache hits
- Only required data is collected
- No authentication, paywall, or access-control bypassing
- Official APIs should be preferred for real-world services where available

### 🧪 Validation & Failure Handling
Each detail page is processed independently so a single failure does not terminate the complete run.
Failure handling includes:
- 200 → process normally
- Timeout → retry once
- 5xx → retry once
- 404 → no retry
- 403 → no retry
- Other request failures → log and skip
A deliberately fake book URL was added during testing to verify failure isolation.
Example checkpoint:
```text
=== STAGE 5 CHECKPOINT ===
pages_fetched=0
cache_hits=60
valid_records=60
invalid_records=0
failed_pages=1
duration_ms=1733
STAGE 5 PASSED
```
The pages_fetched=0 result is expected when all legitimate detail pages are already cached. The deliberately broken URL was uncached, failed as expected, and was skipped without affecting the 60 valid records.

### 📊 Final Pipeline Results

| Metric | Result |
|--------|--------|
| Catalogue pages processed | 3 |
| Unique book URLs | 60 |
| Detail pages processed | 60 |
| Valid records | 60 |
| Invalid records | 0 |
| Failed test pages | 1 |
| Duplicate output records | 0 |
| Cache hits | 60 on the demonstrated run |
| Run status | PASSED |

### 📁 Generated Outputs
The Week 05 scraper produces:

| File | Purpose |
|------|---------|
| output/books.json | Normalized and validated book records |
| output/errors.json | Invalid records |
| output/raw-books.json | Raw extracted records |
| output/run-report.json | Operational run summary |
| output/sample-run-report.json | Published sample evidence |

Generated cache files and normal development outputs are excluded from Git through .gitignore, while the sample run report can be published as evidence.

### ♻️ Idempotency
The scraper is designed to be safely rerunnable.
```text
Run 1 → 60 valid records
Run 2 → 60 valid records
```
A second run does not append another 60 records to produce 120 duplicates. Output is regenerated from the current validated dataset.

### 🧠 Key Skills
- Web Scraping
- Cheerio HTML Parsing
- Fetch API
- Local Response Caching
- Request Timeouts
- Polite Request Throttling
- URL Discovery
- Data Extraction
- Data Normalization
- Zod Schema Validation
- Duplicate Prevention
- Error Isolation
- Idempotent Processing
- Provenance Tracking
- JSON Data Storage
- Operational Run Reporting
- Responsible Data Collection
- Node.js File System
- JavaScript Backend Development

### 📝 Honest Limitation
The scraper is designed specifically for the current HTML structure of **Books to Scrape**.
Its selectors depend on the target page structure, so HTML changes may require selector updates. It is not intended to be a universal scraper.
A browser automation tool such as Playwright could be useful for JavaScript-rendered websites, but it was not necessary for this assignment because the required data was available directly in the returned HTML.

### 📚 Stage Commit History
```text
Stage 0: classify scraping target
Stage 1: fetch and cache HTML
Stage 2: discover catalogue pages
Stage 3: extract detail page records
Stage 4: normalize and validate records
Stage 6: publish scraper evidence
```

### 🎓 Week 05 Learning Outcomes
By completing this assignment, I practiced:
- Designing a complete backend scraping pipeline
- Understanding responsible web data collection
- Working with HTML parsing using Cheerio
- Discovering and deduplicating URLs
- Building a local caching layer
- Handling network failures without terminating a pipeline
- Applying retries selectively
- Normalizing raw values into structured data
- Validating records with schemas
- Preserving raw and normalized data together
- Designing idempotent data-processing workflows
- Producing operational run reports
- Thinking about reliability, provenance, and failure isolation

# 🚀 Repository Highlights
- RESTful API Development
- Express.js Backend
- CRUD Operations
- SQL Database Integration
- SQLite Database Integration
- PostgreSQL Database Integration
- Supabase Authentication
- JWT Bearer Authentication
- Protected API Routes
- Authentication Middleware
- Persistent Data Storage
- Docker Containerization
- Docker Compose
- Docker Named Volumes
- Repository Pattern
- Service Layer Architecture
- Request Validation
- Error Handling
- Swagger Integration
- OpenAPI Documentation
- API Security
- Environment Configuration
- Clean Folder Structure
- Modular Express Router
- Multi-Week Architecture
- Database Persistence Testing
- Authentication Testing
- GitHub Best Practices
---

# 🎯 Learning Goals
During this internship I aim to:
- Build Production Ready APIs
- Learn Backend Engineering
- Improve Problem Solving
- Master REST Architecture
- Learn API Documentation Standards
- Build Scalable Node.js Applications
- Understand Software Architecture
- Learn Database Engineering
- Understand Docker & Containerization
- Work with PostgreSQL
- Implement Secure Authentication
- Build Protected APIs
- Work with JWT Authentication
- Become an AI Backend Engineer

---
# 🗺️ Internship Roadmap
```text
✅ Week 01
      │
      ▼
✅ Week 02
      │
      ▼
✅ Week 03
      │
      ▼
✅ Week 03A
      │
      ▼
✅ Week 04
      │
      ▼
✅ Week 05
      │
      ▼
⏳ Week 06
      │
      ▼
🎯 Internship Complete

```
---

# 📝 Notes
### `server.js`
Each week's `server.js` is a standalone implementation and can be executed independently.
### `routes.js`
Each week's `routes.js` exports an Express Router that is mounted by the root `server.js`.
This modular approach allows multiple internship assignments to run under a single Express application while keeping every assignment independently executable.
### Week 03A Architecture
Week 03A extends the backend architecture by introducing a PostgreSQL repository and service layer while using Docker Compose to run the API and database together.
### Week 04 Authentication
Week 04 extends the backend learning journey by introducing authentication and API security using Supabase Auth, JWT Bearer tokens, reusable Express middleware, protected routes, and Swagger authentication testing.
### Week 05 Web Scraping
Week 05 extends the backend learning journey into responsible web data collection by introducing HTML parsing, URL discovery, local caching, data normalization, schema validation, failure isolation, idempotent processing, and operational run reporting.
---

# 🚀 Future Plans
- MongoDB Integration
- Unit Testing
- CI/CD Pipeline
- Advanced Data Pipelines
- Advanced Backend Projects
- Production Deployment Improvements

---

# 👨‍💻 Author
**Mukim Shah**
Backend AI Engineering Intern
FlyRank AI
GitHub:
https://github.com/mukim-shah
LinkedIn:
https://www.linkedin.com/in/mukim-shah-377825334/

---
# ⭐ Repository Status

This repository is actively maintained and will continue to be updated throughout my **FlyRank Backend AI Engineering Internship** as I complete new assignments and backend projects.
New assignments and projects will be added weekly as I progress through the internship.