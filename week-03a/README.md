# 🚀 Week 03A -- Dockerized Task Management API with PostgreSQL

![Node.js](https://img.shields.io/badge/Node.js-22-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white)

![Docker
Compose](https://img.shields.io/badge/Docker%20Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

------------------------------------------------------------------------

# 📖 Project Overview

This project was developed as part of the **FlyRank Backend AI
Engineering Internship -- Week 03A Assignment (BE-04)**.

The objective of this assignment was to **containerize the Task
Management API**, replace the previous SQLite/in-memory storage approach
with a **PostgreSQL database**, and run the complete application stack
using **Docker Compose**.

The application uses a PostgreSQL repository layer for database
operations and Docker Compose to run both the Node.js API and PostgreSQL
database together.

A Docker named volume is used to ensure that database data remains
persistent even after the application and PostgreSQL containers are
stopped and recreated.

------------------------------------------------------------------------

# ✨ Features

-   ✅ PostgreSQL Database Integration
-   ✅ Dockerized Node.js Application
-   ✅ Dockerized PostgreSQL Database
-   ✅ Docker Compose Multi-Container Setup
-   ✅ Persistent PostgreSQL Storage
-   ✅ Docker Named Volume
-   ✅ Environment Variable Configuration
-   ✅ `.env` and `.env.example` Support
-   ✅ SQL Database Initialization
-   ✅ PostgreSQL Repository Layer
-   ✅ Service Layer Architecture
-   ✅ Complete CRUD Operations
-   ✅ PostgreSQL Healthcheck
-   ✅ Automatic App + Database Startup
-   ✅ Container Persistence Testing
-   ✅ PowerShell API Testing using `Invoke-RestMethod`

------------------------------------------------------------------------

# 🛠️ Tech Stack

-   Node.js
-   Express.js
-   PostgreSQL
-   Docker
-   Docker Compose
-   pg (node-postgres)
-   dotenv
-   JavaScript
-   PowerShell

------------------------------------------------------------------------

# 📂 Project Structure

\`\`\`text week-03a/

│ ├── db/ │ └── init.sql │ ├── repositories/ │ ├── inMemoryRepository.js
│ └── postgresRepository.js │ ├── screenshot/ │ ├──
01-docker-compose-running.png │ ├── 02-create-task.png │ ├──
03-get-all-tasks.png │ ├── 04-update-task.png │ ├──
05-get-updated-task.png │ ├── 06-delete-task.png │ ├──
07-persistence-test-create.png │ ├──
08-persistence-test-after-restart.png │ └──
09-docker-desktop-containers.png │ ├── .dockerignore ├── .env ├──
.env.example ├── Dockerfile ├── docker-compose.yml ├── package.json ├──
routes.js ├── server.js ├── service.js └── README.md

🏗️ Application Architecture

The application follows a layered architecture:

Client │ ▼ Express Routes │ ▼ Service Layer │ ▼ PostgreSQL Repository │
▼ PostgreSQL Database │ ▼ Docker Named Volume

The request flow is:

routes.js ↓ service.js ↓ repositories/postgresRepository.js ↓ PostgreSQL

The postgresRepository.js file is responsible for communicating with
PostgreSQL.

The inMemoryRepository.js file is retained as an alternative/reference
repository from the previous storage approach.

🗄️ PostgreSQL Database

PostgreSQL 16 runs inside a Docker container.

Database Configuration Database: flyrank_tasks User: postgres Port: 5432

The PostgreSQL container is named:

flyrank-postgres

The database uses a Docker named volume:

postgres_data

This volume allows PostgreSQL data to survive container recreation.

🔐 Environment Variables

Database configuration is stored in the .env file.

.env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/flyrank_tasks
PORT=3000

The .env file contains local configuration and should not be committed
to Git.

A .env.example file is provided as a safe configuration template.

.env.example
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@postgres:5432/flyrank_tasks
PORT=3000 🗃️ Database Initialization

The PostgreSQL database schema is created using:

db/init.sql

The SQL file contains:

CREATE TABLE IF NOT EXISTS tasks ( id SERIAL PRIMARY KEY, title TEXT NOT
NULL, completed BOOLEAN DEFAULT FALSE );

Docker Compose mounts this file into the PostgreSQL initialization
directory:

/docker-entrypoint-initdb.d/init.sql

This allows PostgreSQL to automatically create the tasks table when the
database is initialized.

📦 PostgreSQL Repository

The active repository is:

repositories/postgresRepository.js

The repository uses the pg package to connect to PostgreSQL.

It provides the following database operations:

getAllTasks() getTaskById(id) createTask(title, completed)
updateTask(id, title, completed) deleteTask(id)

The service layer communicates with the repository instead of directly
executing SQL queries from the routes.

🧩 Service Layer

The service layer is implemented in:

service.js

It provides application-level methods for:

getAllTasks() getTaskById(id) createTask(title, completed)
updateTask(id, title, completed) deleteTask(id)

The service layer uses:

repositories/postgresRepository.js

as the active data source.

This keeps database access separated from the HTTP route handling.

🐳 Docker Configuration

The project uses Docker to containerize the application and database.

The main Docker files are:

Dockerfile docker-compose.yml .dockerignore 📦 Dockerfile

The Dockerfile creates the Node.js application image.

The application:

Uses Node.js 22. Creates /app as the working directory. Copies the
package files. Installs dependencies. Copies the application source
code. Exposes port 3000. Starts the application using server.js. 🔗
Docker Compose

Docker Compose runs the complete stack using two services:

Docker Compose │ ├── app │ └── Node.js + Express API │ └── postgres └──
PostgreSQL 16 Application Container Container: flyrank-task-api Port:
3000 PostgreSQL Container Container: flyrank-postgres Port: 5432

The application waits for PostgreSQL to become healthy before starting.

A PostgreSQL healthcheck is configured using:

pg_isready 🚀 Running the Project

Open a terminal inside the week-03a directory.

Build and Start the Complete Stack docker compose up --build

This builds the application image and starts both:

Node.js Application + PostgreSQL Database Start in Detached Mode docker
compose up -d Check Running Containers docker compose ps

Expected services:

flyrank-postgres flyrank-task-api Stop the Application docker compose
down

Important: Do not use docker compose down -v when testing database
persistence because the -v option removes the PostgreSQL volume.

🌐 API Endpoints Method Endpoint Description GET / Get API information
GET /health Check API health GET /tasks Get all tasks GET /tasks/:id Get
task by ID POST /tasks Create a new task PUT /tasks/:id Update an
existing task DELETE /tasks/:id Delete a task 🧪 API Testing

The API was tested using PowerShell Invoke-RestMethod.

🚀 Health Check GET /health

PowerShell:

Invoke-RestMethod http://localhost:3000/health

The API successfully returned the health response.

➕ POST Create Task POST /tasks

Example PowerShell request:

Invoke-RestMethod `-Uri http://localhost:3000/tasks` -Method POST
`-ContentType "application/json"` -Body '{"title":"A3 CRUD
Test","completed":false}'

Example response:

  id   title          completed
  ---- -------------- -----------
  2    A3 CRUD Test   False

The task was successfully inserted into PostgreSQL.

📋 GET All Tasks GET /tasks

PowerShell:

Invoke-RestMethod http://localhost:3000/tasks

Example response:

  id     title            completed
  ------ ---------------- -----------
  2      A3 CRUD Test     False
  ✏️ P   UT Update Task   
  PUT    /tasks/:id       

Example:

Invoke-RestMethod `-Uri http://localhost:3000/tasks/2` -Method PUT
`-ContentType "application/json"` -Body '{"title":"A3 CRUD Test -
Updated","completed":true}'

Example response:

  id   title                    completed
  ---- ------------------------ -----------
  2    A3 CRUD Test - Updated   True

The task was successfully updated in PostgreSQL.

📄 GET Updated Task GET /tasks/2

PowerShell:

Invoke-RestMethod http://localhost:3000/tasks/2

The updated task was successfully returned from PostgreSQL.

🗑️ DELETE Task DELETE /tasks/:id

PowerShell:

Invoke-RestMethod `-Uri http://localhost:3000/tasks/2` -Method DELETE

Example response:

  success   message
  --------- ----------------------------
  True      Task deleted successfully.

The task was successfully removed from PostgreSQL.

🔄 CRUD Flow

The complete CRUD lifecycle was tested:

POST /tasks ↓ Create Task ↓ GET /tasks ↓ Read Task ↓ PUT /tasks/:id ↓
Update Task ↓ GET /tasks/:id ↓ Verify Updated Task ↓ DELETE /tasks/:id ↓
Delete Task

All major CRUD operations were successfully tested against PostgreSQL.

💾 Database Persistence Test

A major requirement of the assignment was to prove that PostgreSQL data
survives container recreation.

Step 1 -- Create Persistence Test

A task was created using:

Invoke-RestMethod `-Uri http://localhost:3000/tasks` -Method POST
`-ContentType "application/json"` -Body '{"title":"Persistence Test -
Docker Volume","completed":false}'

Example response:

  id    title                                 completed
  ----- ------------------------------------- -----------
  3     Persistence Test - Docker Volume F    alse
  Ste   p 2 -- Verify Data                    
  Inv   oke-RestMethod http://localhost:300   0/tasks

The persistence test task was successfully returned.

Step 3 -- Stop and Remove Containers docker compose down

The application and PostgreSQL containers were removed.

The Docker named volume was intentionally preserved.

Step 4 -- Start the Complete Stack Again docker compose up -d

Docker recreated the application and PostgreSQL containers.

Step 5 -- Verify Persistence Invoke-RestMethod
http://localhost:3000/tasks

The previously created task was still available:

3 Persistence Test - Docker Volume False

This confirms that PostgreSQL data persisted after container recreation.

The persistence is provided by:

postgres_data

Docker named volume.

📸 Project Screenshots 🚀 Docker Compose Running

➕ POST Create Task

📋 GET All Tasks

✏️ PUT Update Task

📄 GET Updated Task

🗑️ DELETE Task

💾 Persistence Test -- Create Data

🔄 Persistence Test -- After Container Restart

🐳 Docker Desktop Containers

📝 Notes server.js starts the Week 03A Express application. routes.js
handles the HTTP API endpoints. service.js provides the service layer
between routes and the repository. repositories/postgresRepository.js
handles PostgreSQL database operations.
repositories/inMemoryRepository.js is retained as an
alternative/reference repository from the previous storage approach.
db/init.sql creates the PostgreSQL tasks table. docker-compose.yml
starts the Node.js application and PostgreSQL database together. Docker
named volume postgres_data provides persistent database storage. .env
contains local database connection configuration. .env.example provides
a safe environment configuration template. .dockerignore prevents
unnecessary local files from being included in the Docker build. 🎯
Learning Outcomes

During this assignment I learned:

Docker fundamentals Creating Docker images Running Docker containers
Docker Compose Running multiple services together PostgreSQL
containerization Connecting Node.js with PostgreSQL Using the pg package
Using environment variables Creating database tables using SQL
PostgreSQL healthchecks Repository pattern Service layer architecture
Docker named volumes Persistent database storage Testing API endpoints
using PowerShell Verifying database persistence after container
recreation ✅ Assignment Requirements Requirement Status Run PostgreSQL
in Docker ✅ Completed Use persistent Docker volume ✅ Completed Store
connection string in .env ✅ Completed Provide .env.example ✅ Completed
Create database table using SQL ✅ Completed Implement PostgreSQL
repository ✅ Completed Run app + database using Docker Compose ✅
Completed Start complete stack with docker compose up ✅ Completed Test
CRUD operations ✅ Completed Prove database persistence ✅ Completed 👨‍💻
Author

Mukim Shah

Backend AI Engineering Intern -- FlyRank AI

GitHub: https://github.com/mukim-shah



