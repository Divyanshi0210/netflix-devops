
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Netflix Clone Backend!");
});

// Health check API
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        application: "Netflix Clone",
        uptime: process.uptime(),
        message: "Backend is running successfully"
    });
});

// Movies API
app.get("/api/movies", (req, res) => {
    res.json([
        { id: 1, title: "Stranger Things", genre: "Sci-Fi" },
        { id: 2, title: "Money Heist", genre: "Thriller" },
        { id: 3, title: "Wednesday", genre: "Mystery" },
        { id: 4, title: "Dark", genre: "Sci-Fi" }
    ]);
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Netflix backend running on port ${PORT}`);
});
