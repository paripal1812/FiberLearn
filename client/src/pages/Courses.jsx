
import React, { useState, useEffect } from "react";
import "./Courses.css";

const courses = [
  {
    title: "Fiber Optics Fundamentals",
    category: "Basics",
    level: "Beginner",
    duration: "3 Hours",
    description: "Learn the basics of fiber optics, light transmission and fiber technology.",
    icon: "📡",
    topics: ["Introduction to Fiber Optics", "Light Transmission", "Fiber Structure", "Applications of Fiber Optics"]
  },
  {
    title: "Fiber Optic Cable Types",
    category: "Basics",
    level: "Beginner",
    duration: "2 Hours",
    description: "Understand different fiber cables, connectors and their applications.",
    icon: "🔌",
    topics: ["Single Mode Fiber", "Multimode Fiber", "Cable Components", "Fiber Connectors"]
  },
  {
    title: "Fiber Optic Splicing",
    category: "Practical",
    level: "Intermediate",
    duration: "5 Hours",
    description: "Explore fusion splicing techniques and practical working methods.",
    icon: "🛠️",
    topics: ["Splicing Basics", "Fusion Splicing", "Splicing Tools", "Safety Procedures"]
  },
  {
    title: "Fiber Installation",
    category: "Practical",
    level: "Intermediate",
    duration: "4 Hours",
    description: "Learn fiber cable installation and maintenance procedures.",
    icon: "🏗️",
    topics: ["Installation Planning", "Cable Handling", "Cable Routing", "Maintenance"]
  },
  {
    title: "Testing & Troubleshooting",
    category: "Advanced",
    level: "Advanced",
    duration: "4 Hours",
    description: "Learn fiber testing, fault detection and troubleshooting.",
    icon: "🔍",
    topics: ["OTDR Testing", "Power Meter Testing", "Fault Detection", "Troubleshooting"]
  },
  {
    title: "FTTH Technology",
    category: "Advanced",
    level: "Intermediate",
    duration: "3 Hours",
    description: "Understand Fiber to the Home and telecom infrastructure.",
    icon: "🌐",
    topics: ["FTTH Architecture", "ONT and OLT", "Network Components", "Broadband Connectivity"]
  }
];

function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Backend API connection
  const [apiCourses, setApiCourses] = useState([]);
  const [apiStatus, setApiStatus] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request failed");
        }
        return response.json();
      })
      .then((data) => {
        setApiCourses(data.courses || []);
        setApiStatus("Connected");
      })
      .catch(() => {
        setApiStatus("Connection failed");
      });
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || course.category === category;
    return matchesSearch && matchesCategory;
  });

  if (selectedCourse) {
    return (
      <div className="courses-page">
        <button
          className="back-button"
          onClick={() => setSelectedCourse(null)}
        >
          ← Back to Courses
        </button>

        <div className="course-detail">
          <div className="detail-icon">{selectedCourse.icon}</div>
          <span className="course-category">{selectedCourse.category}</span>

          <h1>{selectedCourse.title}</h1>
          <p>{selectedCourse.description}</p>

          <div className="detail-info">
            <span>📘 {selectedCourse.level}</span>
            <span>⏱️ {selectedCourse.duration}</span>
          </div>

          <h2>What You Will Learn</h2>

          <ul className="topic-list">
            {selectedCourse.topics.map((topic, index) => (
              <li key={index}>✓ {topic}</li>
            ))}
          </ul>

          <button
            className="enroll-button"
            onClick={() => alert("Enrollment feature coming soon!")}
          >
            Start Learning →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <div className="courses-heading">
        <span className="courses-tag">LEARN & GROW</span>
        <h1>Explore Our Courses</h1>
        <p>Build practical skills and grow your career in fiber optics.</p>

        <p className="api-status">
          Backend Status: {apiStatus}
        </p>
      </div>

      <div className="courses-controls">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="category-buttons">
          {["All", "Basics", "Practical", "Advanced"].map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map((course, index) => (
          <div className="course-card" key={index}>
            <div className="course-icon">{course.icon}</div>
            <span className="course-category">{course.category}</span>
            <h2>{course.title}</h2>
            <p>{course.description}</p>

            <div className="course-details">
              <span>📘 {course.level}</span>
              <span>⏱️ {course.duration}</span>
            </div>

            <button
              className="enroll-button"
              onClick={() => setSelectedCourse(course)}
            >
              View Details →
            </button>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <p className="no-courses">No courses found.</p>
      )}
    </div>
  );
}

export default Courses;
