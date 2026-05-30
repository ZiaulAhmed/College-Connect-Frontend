// src/pages/FacultySignup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function FacultySignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    contact: "",
    facultyId: "", // ✅ ADDED
    aadharId: "", // ✅ CHANGED
    panId: "", // ✅ CHANGED
    addressProof: "", // ✅ CHANGED
    bankAccount: "",
    ifscCode: "", // ✅ ADDED
    bankName: "", // ✅ ADDED
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await api.post("/api/auth/register", {
        ...formData,
        role: "faculty",
        bankDetails: {
          accountNumber: formData.bankAccount,
          ifscCode: formData.ifscCode,
          bankName: formData.bankName,
        },
      });

      setSuccess("Faculty registration submitted. Awaiting admin approval.");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(err?.response?.data?.message || "Faculty registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-right">
        <div className="auth-card">
          <h2>Faculty Registration</h2>
          <p className="auth-subtitle">
            Submit your details (admin approval required)
          </p>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Group 1: Basic Info */}
            <div className="form-group-title">Basic Information</div>
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="facultyId"
              placeholder="Faculty ID"
              value={formData.facultyId}
              onChange={handleChange}
              required
            />
            <div style={{ marginBottom: "12px", width: "100%" }}>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "9px 11px",
                  borderRadius: "10px",
                  border: "1px solid rgba(148, 163, 184, 0.8)",
                  background: "#f9fafb",
                  fontSize: "14px",
                  outline: "none"
                }}
              >
                <option value="" disabled>Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Electronics & Comm.">Electronics & Comm.</option>
              </select>
            </div>
            <input
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              required
            />

            {/* Group 2: IDs */}
            <div className="form-group-title">Identification</div>
            <input
              name="aadharId"
              placeholder="Aadhaar Number"
              value={formData.aadharId}
              onChange={handleChange}
              required
            />
            <input
              name="panId"
              placeholder="PAN Number"
              value={formData.panId}
              onChange={handleChange}
              required
            />
            <textarea
              name="addressProof"
              placeholder="Address Proof"
              value={formData.addressProof}
              onChange={handleChange}
              required
            />

            {/* Group 3: Bank Details */}
            <div className="form-group-title">Bank Details</div>
            <input
              name="bankAccount"
              placeholder="Bank Account Number"
              value={formData.bankAccount}
              onChange={handleChange}
              required
            />
            <input
              name="ifscCode"
              placeholder="IFSC Code"
              value={formData.ifscCode}
              onChange={handleChange}
              required
            />
            <input
              name="bankName"
              placeholder="Bank Name"
              value={formData.bankName}
              onChange={handleChange}
              required
            />

            {/* Group 4: Security */}
            <div className="form-group-title">Security</div>
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn-primary auth-btn">
              Submit for Approval
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
