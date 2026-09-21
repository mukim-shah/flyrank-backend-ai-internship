const express = require("express");
const router = express.Router();

require("dotenv").config();

const service = require("./service");

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
            "/tasks/:id"
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

// GET all tasks
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await service.getAllTasks();

        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// GET task by ID
router.get("/tasks/:id", async (req, res) => {
    try {
        const task = await service.getTaskById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// CREATE task
router.post("/tasks", async (req, res) => {
    try {
        const { title, completed } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const task = await service.createTask(
            title,
            completed ?? false
        );

        res.status(201).json(task);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// UPDATE task
router.put("/tasks/:id", async (req, res) => {
    try {
        const { title, completed } = req.body;

        if (!title || typeof completed !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "Title and completed fields are required."
            });
        }

        const task = await service.updateTask(
            req.params.id,
            title,
            completed
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

// DELETE task
router.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await service.deleteTask(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully.",
            task
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

module.exports = router;