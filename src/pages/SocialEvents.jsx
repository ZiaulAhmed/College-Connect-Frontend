// src/pages/SocialEvents.jsx
import React, { useState } from "react";

export default function SocialEvents() {
  const [registered, setRegistered] = useState([]);

  const events = [
    { id: 1, title: "Gully Cricket Tournament", date: "Oct 28", time: "4 PM", loc: "Ground A" },
    { id: 2, title: "Open Mic Night", date: "Oct 29", time: "6 PM", loc: "Seminar Hall" },
    { id: 3, title: "Tech Fest 2026", date: "Nov 5", time: "10 AM", loc: "Block C" },
    { id: 4, title: "Cultural Jam", date: "Nov 12", time: "5 PM", loc: "Auditorium" },
  ];

  const handleRegister = (id) => {
    if (registered.includes(id)) {
      setRegistered(registered.filter(rid => rid !== id));
      alert("Registration cancelled.");
    } else {
      setRegistered([...registered, id]);
      alert("Registered successfully! Entry pass sent to your email.");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Student Social Events</h1>
        <p>Upcoming fests, workshops, and gatherings by clubs and students.</p>
      </div>

      <div className="social-list">
        {events.map((ev, i) => (
          <div key={i} className="social-card glass-card">
            <div className="social-date">
              <strong>{ev.date}</strong>
            </div>
            <div className="social-content">
              <h3>{ev.title}</h3>
              <p>📍 {ev.loc} • 🕒 {ev.time}</p>
            </div>
            <button 
              className={`btn-secondary register-social-btn ${registered.includes(ev.id) ? "registered-btn" : ""}`}
              onClick={() => handleRegister(ev.id)}
            >
              {registered.includes(ev.id) ? "Cancel Reg" : "Register"}
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .social-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .social-card { display: flex; align-items: center; gap: 2rem; padding: 2rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); }
        .social-date { background: var(--primary-color, #4f46e5); color: white; padding: 1rem; border-radius: 12px; min-width: 80px; text-align: center; }
        .social-content h3 { margin: 0; }
        .social-content p { margin: 0.5rem 0 0; opacity: 0.7; }
        .register-social-btn { margin-left: auto; width: 151px; transition: all 0.2s; }
        .registered-btn { background: #fee2e2 !important; color: #ef4444 !important; border-color: #fca5a5 !important; }
      `}</style>
    </div>
  );
}
