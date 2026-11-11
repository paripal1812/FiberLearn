
import React from "react";
import "./Dashboard.css";

function Dashboard() {
  const courses = [
    {
      title: "Fiber Optics Fundamentals",
      progress: 75,
      icon: "📡",
      duration: "3 Hours"
    },
    {
      title: "Fiber Optic Splicing",
      progress: 45,
      icon: "🛠️",
      duration: "5 Hours"
    },
    {
      title: "FTTH Technology",
      progress: 20,
      icon: "🌐",
      duration: "3 Hours"
    }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-welcome">
        <div>
          <p className="dashboard-tag">STUDENT DASHBOARD</p>
          <h1>Welcome Back, Student! 👋</h1>
          <p>Continue your learning journey with FiberLearn.</p>
        </div>
        <div className="student-avatar">S</div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <span>📚</span>
          <h2>03</h2>
          <p>Enrolled Courses</p>
        </div>

        <div className="stat-card">
          <span>📖</span>
          <h2>12</h2>
          <p>Lessons Completed</p>
        </div>

        <div className="stat-card">
          <span>🏆</span>
          <h2>01</h2>
          <p>Certificates Earned</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>My Learning</h2>
        <p className="dashboard-subtitle">
          Track your course progress.
        </p>

        <div className="learning-grid">
          {courses.map((course, index) => (
            <div className="learning-card" key={index}>
              <div className="learning-icon">{course.icon}</div>
              <h3>{course.title}</h3>
              <p>{course.duration}</p>

              <div className="progress-info">
                <span>Progress</span>
                <strong>{course.progress}%</strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>

              <button
                onClick={() => alert("Lesson feature coming soon!")}
              >
                Continue Learning →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
