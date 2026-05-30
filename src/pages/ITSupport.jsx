// src/pages/ITSupport.jsx
import React from "react";

export default function ITSupport() {
  const issues = [
    { title: "WiFi & Broadband", icon: "🌐", status: "ONLINE" },
    { title: "Lab PC Issue", icon: "🖥️", status: "CLOSED" },
    { title: "Software License Request", icon: "📦", status: "PENDING" },
    { title: "Email Account Issue", icon: "📧", status: "ONLINE" },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>IT Support</h1>
        <p>Your portal for all technological assistance and troubleshooting.</p>
      </div>

      <div className="it-panel glass-card">
        <form className="it-form">
          <h3>Request New Support Ticket</h3>
          <div className="form-group">
            <label>Device Type</label>
            <select>
              <option value="Laptop">Laptop / Mobile</option>
              <option value="PC">Lab PC</option>
              <option value="Other">Other IT Hardware</option>
            </select>
          </div>
          <div className="form-group">
            <label>Problem Category</label>
            <select>
              <option value="Network">WiFi / Connectivity</option>
              <option value="Software">Software / Apps</option>
              <option value="Account">Email / Logins</option>
            </select>
          </div>
          <textarea rows="4" placeholder="Briefly describe your technical issue..."></textarea>
          <button className="btn-primary it-btn">Submit IT Ticket</button>
        </form>

        <div className="ticket-list">
          <h3>Current Active Tickets</h3>
          {issues.map((item, i) => (
            <div key={i} className="ticket-card glass-card">
              <span className="ticket-icon">{item.icon}</span>
              <div className="ticket-info">
                <h3>{item.title}</h3>
                <p>Status: <strong>{item.status}</strong></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .it-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; background: rgba(255, 255, 255, 0.05); padding: 3rem; border-radius: 20px; }
        .it-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .it-form h3, .ticket-list h3 { margin-bottom: 1rem; color: #4f46e5; }
        .it-btn { margin-top: 1rem; width: 100%; padding: 1.2rem; }
        .ticket-list { display: flex; flex-direction: column; gap: 1rem; }
        .ticket-card { padding: 1.2rem; display: flex; align-items: center; gap: 1.5rem; border: 1px solid rgba(255, 255, 255, 0.1); }
        .ticket-icon { font-size: 1.8rem; }
        .ticket-info h3 { margin: 0; font-size: 1.05rem; }
        .ticket-info p { margin: 0.2rem 0; font-size: 0.85rem; opacity: 0.7; }
      `}</style>
    </div>
  );
}
