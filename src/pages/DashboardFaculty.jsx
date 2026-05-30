// src/pages/DashboardFaculty.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";

export default function DashboardFaculty() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const myAnnouncements = 3;
  const pendingApprovals = 1;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/api/academic/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to load students", error);
    } finally {
      setLoading(false);
    }
  };

  const academicLinks = [
    { name: "Class Timetable", path: "/dashboard/timetable", icon: "🕒", desc: "Manage class schedules" },
    { name: "Course Notes", path: "/dashboard/notes", icon: "📝", desc: "Upload study materials" },
    { name: "Syllabus", path: "/dashboard/syllabus", icon: "📘", desc: "Edit course curriculum" },
    { name: "Student Feedback", path: "/dashboard/feedback", icon: "💬", desc: "View student feedback" },
    { name: "Complaints", path: "/dashboard/complaints", icon: "⚠️", desc: "Address academic issues" },
  ];

  return (
    <div className="page-shell">
      <div className="page-head">
        <h2 className="page-head-title">Faculty Dashboard</h2>
        <p className="page-head-subtitle">Welcome — manage your academic content and announcements.</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <DashboardCard
          title="My Announcements"
          value={myAnnouncements}
          subtitle="Created by you"
        />
        <DashboardCard
          title="Pending Approval"
          value={pendingApprovals}
          subtitle="Waiting for admin"
        />
      </div>

      <div className="section-card" style={{ marginBottom: "24px" }}>
        <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "18px", color: "#0f172a" }}>Academics Management</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          {academicLinks.map((link, idx) => (
            <Link to={link.path} key={idx} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ 
                background: "#f8fafc", 
                borderRadius: "12px", 
                padding: "16px", 
                border: "1px solid rgba(148, 163, 184, 0.2)",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                transition: "background 0.2s, transform 0.2s"
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ fontSize: "24px" }}>{link.icon}</div>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: "600", color: "#1e293b" }}>{link.name}</h4>
                  <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>{link.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="section-card" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, fontSize: "18px", color: "#0f172a" }}>My Department Students</h3>
          <span style={{ fontSize: "13px", color: "#64748b", background: "#f1f5f9", padding: "4px 10px", borderRadius: "999px" }}>
            Total: {students.length}
          </span>
        </div>
        
        {loading ? (
          <p style={{ color: "#64748b" }}>Loading students...</p>
        ) : students.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table className="modern-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc", textAlign: "left", fontSize: "13px", color: "#64748b" }}>
                  <th style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>Name</th>
                  <th style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>Email</th>
                  <th style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>Student ID</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: "500", color: "#0f172a" }}>{student.name}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#475569" }}>{student.email}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#475569" }}>{student.studentId || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: "#64748b", fontStyle: "italic", textAlign: "center", padding: "20px 0" }}>No students found in your department.</p>
        )}
      </div>

      <section className="section-card">
        <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "18px", color: "#0f172a" }}>Quick Actions</h3>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          <li style={{ marginBottom: "8px" }}>
            <Link to="/dashboard/announcements/create" style={{ color: "#4f46e5", textDecoration: "none", fontWeight: "500" }}>Create new announcement</Link>
          </li>
          <li>
            <Link to="/dashboard/announcements" style={{ color: "#4f46e5", textDecoration: "none", fontWeight: "500" }}>View all announcements</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
