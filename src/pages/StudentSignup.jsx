// src/pages/StudentSignup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function StudentSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    contact: "",
    email: "",
    admissionToken: "",
    department: "Computer Science", // Default value
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only alphabets and spaces for name
    if (name === "name" && /[^a-zA-Z\s]/.test(value)) {
      return;
    }

    // Allow only numbers and restrict to 10 digits for contact
    if (name === "contact") {
      const onlyNums = value.replace(/\D/g, "");
      if (onlyNums.length > 10) return;
      setFormData((prev) => ({ ...prev, [name]: onlyNums }));
      return;
    }

    // Prevent spaces and auto-lowercase for email
    if (name === "email") {
      setFormData((prev) => ({ ...prev, [name]: value.replace(/\s/g, "").toLowerCase() }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.contact.length !== 10) {
      setError("Contact number must be exactly 10 digits");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // ✅ Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // Send only required fields to backend
      const payload = {
        name: formData.name,
        dob: formData.dob,
        contact: formData.contact,
        email: formData.email,
        admissionToken: formData.admissionToken,
        department: formData.department,
        password: formData.password,
        role: "student", // ✅ Missing role added
      };

      await register(payload);

      alert(
        "Registration successful! Your account is pending admin approval."
      );

      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err?.response || err);
      const msg =
        err?.response?.data?.message ||
        "Registration failed. Please check your details.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-right" style={{ margin: "auto" }}>
        <div className="auth-card">
          <h2>Student Registration</h2>
          <p className="auth-subtitle">
            Create your student account (admin approval required)
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Full Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Date of Birth
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Contact Number
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                maxLength="10"
                pattern="[0-9]{10}"
                title="Please enter exactly 10 digits"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Admission Token
              <input
                name="admissionToken"
                value={formData.admissionToken}
                onChange={handleChange}
                placeholder="ABC/2025-27/CSE/102"
                required
              />
            </label>

            <label>
              Department
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Electronics & Comm.">Electronics & Comm.</option>
              </select>
            </label>

            {/* ✅ CREATE PASSWORD */}
            <label>
              Create Password
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </label>

            {/* ✅ CONFIRM PASSWORD */}
            <label>
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
              />
            </label>

            <button
              type="submit"
              className="btn-primary auth-btn"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
