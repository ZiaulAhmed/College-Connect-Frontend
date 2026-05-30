// src/pages/LostFound.jsx
import React from "react";

export default function LostFound() {
  const items = [
    { title: "Black Water Bottle", loc: "Ground Floor Lab", status: "FOUND", date: "Oct 25" },
    { title: "Blue Umbrella", loc: "Library Entrance", status: "LOST", date: "Oct 24" },
    { title: "Spectacles Case", loc: "Block C Staircase", status: "FOUND", date: "Oct 23" },
    { title: "Physics Lab Record", loc: "Cafeteria", status: "LOST", date: "Oct 22" },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Lost & Found</h1>
        <p>Report lost property or find found items on campus.</p>
      </div>

      <div className="lost-grid">
        {items.map((item, i) => (
          <div key={i} className="item-card glass-card">
            <div className={`status-badge ${item.status.toLowerCase()}`}>{item.status}</div>
            <h3>{item.title}</h3>
            <p><strong>Location:</strong> {item.loc}</p>
            <p><small>{item.date}</small></p>
            <button className="btn-secondary contact-btn">Contact Finder/Owner</button>
          </div>
        ))}
      </div>

      <style>{`
        .lost-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .item-card {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          position: relative;
        }
        .status-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.3rem 0.7rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: bold;
        }
        .found { background: #10b981; color: white; }
        .lost { background: #ef4444; color: white; }
        .contact-btn {
          margin-top: 1rem;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
