// express
const express = require("express");
const router = express.Router();

//Swagger API
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../openapi.json");

// Database
const db = require("./database")

router.use(express.json());

// Root Endpoint
router.get("/", (req, res) => {
    res.status(200).json({
        name: "Quick Automate Task Management API",
        version: "1.0.0",
        company: "Quick Automate",
        description: "AI Automation & Custom Software Backend API",
        endpoints: [
            "/health",
            "/tasks",
            "/tasks/:id",
            "/docs"
        ]
    });
});

// Health Endpoint
router.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        company: "Quick Automate",
        message: "Task Management API is running successfully."
    });
});

// Tasks Data
const tasks = [
    {
        id: 1,
        title: "Build AI Lead Generation Workflow",
        done: true
    },
    {
        id: 2,
        title: "Integrate WhatsApp Cloud API",
        done: false
    },
    {
        id: 3,
        title: "Design CRM Dashboard UI",
        done: true
    },
    {
        id: 4,
        title: "Deploy Automation to Production",
        done: false
    },
    {
        id: 5,
        title: "Create Client Onboarding Workflow",
        done: false
    }
];

// Get All tasks by Database
router.get("/tasks", (req, res) => {
    const tasks = db.prepare("SELECT * FROM tasks").all();
    res.json(tasks);
});


//Get Task By ID - Database
router.get("/tasks/:id", (req, res) => {
    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(req.params.id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }
    res.status(200).json(task);
})

// Create Task 
router.post("/tasks", (req, res) => {
    const { title, completed } = req.body;

    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Title is required",
        });
    }

    const result = db
        .prepare(
            "INSERT INTO tasks (title, completed) VALUES (?, ?)"
        )
        .run(title, completed ?? 0);

    const task = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(result.lastInsertRowid);

    res.status(201).json(task);
});

// Update Task
router.put("/tasks/:id", (req, res) => {
    const { title, completed } = req.body;
    const { id } = req.params;

    const result = db
        .prepare(
            "UPDATE tasks SET title = ?, completed = ? WHERE id = ?"
        )
        .run(title, completed, id);

    if (result.changes === 0) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }

    const updatedTask = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(id);

    res.json(updatedTask);
});

// Delete Task
router.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;

    const result = db
        .prepare("DELETE FROM tasks WHERE id = ?")
        .run(id);

    if (result.changes === 0) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
    }

    res.json({
        message: "Task deleted successfully",
    });
});

// Swagger Documentation
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;