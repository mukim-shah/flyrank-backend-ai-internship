# 🚀 Week 02 – Express CRUD Task Management API

![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![OpenAPI](https://img.shields.io/badge/OpenAPI-6BA539?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

# 📖 Project Overview

This project was developed as part of the **FlyRank Backend AI Engineering Internship – Week 02 Assignment**.

The objective of this assignment was to build a **RESTful Task Management API** using **Node.js** and **Express.js** while following backend development best practices.

## ✨ Features

- ✅ RESTful API using Express.js
- ✅ Complete CRUD Operations
- ✅ Request Validation
- ✅ Proper HTTP Status Codes
- ✅ Consistent JSON Responses
- ✅ Error Handling
- ✅ Swagger UI Documentation
- ✅ OpenAPI 3.0 Specification
- ✅ Clean Folder Structure
- ✅ Modular Express Router Architecture

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- Swagger UI Express
- OpenAPI 3.0
- JavaScript

---

# 📂 Project Structure

```text
week-02/
│
├── screenshot/
│   ├── home-endpoint.png
│   ├── health-endpoint.png
│   ├── swagger-overview.png
│   ├── swagger-endpoints.png
│   ├── get-all-tasks.png
│   ├── get-task-by-id.png
│   ├── create-task-request.png
│   ├── create-task-response.png
│   ├── get-all-tasks-after-create.png
│   ├── update-task.png
│   ├── delete-task.png
│   ├── validation-error.png
│   └── task-not-found.png
│
├── server.js      # Standalone Express server
├── routes.js      # Express Router (used in multi-week architecture)
├── README.md
```

---

# 🚀 Running the Project

## Option 1 – Run Week 02 Independently

```bash
npm install
npm run week2
```

Swagger:

```text
http://localhost:3000/docs
```

---

## Option 2 – Run as Part of the Multi-Week Project

From the project root:

```bash
npm install
npm start
```

Application:

```text
http://localhost:3000/week-02
```

Swagger:

```text
http://localhost:3000/week-02/docs
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Root Endpoint |
| GET | `/health` | Health Check |
| GET | `/tasks` | Get All Tasks |
| GET | `/tasks/:id` | Get Task By ID |
| POST | `/tasks` | Create New Task |
| PUT | `/tasks/:id` | Update Existing Task |
| DELETE | `/tasks/:id` | Delete Task |
| GET | `/docs` | Swagger Documentation |

> **Note:**  
> When running as part of the multi-week architecture, all endpoints are automatically prefixed with:

```text
/week-02
```

Example:

```text
GET /week-02/tasks
POST /week-02/tasks
GET /week-02/docs
```

---

# 🧪 Sample Request

## Create Task

```http
POST /tasks
```

```json
{
  "title": "Complete FlyRank Assignment",
  "done": false
}
```

---

# ✅ Success Response

```json
{
  "success": true,
  "message": "Task created successfully.",
  "task": {
    "id": 6,
    "title": "Complete FlyRank Assignment",
    "done": false
  }
}
```

---

# ❌ Validation Error

**400 Bad Request**

```json
{
  "success": false,
  "message": "Title and done fields are required."
}
```

---

# ❌ Resource Not Found

**404 Not Found**

```json
{
  "success": false,
  "message": "Task not found"
}
```

---

# 📸 Project Screenshots

## 🏠 Home Endpoint

![Home Endpoint](./screenshot/home-endpoint.png)

---

## ❤️ Health Endpoint

![Health Endpoint](./screenshot/health-endpoint.png)

---

## 📚 Swagger Documentation

### Swagger Overview

![Swagger Overview](./screenshot/swagger-overview.png)

### Swagger Endpoints

![Swagger Endpoints](./screenshot/swagger-endpoints.png)

---

## 📋 Get All Tasks

![Get All Tasks](./screenshot/get-all-tasks.png)

---

## 🔍 Get Task By ID

![Get Task By ID](./screenshot/get-task-by-id.png)

---

## ➕ Create Task Request

![Create Task Request](./screenshot/create-task-request.png)

### Create Task Response

![Create Task Response](./screenshot/create-task-response.png)

---

## 📄 Get Tasks After Create

![Get Tasks After Create](./screenshot/get-all-tasks-after-create.png)

---

## ✏️ Update Task

![Update Task](./screenshot/update-task.png)

---

## 🗑️ Delete Task

![Delete Task](./screenshot/delete-task.png)

---

## ⚠️ Validation Error

![Validation Error](./screenshot/validation-error.png)

---

## ❌ Task Not Found

![Task Not Found](./screenshot/task-not-found.png)

---

# 📝 Notes

- **server.js** is the standalone version of the Week 02 assignment.
- **routes.js** exports an Express Router and is used when combining multiple internship weeks into a single Express application.
- The repository now supports running multiple weekly assignments from one Express server while keeping each week's standalone implementation available.

---

# 🎯 Learning Outcomes

During this assignment I learned:

- Building REST APIs using Express.js
- Implementing CRUD Operations
- Working with Request Validation
- Handling HTTP Status Codes
- API Error Handling
- Creating OpenAPI Documentation
- Integrating Swagger UI
- Using Express Router
- Building Modular Express Applications
- Organizing Node.js Projects

---

# 👨‍💻 Author

**Mukim Shah**

Backend AI Engineering Intern – FlyRank AI

GitHub: https://github.com/mukim-shah

---

# ⭐ Assignment

**FlyRank Backend AI Engineering Internship**

**Week 02 – Express CRUD Task Management API**