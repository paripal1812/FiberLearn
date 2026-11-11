
import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">FiberLearn</div>

        <h1>{isLogin ? "Welcome Back!" : "Create Account"}</h1>

        <p>
          {isLogin
            ? "Login to continue your learning journey."
            : "Join FiberLearn and start learning today."}
        </p>

        <form onSubmit={(e) => {
          e.preventDefault();
          alert("Authentication will be connected soon!");
        }}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" required />
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          {isLogin && (
            <div className="forgot-password">
              <a href="#forgot">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className="auth-button">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="auth-switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
