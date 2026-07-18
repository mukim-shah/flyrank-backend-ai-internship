const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Import Week Routes
const week01Routes = require("./week-01/routes");
const week02Routes = require("./week-02/routes");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "FlyRank Backend AI Internship",
        author: "Mukim Shah",
        availableWeeks: [
            "/week-01",
            "/week-02"
        ]
    });
});

// Mount Week Routes
app.use("/week-01", week01Routes);
app.use("/week-02", week02Routes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});