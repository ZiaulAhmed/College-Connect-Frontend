import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, saveAuth } from "../services/authService";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Inject the style rules into the head once when the component mounts
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = authStyles;
    document.head.appendChild(styleTag);
    
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(formData);
      const data = response?.data || response;

      if (
        data?.user?.role !== "admin" &&
        data?.user?.approvalStatus === "PENDING"
      ) {
        setError("Account pending admin approval");
        return;
      }

      saveAuth(data);
      navigate("/dashboard");
    } catch (err) {
      let msg = "Invalid credentials. Please try again.";
      if (err.response) {
        msg = err.response.data?.message || msg;
      } else if (err.request) {
        msg = "Network Error: Could not connect to the server.";
      } else {
        msg = err.message || msg;
      }
      setError(msg);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Column: Branding & Features */}
      <div className="auth-left-panel">
        <div className="logo-glass-wrapper">
          <img
            src="/fulllogovertical.png"
            alt="College Connect Logo"
            className="auth-logo"
          />
        </div>

        <ul className="auth-features-list">
          <li>
            <svg className="icon-check" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Role-based access
          </li>
          <li>
            <svg className="icon-check" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Secure authentication
          </li>
          <li>
            <svg className="icon-check" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Admin-controlled approvals
          </li>
        </ul>
      </div>

      {/* Right Column: Login Card */}
      <div className="auth-right-panel">
        <div className="auth-form-card">
          <h2>Welcome back</h2>

          
          
          {error && <div className="auth-error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email / Username</label>
              <input
                id="email"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="teacher@school.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••••••"
              />
            </div>

            <button type="submit" className="btn-login">
              Login
            </button>
          </form>

          <button className="btn-signup" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

// Global CSS styles written inside a string constant
const authStyles = `
  :root {
    --bg-gradient: radial-gradient(circle at 50% 35%, #1d4ed8 0%, #030712 85%);
    --card-bg: #ffffff;
    --text-main: #0f172a;
    --text-muted: #475569;
    --input-bg: #edf2f9;
    --btn-primary: #2563eb;
    --btn-primary-hover: #1d4ed8;
    --btn-gradient: linear-gradient(135deg, #0ea5e9, #2563eb);
    --success-green: #10b981;
  }

  .auth-container {
    display: flex;
    min-height: 100vh;
    width: 100vw;
    background: var(--bg-gradient);
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    align-items: center;
    justify-content: space-around;
    padding: 2rem;
    box-sizing: border-box;
  }

  .auth-left-panel {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 450px;
  }

  .logo-glass-wrapper {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 24px;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  }

  .auth-logo {
    width: 300px;
    height: auto;
    display: block;
  }

  .auth-features-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .auth-features-list li {
    display: flex;
    align-items: center;
    color: #f1f5f9;
    font-size: 1.05rem;
    margin-bottom: 1.25rem;
    gap: 12px;
    font-weight: 500;
  }

  .icon-check {
    width: 22px;
    height: 22px;
    color: var(--success-green);
    flex-shrink: 0;
  }

  .auth-right-panel {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .auth-form-card {
    background: var(--card-bg);
    padding: 2.75rem 2.5rem;
    border-radius: 24px;
    width: 420px;
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.6);
    box-sizing: border-box;
  }

  .auth-form-card h2 {
    color: var(--text-main);
    margin-top: 0;
    margin-bottom: 1.75rem;
    font-size: 1.85rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.25rem;
  }

  .form-group label {
    color: var(--text-muted);
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .form-group input {
    background: var(--input-bg);
    border: 1px solid transparent;
    padding: 14px 16px;
    border-radius: 12px;
    font-size: 0.95rem;
    color: var(--text-main);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .form-group input:focus {
    outline: none;
    border-color: var(--btn-primary);
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(37, 99, 233, 0.18);
  }

  .btn-login, .btn-signup {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
    transition: transform 0.1s ease, filter 0.2s ease;
  }

  .btn-login {
    background: var(--btn-primary);
    margin-top: 0.5rem;
  }

  .btn-login:hover {
    background: var(--btn-primary-hover);
  }

  .btn-signup {
    background: var(--btn-gradient);
    margin-top: 1rem;
  }

  .btn-login:active, .btn-signup:active {
    transform: scale(0.98);
  }

  .auth-error-message {
    background: #fef2f2;
    border: 1px solid #fca5a5;
    color: #991b1b;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
    font-weight: 500;
  }

  @media (max-width: 850px) {
    .auth-container {
      flex-direction: column;
      justify-content: center;
      gap: 3.5rem;
      padding: 1.5rem;
    }
    .auth-left-panel {
      align-items: center;
    }
    .auth-form-card {
      width: 100%;
      max-width: 420px;
    }
  }
`;