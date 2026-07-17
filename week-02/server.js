const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root Endpoint
app.get("/", (req, res) => {
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
app.get("/health", (req, res) => {
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
app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// Get Task By ID
app.get("/tasks/:id", (req, res) => {
    const task = tasks.find((task) => {
        return task.id === Number(req.params.id);
    });

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    res.status(200).json(task);
});


// POST Endpoint
app.post("/tasks", (req, res) => {

    
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

// PUT Endpoint
app.put("/tasks/:id", (req, res) => {

    const task = tasks.find((task) => {
        return task.id === Number(req.params.id);
    });

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

   

    task.title = req.body.title;
    task.done = req.body.done;

    res.status(200).json({
        success: true,
        message: "Task updated successfully.",
        task: task
    });
});

// DELETE Endpoint
app.delete("/tasks/:id", (req, res) => {

    const taskIndex = tasks.findIndex((task) => {
        return task.id === Number(req.params.id);
    });

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

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
