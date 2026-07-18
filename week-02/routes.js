const express = require("express");
const router = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../openapi.json");

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

// Get All Tasks
router.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// Get Task By ID
router.get("/tasks/:id", (req, res) => {
    const task = tasks.find(task => task.id === Number(req.params.id));

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    res.status(200).json(task);
});

// Create Task
router.post("/tasks", (req, res) => {

    if (!req.body.title || typeof req.body.done !== "boolean") {
        return res.status(400).json({
            success: false,
            message: "Title and done fields are required."
        });
    }

    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        done: req.body.done
    };

    tasks.push(newTask);

    res.status(201).json({
        success: true,
        message: "Task created successfully.",
        task: newTask
    });
});

// Update Task
router.put("/tasks/:id", (req, res) => {

    const task = tasks.find(task => task.id === Number(req.params.id));

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    if (!req.body.title || typeof req.body.done !== "boolean") {
        return res.status(400).json({
            success: false,
            message: "Title and done fields are required."
        });
    }

    task.title = req.body.title;
    task.done = req.body.done;

    res.status(200).json({
        success: true,
        message: "Task updated successfully.",
        task
    });
});

// Delete Task
router.delete("/tasks/:id", (req, res) => {

    const taskIndex = tasks.findIndex(task => task.id === Number(req.params.id));

    if (taskIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    res.status(200).json({
        success: true,
        message: "Task deleted successfully.",
        task: deletedTask[0]
    });
});

// Swagger Documentation
router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;