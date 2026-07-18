# 🚀 FlyRank Backend AI Engineering Internship

![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
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
```

Architecture:

``` text
Client
   │
   ▼
Root server.js
   │
   ├───────────────┐
   ▼               ▼
week-01/routes  week-02/routes
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
- OpenAPI 3.0
- Swagger UI
- Git
- GitHub
- Postman

---

# 📅 Internship Progress

| Week | Assignment | Status |
|------|------------|--------|
| ✅ Week 01 | Express Backend with JSON Endpoints | Completed |
| ✅ Week 02 | Express CRUD Task Management API | Completed |
| ⏳ Week 03 | Coming Soon | In Progress |
| ⏳ Week 04 | Coming Soon | Pending |

---

# 📖 Weekly Assignments

## ✅ Week 01

- Express Fundamentals
- JSON APIs
- Express Routing
- Backend Basics

---

## ✅ Week 02

- REST API
- CRUD Operations
- Validation
- Error Handling
- Swagger UI
- OpenAPI 3.0
- API Documentation
- Express Router
- Modular Architecture

---

# 🚀 Repository Highlights

- RESTful API Development
- Express.js Backend
- CRUD Operations
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
⏳ Week 03
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

- JWT Authentication
- MongoDB Integration
- Environment Variables
- Docker Support
- Unit Testing
- CI/CD Pipeline
- Deployment Improvements
- Advanced Backend Projects

---

# 👨‍💻 Author

**Mukim Shah**

Backend AI Engineering Intern

GitHub

https://github.com/mukim-shah

LinkedIn

(Add your LinkedIn Profile)

---

## ⭐ Repository Status

This repository is actively maintained and will continue to be updated throughout my **FlyRank Backend AI Engineering Internship** as I complete new assignments and backend projects.
