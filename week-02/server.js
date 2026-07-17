const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;


// Root Endpoint
app.get("/", (req, res) => {
    res.status(200).json({
        name: "Quick Automate Task Management API",
        version: "1.0.0",
        company: "Quick Automate",
        description: "AI Automation & Custom Software Backend API",
        endpoints: [
            "/health",  
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


app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
