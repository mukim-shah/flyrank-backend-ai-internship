# 🚀 Week 07 — FlowAI Visual AI Workflow Builder

**FlyRank AI Internship · Backend AI Engineering Track**

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Backend-5FA04E?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/React_Flow-Visual_Editor-FF0072?style=for-the-badge" alt="React Flow" />
  <img src="https://img.shields.io/badge/OpenRouter-AI_Integration-6366F1?style=for-the-badge" alt="OpenRouter" />
  <img src="https://img.shields.io/badge/Inngest-Background_Workflows-7C3AED?style=for-the-badge" alt="Inngest" />
</p>

---

## 📖 Overview

**FlowAI — Visual AI Workflow Builder** is an interactive platform that allows users to visually design, connect, and execute AI-powered decision workflows.

The application combines React Flow for visual workflow construction, Express.js for backend API handling, OpenRouter for AI-powered decision evaluation, and Inngest for background workflow execution.

Instead of manually managing individual AI decisions, users can create connected decision nodes, configure prompts, and define YES / NO branching paths to control how a workflow progresses.

The system also provides execution status tracking, logs, workflow JSON import and export, and basic error handling with loop protection.

The objective is to build a visual and flexible environment for creating and executing AI-powered workflows.

## 🎯 Assignment Details

| Detail                  | Information                       |
| ----------------------- | --------------------------------- |
| Project                 | FlowAI Visual AI Workflow Builder |
| Track                   | Backend AI Engineering            |
| Week                    | 07                                |
| Language                | JavaScript                        |
| Frontend Framework      | React                             |
| Frontend Tool           | Vite                              |
| Visual Workflow Editor  | @xyflow/react                     |
| Backend Runtime         | Node.js                           |
| Backend Framework       | Express.js                        |
| AI Integration          | OpenRouter API                    |
| AI Client               | OpenAI SDK                        |
| Background Execution    | Inngest                           |
| Development Environment | Local                             |

---

## ✨ Key Features

- **Visual Workflow Editor:** Build workflows using an interactive React Flow editor.
- **Decision Nodes:** Add and manage decision nodes within a workflow.
- **Node Management:** Move, organize, and connect workflow nodes.
- **Editable AI Prompts:** Customize prompts used for AI decision evaluation.
- **YES / NO Branching:** Create conditional paths based on AI-generated decisions.
- **OpenRouter Integration:** Evaluate workflow decisions using an AI model through OpenRouter.
- **Background Execution:** Execute workflows using Inngest.
- **Execution Status:** Track the status of workflow executions.
- **Execution Logs:** Retrieve logs to understand workflow execution.
- **JSON Import & Export:** Import and export workflow configurations in JSON format.
- **Error Handling:** Handle basic workflow execution errors.
- **Loop Protection:** Include basic protection against unwanted workflow loops.

---

## 🏗️ System Architecture

FlowAI separates the visual workflow editor, backend API, AI decision evaluation, and background execution responsibilities.

```text
                  User
                   |
                   v
          React Frontend (Vite)
                   |
                   v
          React Flow Editor
                   |
                   v
          Workflow Configuration
                   |
                   v
             Express API
                   |
                   v
          Workflow Start Request
                   |
                   v
          Inngest Background Job
                   |
                   v
           Workflow Execution
                   |
                   v
           Decision Node Logic
                   |
                   v
            OpenRouter API
                   |
                   v
          AI Decision Evaluation
                   |
             +-----+-----+
             |           |
             v           v
            YES          NO
             |           |
             v           v
       YES Branch    NO Branch
             |           |
             +-----+-----+
                   |
                   v
          Continue Workflow
                   |
                   v
          Execution Status
             & Logs
                   |
                   v
            React Frontend
```

The diagram represents the documented workflow concept. Exact internal implementation details depend on the project code.

---

## 🔄 Workflow Execution Flow

1. The user opens the FlowAI visual workflow editor.
2. The user creates decision nodes and connects them using React Flow.
3. AI prompts are configured for individual decision nodes.
4. The workflow is prepared for execution.
5. The frontend sends a workflow start request to the Express backend.
6. The backend initiates background execution through Inngest.
7. The workflow processes its decision nodes.
8. OpenRouter evaluates the configured AI prompts.
9. The AI decision determines the YES / NO branching path.
10. The workflow continues through its connected nodes.
11. Execution status and logs are made available for retrieval.
12. Basic error handling and loop protection help manage execution problems.

---

## 🛠️ Tech Stack

| Technology     | Purpose                                     |
| -------------- | ------------------------------------------- |
| React          | Frontend application                        |
| Vite           | Frontend development and build tooling      |
| @xyflow/react  | Visual workflow editor and node connections |
| Node.js        | Backend JavaScript runtime                  |
| Express.js     | Backend API and request handling            |
| Inngest        | Background workflow execution               |
| OpenAI SDK     | AI client integration                       |
| OpenRouter API | AI model access and decision evaluation     |
| dotenv         | Environment variable configuration          |
| cors           | Cross-origin resource sharing               |
| JSON           | Workflow import and export format           |
| npm            | Package and dependency management           |
| Git & GitHub   | Version control and project documentation   |

---

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- An OpenRouter API key
- Git

Verify your installed versions:

```bash
node --version
npm --version
```

### 1. Backend Setup

Navigate to the backend directory:

```bash
cd backend
npm install
```

Configure the backend `.env` file with your OpenRouter API key and required Inngest development settings.

Start the backend server:

```bash
npm run dev
```

### 2. Frontend Setup

Open a separate terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

Vite will display the local frontend URL in the terminal.

### 3. Start Inngest Dev Server

Open another terminal and navigate to the backend directory:

```bash
cd backend
npx inngest-cli dev -u http://localhost:3000/api/inngest
```

### 4. Open Inngest Dashboard

Once the Inngest development server is running, open:

```text
http://localhost:8288
```

The dashboard can be used to inspect the registered Inngest functions and background execution activity.

---

## 🌐 API Reference

The backend exposes the following API endpoints:

| Method           | Endpoint              | Description                         |
| ---------------- | --------------------- | ----------------------------------- |
| GET              | `/api/health`         | Backend health check                |
| POST             | `/api/workflow/start` | Starts workflow execution           |
| GET              | `/api/executions/:id` | Retrieves execution status and logs |
| Inngest endpoint | `/api/inngest`        | Inngest function serving endpoint   |

### 1. Health Check

**Endpoint**

```http
GET /api/health
```

Used to check backend service availability.

### 2. Start Workflow Execution

**Endpoint**

```http
POST /api/workflow/start
```

Starts a workflow execution through the backend.

The endpoint is responsible for initiating the workflow execution process.

### 3. Retrieve Execution Details

**Endpoint**

```http
GET /api/executions/:id
```

Retrieves execution information using the execution ID.

The endpoint provides access to execution status and logs.

### 4. Inngest Function Endpoint

```text
/api/inngest
```

Used by Inngest to communicate with the backend and serve registered background functions.

---

## 🧠 AI Decision Evaluation

FlowAI uses the OpenRouter API through the OpenAI SDK to evaluate AI-powered workflow decisions.

The decision evaluation process allows workflow nodes to use editable prompts and determine which branch should execute.

### Decision Branching

```text
           Decision Node
                 |
                 v
          AI Evaluation
                 |
          +------+------+
          |             |
          v             v
         YES            NO
          |             |
          v             v
      YES Branch     NO Branch
```

The decision result controls the next workflow path.

This makes it possible to create conditional AI workflows instead of executing every connected node in the same sequence.

---

## ⚙️ Background Workflow Execution

FlowAI uses **Inngest** to handle background workflow execution.

The backend exposes an Inngest serving endpoint, allowing Inngest to communicate with the application and execute registered workflow functions.

The Inngest development server can be started locally using:

```bash
npx inngest-cli dev -u http://localhost:3000/api/inngest
```

Development dashboard:

```text
http://localhost:8288
```

Background execution helps separate workflow processing from the initial frontend request.

---

## 📊 Execution Monitoring

FlowAI provides execution status tracking and logs.

These capabilities help users understand the progress of a workflow and inspect its execution activity.

The backend exposes:

```http
GET /api/executions/:id
```

This endpoint retrieves execution status and logs for a particular execution ID.

---

## 📦 Workflow JSON Import & Export

FlowAI supports importing and exporting workflow configurations using JSON.

This provides a way to preserve workflow configurations and reuse them without manually rebuilding the complete visual workflow.

The JSON format is used for workflow configuration exchange.

---

## 🔁 Error Handling and Loop Protection

Workflow execution can encounter errors or unwanted looping behavior.

FlowAI includes basic error handling and loop protection to help manage these situations.

These safeguards are intended to improve workflow execution reliability and prevent basic execution issues.

The exact retry policies, loop limits, and error mappings depend on the implementation.

---

## 🔐 Security and Configuration

The application uses environment variables to manage backend configuration and external API credentials.

### Security Guidelines

- Store the OpenRouter API key in the backend `.env` file.
- Never commit API keys or sensitive credentials to GitHub.
- Keep external API credentials on the backend.
- Avoid exposing private API credentials in frontend code.
- Keep local environment files excluded from version control.

### Environment Configuration

Configure the backend environment file with:

- OpenRouter API credentials.
- Required Inngest development settings.
- Other backend configuration required by the application.

The exact environment variable names depend on the backend implementation.

---

## 🎓 Week 07 Learning Outcomes

By working on this project, I practiced:

- Building visual workflow editors using React Flow.
- Creating and connecting interactive workflow nodes.
- Managing decision-based workflow structures.
- Implementing YES / NO branching logic.
- Integrating OpenRouter with the OpenAI SDK.
- Using AI prompts for decision evaluation.
- Building backend APIs using Express.js.
- Understanding background execution with Inngest.
- Connecting frontend workflow configuration with backend execution.
- Tracking workflow execution status and logs.
- Working with JSON-based workflow import and export.
- Implementing basic error handling.
- Understanding loop protection in workflow systems.
- Managing backend environment variables and API credentials.

---

## 🚀 Project Highlights

This project brings together visual workflow design and AI-powered backend execution.

Key areas covered:

- Interactive workflow construction.
- AI-powered decision evaluation.
- Conditional workflow branching.
- Background workflow processing.
- Execution monitoring.
- JSON workflow configuration.
- Backend API integration.
- Basic execution reliability safeguards.

---

## 🗺️ Week 07 Feature Checklist

| Feature                      | Included in Project Scope |
| ---------------------------- | ------------------------- |
| Visual workflow editor       | Yes                       |
| Add decision nodes           | Yes                       |
| Move workflow nodes          | Yes                       |
| Connect workflow nodes       | Yes                       |
| Editable AI prompts          | Yes                       |
| YES / NO branching           | Yes                       |
| OpenRouter integration       | Yes                       |
| AI decision evaluation       | Yes                       |
| Inngest background execution | Yes                       |
| Execution status tracking    | Yes                       |
| Execution logs               | Yes                       |
| Workflow JSON import         | Yes                       |
| Workflow JSON export         | Yes                       |
| Basic error handling         | Yes                       |
| Loop protection              | Yes                       |

---

## 👨‍💻 Author

**Mukim Shah**

Backend AI Developer · Automation Specialist · Full-Stack Developer

- **GitHub:** [https://github.com/mukim-shah](https://github.com/mukim-shah)
- **LinkedIn:** [https://www.linkedin.com/in/mukim-shah-377825334/](https://www.linkedin.com/in/mukim-shah-377825334/)

---

<p align="center">
  <strong>FlyRank AI — Backend AI Engineering Internship</strong>
  <br>
  Week 07 · FlowAI Visual AI Workflow Builder
  <br>
  Built with React, Express.js, OpenRouter, and Inngest
</p>
