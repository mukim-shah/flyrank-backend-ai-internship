const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello FlyRank!"
  });
});

router.get("/about", (req, res) => {
  res.json({
    name: "Mukim Shah",
    role: "Backend AI Engineering Intern",
    company: "FlyRank AI",
    goal: "Building AI Automation Solutions"
  });
});

module.exports = router;