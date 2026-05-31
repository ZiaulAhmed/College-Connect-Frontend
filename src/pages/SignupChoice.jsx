import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupChoice() {
  const navigate = useNavigate();

  // Automatically inject styles to the DOM head when component mounts
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = signupTypeStyles;
    document.head.appendChild(styleTag);
    
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <div className="auth-container">
      {/* Left Column: Branding & Logo */}
      <div className="auth-left-panel">
        <div className="logo-glass-wrapper">
          <img
            src="/fulllogovertical.png"
            alt="College Connect Logo"
            className="auth-logo"
          />
        </div>
      </div>

      {/* Right Column: Signup Options Card */}
      <div className="auth-right-panel">
        <div className="auth-form-card text-center">
          <h2>Choose Signup Type</h2>
          <p className="auth-subtitle">
            Select how you want to register to College Connect
          </p>

          <div className="button-group">
            <button
              className="btn-choice btn-student"
              onClick={() => navigate("/signup/student")}
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5.48 13.04l-2.02-1.1V15c0 1.66 3.84 3 8.54 3s8.54-1.34 8.54-3v-3.06l-2.02 1.1C16.81 14.09 14.52 14.5 12 14.5s-4.81-.41-6.52-1.46z"/>
              </svg>
              Sign up as Student
            </button>

            <button
              className="btn-choice btn-faculty"
              onClick={() => navigate("/signup/faculty")}
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.17 19.53 10.53 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-9h2v5h-2zm0-3h2v2h-2z"/>
              </svg>
              Sign up as Faculty
            </button>
          </div>

          <div className="admin-disabled-notice">
            <svg className="notice-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>Admin registration is currently disabled.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fixed position: CSS styles sit as a global layout constant outside the React function component code
const signupTypeStyles = `
  :root {
    --bg-gradient: radial-gradient(circle at 50% 35%, #1d4ed8 0%, #030712 85%);
    --card-bg: #ffffff;
    --text-main: #0f172a;
    --text-muted: #475569;
    --btn-student-bg: #2563eb;
    --btn-student-hover: #1d4ed8;
    --btn-faculty-bg: linear-gradient(135deg, #0ea5e9, #2563eb);
    --notice-bg: #f8fafc;
    --notice-border: #e2e8f0;
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
    align-items: center;
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
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  }

  .auth-logo {
    width: 300px;
    height: auto;
    display: block;
  }

  .auth-right-panel {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .auth-form-card {
    background: var(--card-bg);
    padding: 3rem 2.5rem;
    border-radius: 24px;
    width: 420px;
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.6);
    box-sizing: border-box;
    text-align: center;
  }

  .auth-form-card h2 {
    color: var(--text-main);
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.85rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .auth-subtitle {
    color: var(--text-muted);
    font-size: 0.95rem;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  .button-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .btn-choice {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
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

  .btn-student {
    background: var(--btn-student-bg);
  }

  .btn-student:hover {
    background: var(--btn-student-hover);
  }

  .btn-faculty {
    background: var(--btn-faculty-bg);
  }

  .btn-choice:active {
    transform: scale(0.98);
  }

  .btn-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .admin-disabled-notice {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: var(--notice-bg);
    border: 1px solid var(--notice-border);
    padding: 12px;
    border-radius: 10px;
    color: #64748b;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .notice-icon {
    width: 16px;
    height: 16px;
    color: #94a3b8;
    flex-shrink: 0;
  }

  @media (max-width: 850px) {
    .auth-container {
      flex-direction: column;
      justify-content: center;
      gap: 3rem;
      padding: 1.5rem;
    }
    .auth-form-card {
      width: 100%;
      max-width: 420px;
    }
  }
`;