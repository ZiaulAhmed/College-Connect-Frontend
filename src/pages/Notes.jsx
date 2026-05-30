// src/pages/Notes.jsx
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";
import api from "../services/api";

export default function Notes() {
  const user = getCurrentUser();
  const isFaculty = user?.role === "faculty" || user?.role === "admin";

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", type: "PDF", size: "Unknown", link: "" });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await api.get("/api/academic/notes");
      setNotes(res.data);
    } catch (error) {
      console.error("Failed to load notes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/academic/notes", newNote);
      alert("Note uploaded successfully!");
      setShowUpload(false);
      setNewNote({ title: "", type: "PDF", size: "Unknown", link: "" });
      fetchNotes();
    } catch (error) {
      console.error("Failed to upload note", error);
      alert("Failed to upload note");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/api/academic/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  };

  if (loading) return <div className="page-container"><p>Loading notes...</p></div>;

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h1>Course Notes</h1>
          <p>Your academic study materials and lecture notes.</p>
        </div>
        {isFaculty && (
          <button className="btn-primary" onClick={() => setShowUpload(!showUpload)}>
            {showUpload ? "Cancel Upload" : "➕ Upload Notes"}
          </button>
        )}
      </div>

      {showUpload && isFaculty && (
        <form onSubmit={handleUpload} className="form-card" style={{ marginBottom: "20px" }}>
          <h3 style={{ marginTop: 0 }}>Upload New Note</h3>
          <div className="form-group" style={{ marginBottom: "10px" }}>
            <label>Title</label>
            <input type="text" required value={newNote.title} onChange={(e) => setNewNote({...newNote, title: e.target.value})} placeholder="e.g. Physics Chapter 1" />
          </div>
          <div className="form-group" style={{ marginBottom: "10px" }}>
            <label>Document Link (Google Drive, etc.)</label>
            <input type="url" required value={newNote.link} onChange={(e) => setNewNote({...newNote, link: e.target.value})} placeholder="https://..." />
          </div>
          <button type="submit" className="btn-primary">Submit Note</button>
        </form>
      )}

      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note._id} className="note-card glass-card">
              <span className="note-icon">📁</span>
              <div className="note-info" style={{ flex: 1 }}>
                <h3>{note.title}</h3>
                <p>{note.type} • {note.size}</p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <a href={note.link} target="_blank" rel="noopener noreferrer" className="btn-secondary download-btn" style={{ textDecoration: "none" }}>Open</a>
                {isFaculty && (
                  <button onClick={() => handleDelete(note._id)} className="btn-secondary" style={{ color: "red", borderColor: "red" }}>🗑️</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .note-card {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.2rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .note-icon {
          font-size: 2.2rem;
        }
        .note-info h3 {
          margin: 0;
          font-size: 1.1rem;
        }
        .note-info p {
          margin: 0.2rem 0 0;
          opacity: 0.7;
          font-size: 0.9rem;
        }
        .download-btn {
          white-space: nowrap;
          padding: 0.5rem 0.8rem;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
