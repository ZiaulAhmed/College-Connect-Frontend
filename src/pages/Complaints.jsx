// src/pages/Complaints.jsx
import React, { useState } from "react";
import { getCurrentUser } from "../services/authService";

export default function Complaints() {
  const user = getCurrentUser();
  const role = user?.role || "student";

  const [formData, setFormData] = useState({
    title: "",
    category: "Academic",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ title: "", category: "Academic", description: "" });
  };

  if (role === "faculty" || role === "admin") {
    const mockComplaints = [
      { id: 1, title: "Library hours too short", category: "Academic Issues", desc: "The library closes at 8 PM, which is too early for students who want to study late." },
      { id: 2, title: "Wi-Fi issues in Hostel B", category: "Hostel & Mess", desc: "The internet connection has been very unstable for the past week, making it hard to do assignments." },
      { id: 3, title: "Broken projector in Room 302", category: "Infrastructure", desc: "The projector bulb is burnt out and needs replacement immediately." },
    ];

    return (
      <div className="page-container">
        <div className="page-header">
          <h1>Student Complaints</h1>
          <p>Review and address issues raised by students.</p>
        </div>

        <div className="complaint-list" style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "800px", margin: "0 auto" }}>
          {mockComplaints.map(comp => (
            <div key={comp.id} className="complaint-item glass-card" style={{ padding: "1.5rem", borderRadius: "16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <h3 style={{ margin: 0, color: "#e2e8f0" }}>{comp.title}</h3>
                <span style={{ fontSize: "0.85rem", background: "rgba(79, 70, 229, 0.2)", color: "#818cf8", padding: "0.4rem 0.8rem", borderRadius: "12px", fontWeight: "500" }}>{comp.category}</span>
              </div>
              <p style={{ margin: 0, color: "#94a3b8", lineHeight: "1.6" }}>{comp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Raise a Complaint</h1>
        <p>Your concerns and feedback are valuable for our improvement.</p>
      </div>

      <div className="complaint-card glass-card">
        {submitted && (
          <div className="success-banner">
            ✅ Complaint submitted successfully! Our team will review it shortly.
          </div>
        )}

        <form className="complaint-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief summary of your complaint"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Academic">Academic Issues</option>
              <option value="Hostel">Hostel & Mess</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Administrative">Administrative</option>
              <option value="Other">Other Concerns</option>
            </select>
          </div>

          <div className="form-group">
            <label>Detailed Description</label>
            <textarea
              name="description"
              rows="6"
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain your concern in detail..."
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-primary submit-complaint-btn">
            Submit Complaint
          </button>
        </form>
      </div>

      <style>{`
        .complaint-card {
          max-width: 700px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.05);
          padding: 2.5rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .complaint-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-weight: 500;
          font-size: 0.95rem;
          opacity: 0.8;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: var(--primary-color, #4f46e5);
        }
        .submit-complaint-btn {
          margin-top: 1rem;
          padding: 1.2rem;
          font-weight: bold;
          font-size: 1.05rem;
        }
        .success-banner {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          border: 1px solid rgba(16, 185, 129, 0.2);
          margin-bottom: 2rem;
          text-align: center;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
