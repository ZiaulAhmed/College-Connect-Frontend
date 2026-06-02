// src/components/Navbar.jsx
import React, { useState } from "react";
import { getCurrentUser, logout } from "../services/authService";

export default function Navbar({ toggleSidebar }) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const roleLabel = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "User";

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="11" />
            <line x1="7" y1="9" x2="17" y2="9" />
            <line x1="7" y1="12" x2="17" y2="12" />
            <line x1="7" y1="15" x2="17" y2="15" />
          </svg>
        </button>
        <img src="/fulllogovertical.png" alt="College Connect" className="app-navbar-logo" />
      </div>

      <div className="navbar-right">
        {user && (
          <div className="profile-dropdown-container">
            <div 
              className="user-pill" 
              onClick={() => setShowProfileCard(!showProfileCard)}
              style={{ cursor: "pointer" }}
            >
              <div className="user-avatar">
                {user.username?.charAt(0)?.toUpperCase() || user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="user-info">
                <span className="user-name">{user.username || user.name}</span>
                <span className="user-role">{roleLabel}</span>
              </div>
            </div>

            {showProfileCard && (
              <div className="profile-dropdown-card virtual-id-card">
                <div className="id-body">
                  <div className="id-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : user.username ? user.username.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="id-details">
                    <p><strong>Name:</strong> {user.name || user.username}</p>
                    <p><strong>Role:</strong> {roleLabel.toUpperCase()}</p>
                    <p><strong>Email:</strong> {user.email}</p>

                    {user.role === "student" && (
                      <>
                        <p><strong>Contact:</strong> {user.contact || "—"}</p>
                        <p><strong>Registration ID:</strong> {user.admissionToken}</p>
                        <p>
                          <strong>Status:</strong>{" "}
                          <span className={
                            user.approvalStatus === "APPROVED" ? "status-approved"
                            : user.approvalStatus === "PENDING" ? "status-pending"
                            : "status-rejected"
                          }>
                            {user.approvalStatus}
                          </span>
                        </p>
                      </>
                    )}

                    {user.role === "faculty" && (
                      <>
                        <p><strong>Department:</strong> {user.department || "—"}</p>
                        <p><strong>Access Level:</strong> <span className="status-approved">ACTIVE</span></p>
                      </>
                    )}

                    {user.role === "admin" && (
                      <>
                        <p><strong>System Privileges:</strong> <span className="status-approved">FULL ACCESS</span></p>
                        <p><strong>Account Status:</strong> <span className="status-approved">ACTIVE</span></p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <button className="btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
