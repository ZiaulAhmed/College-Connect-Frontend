// src/pages/DashboardStudent.jsx
import React from "react";
import { Link } from "react-router-dom";
import AnnouncementList from "../components/AnnouncementList";

export default function DashboardStudent() {
  const quickLinks = [
    { name: "Class Timetable", path: "/dashboard/timetable", icon: "🕒", desc: "View your schedule" },
    { name: "Notes & Syllabus", path: "/dashboard/notes", icon: "📝", desc: "Access study materials" },
    { name: "Mess Menu", path: "/dashboard/mess-menu", icon: "🍽️", desc: "Today's food options" },
    { name: "Lost & Found", path: "/dashboard/lost-found", icon: "🔎", desc: "Report or find items" },
    { name: "Campus Map", path: "/dashboard/campus-map", icon: "🗺️", desc: "Navigate the campus" },
    { name: "Raise Complaint", path: "/dashboard/complaints", icon: "⚠️", desc: "Report issues" },
    { name: "Club Chat Rooms", path: "/dashboard/clubs", icon: "🎭", desc: "Join conversations" },
    { name: "Emergency / SOS", path: "/dashboard/emergency", icon: "🚨", desc: "Important contacts" },
  ];

  return (
    <div className="page-shell">
      <div className="page-head">
        <h2 className="page-head-title">Student Dashboard</h2>
        <p className="page-head-subtitle">Welcome back! Here's everything you need for campus life.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {quickLinks.map((link, idx) => (
          <Link to={link.path} key={idx} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ 
              background: "#fff", 
              borderRadius: "16px", 
              padding: "16px", 
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              transition: "transform 0.2s, boxShadow 0.2s"
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.1)"; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.05)"; }}
            >
              <div style={{ fontSize: "28px", background: "#f8fafc", padding: "10px", borderRadius: "12px" }}>
                {link.icon}
              </div>
              <div>
                <h4 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>{link.name}</h4>
                <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>{link.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="section-card">
        <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "18px", color: "#0f172a" }}>Recent Announcements</h3>
        <AnnouncementList />
      </div>
    </div>
  );
}
