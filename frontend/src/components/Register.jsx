import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "FARMER",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/auth/register", formData);
      toast.success("✅ Account created successfully! Please login.");
      setTimeout(() => navigate("/"), 1500);
    } catch {
      toast.error("❌ Username or Mobile already taken!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="overlay" />
      <div className="auth-box shadow-lg" style={{ maxWidth: "480px" }}>
        <div className="text-center mb-3">
          <span className="badge bg-success mb-2 px-3 py-1">
            🇮🇳 Digital India Innovation • Viksit Bharat 2047
          </span>
          <h3 className="fw-bold text-success mb-0">🌾 Smart Farmer Assistant</h3>
          <p className="text-muted small mb-0">Farmer Registration Portal</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username / Mobile Number</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="e.g. 9876543210 or ramesh_patel"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Create secure password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Select Account Role</label>
            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="FARMER">👨‍🌾 Farmer (Krishi Mitra)</option>
              <option value="EXPERT">🧑‍🔬 Agricultural Scientist / Expert</option>
              <option value="ADMIN">🛡️ Government Administrative Officer</option>
            </select>
          </div>

          <button className="btn btn-success w-100 py-2 fw-semibold" disabled={loading}>
            {loading ? "⏳ Registering..." : "📝 Complete Registration"}
          </button>

          <div className="text-center mt-3">
            <small>
              Already registered? <a href="/" className="text-success fw-bold">Login here</a>
            </small>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Register;