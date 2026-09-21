# 🚀 FlyRank Backend AI Engineering Internship

![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge\&logo=node.js\&logoColor=white)

![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)

![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge\&logo=sqlite\&logoColor=white)

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white)

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)

![Docker Compose](https://img.shields.io/badge/Docker%20Compose-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)

![better--sqlite3](https://img.shields.io/badge/better--sqlite3-4A90E2?style=for-the-badge)

![OpenAPI](https://img.shields.io/badge/OpenAPI-6BA539?style=for-the-badge)

![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge\&logo=swagger\&logoColor=black)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)

![GitHub Repo stars](https://img.shields.io/github/stars/mukim-shah/flyrank-backend-ai-internship?style=for-the-badge)

![GitHub last commit](https://img.shields.io/github/last-commit/mukim-shah/flyrank-backend-ai-internship?style=for-the-badge)

---

# 📖 About

Welcome to my **FlyRank Backend AI Engineering Internship** repository.

This repository contains all assignments, backend projects, API documentation, screenshots, learning notes, and progress completed during my internship at **FlyRank AI**.

The primary objective of this repository is to document my learning journey while building production-quality backend applications using modern backend technologies and best practices.

---

# ⚡ Quick Navigation

* 📂 Repository Structure
* 🏗️ Architecture
* 🚀 Getting Started
* 🛠️ Tech Stack
* 📅 Internship Progress
* 📖 Weekly Assignments
* 🎯 Learning Goals
* 🗺️ Roadmap
* 👨‍💻 Author

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
│   ├── server.js
│   ├── routes.js
│   ├── README.md
│   └── screenshots/
│
├── week-02/
│   ├── server.js
│   ├── routes.js
│   ├── README.md
│   └── screenshot/
│
├── week-03/
│   ├── database.js
│   ├── server.js
│   ├── routes.js
│   ├── tasks.db
│   ├── README.md
│   └── screenshot/
│
├── week-03a/
│   ├── db/
│   │   └── init.sql
│   ├── repositories/
│   │   ├── inMemoryRepository.js
│   │   └── postgresRepository.js
│   ├── screenshot/
│   ├── .dockerignore
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   ├── routes.js
│   ├── server.js
│   ├── service.js
│   └── README.md
│
├── week-04/
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
   ▼               ▼               ▼               ▼
week-01/routes  week-02/routes  week-03/routes  week-03a/routes
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

* **Live Demo:** https://flyrank-backend-ai-internship.onrender.com
* **Swagger (Week 02):** https://flyrank-backend-ai-internship.onrender.com/week-02/docs
* **LinkedIn:** https://www.linkedin.com/in/mukim-shah-377825334/
* **GitHub:** https://github.com/mukim-shah

---

# 📄 API Documentation

### Week 02 Swagger

```text
https://flyrank-backend-ai-internship.onrender.com/week-02/docs
```

---

# 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* JavaScript

### Databases

* SQLite
* better-sqlite3
* PostgreSQL
* pg (node-postgres)

### API Development

* REST APIs
* CRUD Operations
* OpenAPI 3.0
* Swagger UI
* Request Validation
* Error Handling

### DevOps & Infrastructure

* Docker
* Docker Compose
* Docker Named Volumes
* PostgreSQL Containerization
* Environment Variables
* Healthchecks

### Development Tools

* Git
* GitHub
* Postman
* DB Browser for SQLite
* PowerShell

---

# 📅 Internship Progress

| Week       | Assignment                                     | Status      |
| ---------- | ---------------------------------------------- | ----------- |
| ✅ Week 01  | Express Backend with JSON Endpoints            | Completed   |
| ✅ Week 02  | Express CRUD Task Management API               | Completed   |
| ✅ Week 03  | Express CRUD API with SQLite Database          | Completed   |
| ✅ Week 03A | Dockerized Task Management API with PostgreSQL | Completed   |
| ⏳ Week 04  | Coming Soon                                    | In Progress |

---

# 📖 Weekly Assignments

## ✅ Week 01 — Simple Express Backend

**Objective:** Build the smallest possible backend server using Express.js with two JSON API endpoints.

### What I Built

* Developed my first Express.js backend application
* Created JSON API endpoints (`/` and `/about`)
* Learned Express routing and request handling
* Returned structured JSON responses
* Organized a basic Node.js project structure
* Used npm scripts to run the application
* Practiced Git & GitHub workflow for version control

### Key Skills

* Express Fundamentals
* JSON APIs
* Express Routing
* Node.js Basics
* Git & GitHub

---

# ✅ Week 02 — Express CRUD Task Management API

**Objective:** Build a RESTful Task Management API with complete CRUD functionality and professional API documentation.

### What I Built

* Developed a complete RESTful CRUD API using Express.js
* Implemented Create, Read, Update and Delete operations
* Added request body validation for POST and PUT endpoints
* Implemented proper HTTP status codes and consistent JSON responses
* Added centralized error handling for invalid requests and missing resources
* Integrated Swagger UI with an OpenAPI 3.0 specification
* Documented every endpoint with request and response examples
* Tested APIs using Postman
* Refactored the project into a modular Express Router architecture
* Created a multi-week repository structure where all assignments can run from a single Express server while still supporting standalone execution

### Key Skills

* REST API Development
* CRUD Operations
* Request Validation
* Error Handling
* Swagger UI
* OpenAPI 3.0
* API Documentation
* Express Router
* Modular Architecture
* Backend Project Organization

---

# ✅ Week 03 — Express CRUD API with SQLite Database

**Objective:** Replace the in-memory task storage from Week 02 with a persistent SQLite database while preserving the existing RESTful API structure.

### What I Built

* Replaced in-memory storage with SQLite
* Integrated better-sqlite3 into the Express application
* Automatically created the database and tasks table
* Seeded initial sample tasks only when the database was empty
* Implemented SQL-based CRUD operations
* Used prepared SQL statements for database queries
* Tested SQL queries using DB Browser for SQLite
* Verified persistent storage across server restarts
* Maintained the same REST API endpoints from Week 02

### Key Skills

* SQLite
* better-sqlite3
* SQL CRUD Operations
* Database Design
* Prepared Statements
* Persistent Storage
* Express + SQLite Integration
* DB Browser for SQLite

---

# ✅ Week 03A — Dockerized Task Management API with PostgreSQL

**Objective:** Containerize the Task Management API, replace the previous SQLite/in-memory storage approach with PostgreSQL, and run the complete application stack using Docker Compose.

### What I Built

* Replaced SQLite-based storage with PostgreSQL
* Integrated PostgreSQL with the Express backend
* Dockerized the Node.js application
* Dockerized the PostgreSQL database
* Created a multi-container Docker Compose setup
* Added PostgreSQL persistent storage using a Docker named volume
* Added environment variable configuration using `.env`
* Added `.env.example` as a safe configuration template
* Created the PostgreSQL database schema using SQL
* Implemented a PostgreSQL repository layer using `pg`
* Added a service layer between API routes and the database repository
* Added PostgreSQL healthcheck using `pg_isready`
* Configured the application to wait for PostgreSQL to become healthy
* Tested complete CRUD operations against PostgreSQL
* Verified database persistence after container recreation
* Tested the API using PowerShell `Invoke-RestMethod`

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
│   └── Node.js + Express API
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

* `getAllTasks()`
* `getTaskById(id)`
* `createTask(title, completed)`
* `updateTask(id, title, completed)`
* `deleteTask(id)`

The service layer is implemented in:

```text
service.js
```

This separates database access from HTTP route handling.

### 🌐 Week 03A API Endpoints

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/`          | Get API information     |
| GET    | `/health`    | Check API health        |
| GET    | `/tasks`     | Get all tasks           |
| GET    | `/tasks/:id` | Get task by ID          |
| POST   | `/tasks`     | Create a new task       |
| PUT    | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task           |

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

* Health check
* Create task
* Get all tasks
* Get task by ID
* Update task
* Delete task
* Complete CRUD lifecycle
* PostgreSQL database operations
* Docker container startup
* PostgreSQL healthcheck
* Database persistence after container recreation

The persistence test confirmed that data remained available after the application and PostgreSQL containers were stopped and recreated while the Docker named volume was preserved.

### Key Skills

* Docker Fundamentals
* Docker Images
* Docker Containers
* Docker Compose
* PostgreSQL
* PostgreSQL Containerization
* Node.js + PostgreSQL Integration
* `pg` / node-postgres
* SQL Database Initialization
* Environment Variables
* PostgreSQL Healthchecks
* Repository Pattern
* Service Layer Architecture
* Docker Named Volumes
* Persistent Database Storage
* API Testing
* PowerShell API Testing

---

# 🚀 Repository Highlights

* RESTful API Development
* Express.js Backend
* CRUD Operations
* SQL Database Integration
* SQLite Database Integration
* PostgreSQL Database Integration
* Persistent Data Storage
* Docker Containerization
* Docker Compose
* Docker Named Volumes
* Repository Pattern
* Service Layer Architecture
* Request Validation
* Error Handling
* Swagger Integration
* OpenAPI Documentation
* Clean Folder Structure
* Modular Express Router
* Multi-Week Architecture
* Environment Configuration
* Database Persistence Testing
* GitHub Best Practices

---

# 🎯 Learning Goals

During this internship I aim to:

* Build Production Ready APIs
* Learn Backend Engineering
* Improve Problem Solving
* Master REST Architecture
* Learn API Documentation Standards
* Build Scalable Node.js Applications
* Understand Software Architecture
* Learn Database Engineering
* Understand Docker & Containerization
* Work with PostgreSQL
* Become an AI Backend Engineer

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
⏳ Week 04
      │
      ▼
⏳ Week 05
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

---

# 🚀 Future Plans

* Environment Variables
* JWT Authentication
* PostgreSQL Integration
* MongoDB Integration
* Docker Support
* Unit Testing
* CI/CD Pipeline
* Deployment Improvements
* Advanced Backend Projects

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
