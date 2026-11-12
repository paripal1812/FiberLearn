
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

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

// MongoDB Connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");

    app.listen(PORT, () => {
      console.log(`FiberLearn server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });
