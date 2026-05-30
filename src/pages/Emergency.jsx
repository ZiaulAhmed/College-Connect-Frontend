// src/pages/Emergency.jsx
import React from "react";

export default function Emergency() {
  const contacts = [
    { name: "Campus Security", num: "98765-43210", icon: "👮" },
    { name: "Hostel Warden", num: "98765-54321", icon: "🏠" },
    { name: "Medical Center", num: "102 / 98765-12345", icon: "🚑" },
    { name: "Anti-Ragging Squad", num: "1800-XXX-XXXX", icon: "🚫" },
    { name: "Local Police", num: "100", icon: "🚓" },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Emergency / SOS</h1>
        <p>Immediate assistance for safety, security, and medical emergencies.</p>
      </div>

      <div className="sos-banner">
        🚨 <strong>SOS:</strong> Long press for immediate beacon alarm and campus security alert triggered with your location.
      </div>

      <div className="contact-grid">
        {contacts.map((contact, i) => (
          <div key={i} className="contact-item glass-card">
            <span className="contact-icon">{contact.icon}</span>
            <div className="contact-info">
              <h3>{contact.name}</h3>
              <p>{contact.num}</p>
            </div>
            <a href={`tel:${contact.num}`} className="btn-call">CALL NOW</a>
          </div>
        ))}
      </div>

      <style>{`
        .sos-banner {
          background: #ef4444;
          color: white;
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          text-align: center;
          font-weight: bold;
          box-shadow: 0 10px 30px rgba(239, 68, 68, 0.4);
        }
        .contact-grid {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
        }
        .contact-icon {
          font-size: 2.22rem;
        }
        .contact-info h3 { margin: 0; font-size: 1.2rem; }
        .contact-info p { margin: 0.3rem 0; opacity: 0.8; font-weight: bold; }
        .btn-call {
          margin-left: auto;
          background: #ffffff;
          color: #ef4444;
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          font-weight: bold;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
