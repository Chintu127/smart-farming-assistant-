import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const executeLogin = async (username, password) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { username, password });
      const { token, role, userId, username: resUsername } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", resUsername);

      toast.success(`✅ Welcome, ${resUsername} (${role})!`);
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch {
      toast.error("❌ Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeLogin(formData.username, formData.password);
  };

  const handleQuickLogin = (uname, pwd) => {
    setFormData({ username: uname, password: pwd });
    executeLogin(uname, pwd);
  };

  return (
    <div className="page-wrapper">
      <div className="overlay" />
      <div className="auth-box shadow-lg" style={{ maxWidth: "480px" }}>
        {/* Academic / Project Header */}
        <div className="text-center mb-3">
          <span className="badge bg-success mb-2 px-3 py-1">
            🇮🇳 Digital India Innovation • Viksit Bharat 2047
          </span>
          <h3 className="fw-bold text-success mb-0">🌾 Smart Farmer Assistant</h3>
          <small className="text-muted d-block">
            College Academic Project • Batch 2B15 (2026–2027)
          </small>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username / Mobile</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              className="form-control"
              placeholder="e.g. farmer1 or your username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-success w-100 py-2 fw-semibold" disabled={loading}>
            {loading ? "🔐 Authenticating..." : "🚪 Sign In"}
          </button>
        </form>

        {/* 1-Click Quick Demo Login Section for Evaluation */}
        <div className="mt-4 p-3 bg-light rounded-3 border">
          <small className="fw-bold text-muted d-block text-center mb-2">
            ⚡ Quick Demo Logins (Click to auto-login):
          </small>
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-success text-start"
              onClick={() => handleQuickLogin("farmer1", "password123")}
              disabled={loading}
            >
              🧑‍🌾 <strong>Farmer:</strong> farmer1 / password123
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary text-start"
              onClick={() => handleQuickLogin("expert1", "password123")}
              disabled={loading}
            >
              🧑‍🔬 <strong>Agri Expert:</strong> expert1 / password123
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-dark text-start"
              onClick={() => handleQuickLogin("admin1", "password123")}
              disabled={loading}
            >
              🛡️ <strong>Admin:</strong> admin1 / password123
            </button>
          </div>
        </div>

        <div className="text-center mt-3">
          <small>
            New farmer? <a href="/register" className="text-success fw-bold">Register here</a>
          </small>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Login;