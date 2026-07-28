# 🚀 FlyRank Backend AI Engineering Internship

![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![better--sqlite3](https://img.shields.io/badge/better--sqlite3-4A90E2?style=for-the-badge)
![OpenAPI](https://img.shields.io/badge/OpenAPI-6BA539?style=for-the-badge)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Repo stars](https://img.shields.io/github/stars/mukim-shah/flyrank-backend-ai-internship?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/mukim-shah/flyrank-backend-ai-internship?style=for-the-badge)

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

``` text
Client
   │
   ▼
Root server.js
   │
   ├───────────────┬───────────────┐
   ▼               ▼               ▼
week-01/routes  week-02/routes  week-03/routes
```

---

## Multi-Week Mode

Run the complete internship project.

```bash
npm install
npm start
```

Available Routes

```text
/
├── /week-01
├── /week-02
├── /week-03
└── ...
```

---

## 🌐 Live Links

-   **Live Demo:** https://flyrank-backend-ai-internship.onrender.com
-   **Swagger (Week 02):**
    https://flyrank-backend-ai-internship.onrender.com/week-02/docs
-   **LinkedIn:** https://www.linkedin.com/in/mukim-shah-377825334/
-   **GitHub:** https://github.com/mukim-shah

# 📄 API Documentation

Week 02 Swagger

```text
 https://flyrank-backend-ai-internship.onrender.com/week-02/docs
```

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- JavaScript
- SQLite
- better-sqlite3
- OpenAPI 3.0
- Swagger UI
- Git
- GitHub
- Postman
- DB Browser for SQLite

---

# 📅 Internship Progress

| Week | Assignment | Status |
|------|------------|--------|
| ✅ Week 01 | Express Backend with JSON Endpoints | Completed |
| ✅ Week 02 | Express CRUD Task Management API | Completed |
| ✅ Week 03 | Express CRUD API with SQLite Database | Completed |
| ⏳ Week 04 | Coming Soon | In Progress |

---

# 📖 Weekly Assignments

## ✅ Week 01 — Simple Express Backend

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

## ✅ Week 02 — Express CRUD Task Management API

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

## ✅ Week 03 — Express CRUD API with SQLite Database

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

# 🚀 Repository Highlights

- RESTful API Development
- Express.js Backend
- CRUD Operations
- SQL Database Integration
- SQLite Database Integration
- Persistent Data Storage
- SQL Queries
- Request Validation
- Error Handling
- Swagger Integration
- OpenAPI Documentation
- Clean Folder Structure
- Modular Express Router
- Multi-Week Architecture
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

### server.js

Each week's `server.js` is a standalone implementation and can be executed independently.

### routes.js

Each week's `routes.js` exports an Express Router that is mounted by the root `server.js`.

This modular approach allows multiple internship assignments to run under a single Express application while keeping every assignment independently executable.

---

# 🚀 Future Plans

- Environment Variables
- JWT Authentication
- PostgreSQL Integration
- MongoDB Integration
- Docker Support
- Unit Testing
- CI/CD Pipeline
- Deployment Improvements
- Advanced Backend Projects

---

# 👨‍💻 Author

**Mukim Shah**

Backend AI Engineering Intern

GitHub:
https://github.com/mukim-shah

LinkedIn:
https://www.linkedin.com/in/mukim-shah-377825334/

---

## ⭐ Repository Status

This repository is actively maintained and will continue to be updated throughout my **FlyRank Backend AI Engineering Internship** as I complete new assignments and backend projects.New assignments and projects will be added weekly as I progress through the internship.
