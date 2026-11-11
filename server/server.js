
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Home API
app.get("/", (req, res) => {
  res.send("Welcome to FiberLearn Backend!");
});

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "FiberLearn API is working!"
  });
});

// Courses API
app.get("/api/courses", (req, res) => {
  const courses = [
    { id: 1, title: "Fiber Optics Fundamentals", level: "Beginner" },
    { id: 2, title: "Fiber Cable Types", level: "Beginner" },
    { id: 3, title: "Fiber Optic Splicing", level: "Intermediate" },
    { id: 4, title: "Fiber Installation", level: "Intermediate" },
    { id: 5, title: "Testing & Troubleshooting", level: "Advanced" },
    { id: 6, title: "FTTH Technology", level: "Advanced" }
  ];

  res.json({
    success: true,
    total: courses.length,
    courses
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`FiberLearn server running on port ${PORT}`);
});
