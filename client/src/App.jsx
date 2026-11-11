
import { useState } from "react";
import "./App.css";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="app">
      <nav className="navbar">
        <div
          className="logo"
          onClick={() => setCurrentPage("home")}
          style={{ cursor: "pointer" }}
        >
          Fiber<span>Learn</span>
        </div>

        <div className="nav-links">
          <a
            href="#home"
            onClick={() => setCurrentPage("home")}
          >
            Home
          </a>

          <a
            href="#courses"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage("courses");
            }}
          >
            Courses
          </a>

          <a
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage("dashboard");
            }}
          >
            Dashboard
          </a>

          <a
            href="#about"
            onClick={() => setCurrentPage("home")}
          >
            About
          </a>
        </div>

        <div className="nav-buttons">
          <button
            className="login-btn"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>

          <button
            className="signup-btn"
            onClick={() => setCurrentPage("login")}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {currentPage === "courses" ? (
        <Courses />
      ) : currentPage === "login" ? (
        <Login />
      ) : currentPage === "dashboard" ? (
        <Dashboard />
      ) : (
        <>
          <section className="hero" id="home">
            <div className="hero-content">
              <p className="tagline">LEARN • PRACTICE • GROW</p>

              <h1>
                Build Your Future in
                <span> Fiber Optics & Telecom</span>
              </h1>

              <p className="description">
                Learn fiber optic splicing, installation, testing
                and FTTH technologies through practical learning
                and professional training.
              </p>

              <div className="hero-buttons">
                <button
                  className="primary-btn"
                  onClick={() => setCurrentPage("courses")}
                >
                  Explore Courses →
                </button>

                <button className="secondary-btn">
                  Learn More
                </button>
              </div>

              <div className="stats">
                <div>
                  <h2>6+</h2>
                  <p>Training Courses</p>
                </div>

                <div>
                  <h2>100%</h2>
                  <p>Skill Focused</p>
                </div>

                <div>
                  <h2>24/7</h2>
                  <p>Learn Anytime</p>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="visual-card">
                <div className="fiber-icon">◎</div>
                <h2>Fiber Technology</h2>
                <p>Connect • Innovate • Transform</p>
                <div className="fiber-line"></div>
                <span>Next Generation Connectivity</span>
              </div>
            </div>
          </section>

          <section className="courses" id="courses">
            <p className="section-tag">OUR LEARNING PROGRAMS</p>
            <h2>Explore Our Courses</h2>

            <p className="section-description">
              Develop industry-relevant skills with structured
              fiber optics and telecom training.
            </p>

            <div className="course-grid">
              {[
                "Introduction to Fiber Optics",
                "Fiber Cable Types & Components",
                "Fiber Optic Splicing",
                "Fiber Installation",
                "Testing & Troubleshooting",
                "FTTH & Telecom Infrastructure"
              ].map((course, index) => (
                <div className="course-card" key={index}>
                  <div className="course-number">
                    0{index + 1}
                  </div>

                  <h3>{course}</h3>

                  <p>
                    Learn essential concepts and practical skills
                    for modern telecom infrastructure.
                  </p>

                  <a
                    href="#courses"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage("courses");
                    }}
                  >
                    Explore Course →
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className="about" id="about">
            <h2>Learn Skills. Build Your Career.</h2>

            <p>
              FiberLearn is a learning platform designed to help
              aspiring technicians understand fiber optics,
              splicing and high-speed FTTH networks.
            </p>
          </section>

          <footer>
            <div className="logo">
              Fiber<span>Learn</span>
            </div>

            <p>© 2026 FiberLearn. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
