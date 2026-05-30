// src/pages/Feedback.jsx
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";
import api from "../services/api";

export default function Feedback() {
  const user = getCurrentUser();
  const role = user?.role || "student";

  const [feedbacks, setFeedbacks] = useState([]);
  const [course, setCourse] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (role === "faculty" || role === "admin") {
      fetchFeedbacks();
    }
  }, [role]);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get("/api/feedback");
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load feedback");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.post("/api/feedback", { course, rating, comment });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setCourse("");
        setComment("");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  if (role === "faculty" || role === "admin") {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1>Course Feedback</h1>
          <p>Review student feedback for various courses.</p>
        </div>

        <div className="feedback-list" style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "800px", margin: "0 auto" }}>
          {error && <div style={{ color: "#ef4444", textAlign: "center" }}>{error}</div>}
          {feedbacks.length === 0 && !error && <p style={{ textAlign: "center", color: "#94a3b8" }}>No feedback available.</p>}
          {feedbacks.map(fb => (
            <div key={fb._id} className="feedback-item glass-card" style={{ padding: "1.5rem", borderRadius: "16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h3 style={{ margin: "0 0 0.5rem 0", color: "#e2e8f0" }}>{fb.course}</h3>
                <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>By: {fb.student?.name || "Unknown"}</span>
              </div>
              <div style={{ color: "#fbbf24", fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                {"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}
              </div>
              <p style={{ margin: 0, color: "#94a3b8" }}>"{fb.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Course Feedback</h1>
        <p>Your feedback helps us maintain and improve our academic standards.</p>
      </div>

      <div className="feedback-card glass-card">
        {submitted && (
          <div className="success-banner">
            ✨ Thank you! Your feedback has been recorded successfully.
          </div>
        )}
        
        {error && (
          <div className="error-banner" style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", padding: "1rem", borderRadius: "8px", marginBottom: "1rem", border: "1px solid rgba(239, 68, 68, 0.2)", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Course</label>
            <select required value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="">Choose a course...</option>
              <option value="Mathematics - Calculus">Mathematics - Calculus</option>
              <option value="Quantum Mechanics">Quantum Mechanics</option>
              <option value="Computer Organization">Computer Organization</option>
              <option value="Environmental Science">Environmental Science</option>
            </select>
          </div>

          <div className="form-group">
            <label>Overall Experience Rating</label>
            <div className="star-rating">
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={index <= (hover || rating) ? "star-on" : "star-off"}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <span className="star">&#9733;</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label>Suggestions for Improvement</label>
            <textarea
              rows="5"
              placeholder="What did you like? What can be improved?"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn-primary feedback-submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>

      <style>{`
        .feedback-card {
          max-width: 650px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.05);
          padding: 2.5rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .feedback-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .star-rating {
          display: flex;
          gap: 0.5rem;
          margin: 0.5rem 0;
        }
        .star-rating button {
          background-color: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          font-size: 2.5rem;
          transition: transform 0.2s;
        }
        .star-rating button:hover {
          transform: scale(1.2);
        }
        .star-on {
          color: #fbbf24;
        }
        .star-off {
          color: #d1d5db;
          opacity: 0.3;
        }
        .feedback-submit-btn {
          margin-top: 1rem;
          padding: 1.2rem;
          font-weight: bold;
        }
        .feedback-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .form-group select, .form-group textarea {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          outline: none;
        }
        .form-group select:focus, .form-group textarea:focus {
          border-color: #4f46e5;
        }
      `}</style>
    </div>
  );
}

