// src/pages/UserSearch.jsx
import React, { useState } from "react";

export default function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const users = [
    { name: "John Doe", role: "Student", yr: "2nd Yr", dep: "CSE" },
    { name: "Maria Garcia", role: "Student", yr: "4th Yr", dep: "MBA" },
    { name: "Satoshi Nakamoto", role: "Student", yr: "1st Yr", dep: "Cyber" },
    { name: "Dr. Sharma", role: "Faculty", yr: "10+ Exp", dep: "Physics" },
    { name: "Prof. Gupta", role: "Faculty", yr: "8+ Exp", dep: "CS" },
  ];

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.dep.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>User Search</h1>
        <p>Find and connect with classmates and faculty across campus.</p>
      </div>

      <div className="search-box glass-card">
        <input 
          type="text" 
          placeholder="Search by name, department, or role..." 
          className="search-input" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn-primary">Search</button>
      </div>

      <div className="users-list">
        {filteredUsers.length > 0 ? filteredUsers.map((u, i) => (
          <div key={i} className="user-card glass-card">
            <div className="user-avatar-placeholder">{u.name[0]}</div>
            <div className="user-info-block">
              <h3>{u.name}</h3>
              <p>{u.role} • {u.yr} • {u.dep}</p>
            </div>
            <button className="btn-secondary message-btn" onClick={() => alert(`Messaging ${u.name}...`)}>Message</button>
          </div>
        )) : (
          <div className="no-results glass-card">No users found matching "{searchTerm}"</div>
        )}
      </div>

      <style>{`
        .search-box { display: flex; gap: 1rem; padding: 2rem; margin-bottom: 2rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255,255,255,0.1); }
        .search-input { flex: 1; padding: 1.2rem; background: rgba(255, 255, 255, 0.08); border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); color: white; outline: none; }
        .search-input:focus { border-color: #4f46e5; }
        .users-list { display: flex; flex-direction: column; gap: 1rem; }
        .user-card { display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.1); }
        .user-avatar-placeholder { width: 50px; height: 50px; background: #6366f1; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .user-info-block h3 { margin: 0; }
        .user-info-block p { margin: 0.3rem 0; opacity: 0.5; font-size: 0.9rem; }
        .message-btn { margin-left: auto; width: 120px; }
        .no-results { padding: 3rem; text-align: center; opacity: 0.6; }
      `}</style>
    </div>
  );
}
