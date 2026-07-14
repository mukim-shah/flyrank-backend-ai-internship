const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hello FlyRank!"
    });
});

app.get("/about", (req, res) => {
    res.json({
        name: "Mukim Shah",
        role: "Backend AI Engineering Intern",
        company: "FlyRank.ai",
        goal: "Building AI Automation Solutions"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});