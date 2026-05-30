import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function DepartmentStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Department Students</h1>
        <p>List of all students currently enrolled in your department.</p>
      </div>

      <div className="section-card glass-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, fontSize: "18px", color: "#0f172a" }}>Student Directory</h3>
          <span style={{ fontSize: "13px", color: "#64748b", background: "rgba(255,255,255,0.5)", padding: "4px 10px", borderRadius: "999px" }}>
            Total: {students.length}
          </span>
        </div>
        
        {loading ? (
          <p style={{ color: "#64748b" }}>Loading students...</p>
        ) : students.length > 0 ? (
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Student ID</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td style={{ fontWeight: "500", color: "#0f172a" }}>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.studentId || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: "#64748b", fontStyle: "italic", textAlign: "center", padding: "20px 0" }}>No students found in your department.</p>
        )}
      </div>
    </div>
  );
}
