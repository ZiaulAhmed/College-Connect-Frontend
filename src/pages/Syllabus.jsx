// src/pages/Syllabus.jsx
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";
import api from "../services/api";

export default function Syllabus() {
  const user = getCurrentUser();
  const isFaculty = user?.role === "faculty" || user?.role === "admin";

  const [syllabusList, setSyllabusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", credits: 3, sem: "IV", faculty: "", link: "" });

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const fetchSyllabus = async () => {
    try {
      const res = await api.get("/api/academic/syllabus");
      setSyllabusList(res.data);
    } catch (error) {
      console.error("Failed to load syllabus", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/academic/syllabus", newItem);
      alert("Syllabus uploaded successfully!");
      setShowUpload(false);
      setNewItem({ name: "", credits: 3, sem: "IV", faculty: "", link: "" });
      fetchSyllabus();
    } catch (error) {
      console.error("Failed to upload syllabus", error);
      alert("Failed to upload syllabus");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this syllabus?")) return;
    try {
      await api.delete(`/api/academic/syllabus/${id}`);
      fetchSyllabus();
    } catch (error) {
      console.error("Failed to delete syllabus", error);
    }
  };

  if (loading) return <div className="page-container"><p>Loading syllabus...</p></div>;

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h1>Course Syllabus</h1>
          <p>Curriculum and course structures for the current academic year.</p>
        </div>
        {isFaculty && (
          <button className="btn-primary" onClick={() => setShowUpload(!showUpload)}>
            {showUpload ? "Cancel Upload" : "➕ Add Syllabus"}
          </button>
        )}
      </div>

      {showUpload && isFaculty && (
        <form onSubmit={handleUpload} className="form-card" style={{ marginBottom: "20px" }}>
          <h3 style={{ marginTop: 0 }}>Add New Syllabus</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Course Name</label>
              <input type="text" required value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} placeholder="e.g. Mathematics" />
            </div>
            <div className="form-group">
              <label>Faculty</label>
              <input type="text" required value={newItem.faculty} onChange={(e) => setNewItem({...newItem, faculty: e.target.value})} placeholder="e.g. Dr. Sharma" />
            </div>
            <div className="form-group">
              <label>Semester</label>
              <input type="text" required value={newItem.sem} onChange={(e) => setNewItem({...newItem, sem: e.target.value})} placeholder="e.g. IV" />
            </div>
            <div className="form-group">
              <label>Credits</label>
              <input type="number" required value={newItem.credits} onChange={(e) => setNewItem({...newItem, credits: parseInt(e.target.value)})} min="1" max="10" />
            </div>
            <div className="form-group full">
              <label>Document Link (Google Drive, etc.)</label>
              <input type="url" required value={newItem.link} onChange={(e) => setNewItem({...newItem, link: e.target.value})} placeholder="https://..." />
            </div>
          </div>
          <div style={{ marginTop: "15px" }}>
            <button type="submit" className="btn-primary">Submit Syllabus</button>
          </div>
        </form>
      )}

      {syllabusList.length === 0 ? (
        <p>No syllabus available.</p>
      ) : (
        <div className="syllabus-container">
          {syllabusList.map((syllabus) => (
            <details key={syllabus._id} className="syllabus-details glass-card">
              <summary className="syllabus-header">
                <span className="syllabus-icon">🎓</span>
                <div className="syllabus-title">
                  <h3>{syllabus.name}</h3>
                  <p>Credits: {syllabus.credits} • Semester: {syllabus.sem} • Faculty: {syllabus.faculty}</p>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
                  {isFaculty && (
                    <button onClick={(e) => { e.preventDefault(); handleDelete(syllabus._id); }} className="btn-secondary" style={{ color: "red", borderColor: "red", padding: "4px 8px" }}>🗑️</button>
                  )}
                  <span className="expand-indicator">▼</span>
                </div>
              </summary>
              <div className="syllabus-content">
                <h4>Course Details</h4>
                <p>This syllabus is available online.</p>
                <a href={syllabus.link} target="_blank" rel="noopener noreferrer" className="btn-primary view-syllabus-btn" style={{ display: "inline-block", textAlign: "center", textDecoration: "none" }}>
                  View Detailed PDF
                </a>
              </div>
            </details>
          ))}
        </div>
      )}

      <style>{`
        .syllabus-container {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .syllabus-details {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          overflow: hidden;
          padding: 0.5rem 1rem;
        }
        .syllabus-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.2rem;
          cursor: pointer;
          list-style: none;
        }
        .syllabus-header::-webkit-details-marker {
          display: none;
        }
        .syllabus-icon {
          font-size: 1.8rem;
        }
        .syllabus-title h3 {
          margin: 0;
          font-size: 1.2rem;
        }
        .syllabus-title p {
          margin: 0.3rem 0 0;
          opacity: 0.6;
          font-size: 0.9rem;
        }
        .expand-indicator {
          opacity: 0.5;
          font-size: 0.8rem;
        }
        .syllabus-content {
          padding: 1rem 1.2rem 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .syllabus-content h4 {
          margin: 1.5rem 0 0.5rem;
          font-size: 1rem;
          color: var(--primary-color, #4f46e5);
        }
        .syllabus-content p {
          margin: 0 0 1rem;
          opacity: 0.8;
          font-size: 0.95rem;
        }
        .view-syllabus-btn {
          margin-top: 1rem;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
