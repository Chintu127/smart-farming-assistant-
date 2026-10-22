import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "../CSS/Navbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [role, setRole] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);

    if (storedRole === "FARMER") {
      fetchNotifications();
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = lang === "en" ? "te" : "en";
    setLang(nextLang);
    localStorage.setItem("lang", nextLang);
    window.dispatchEvent(new Event("languageChange"));
  };

  const fetchNotifications = async () => {
    try {
      const response = await API.get("/notifications/farmer");
      const data = response.data || [];

      if (data.length > notifications.length) {
        toast.info("📢 New agricultural alert received!", { autoClose: 3000 });
      }

      setNotifications(data);
    } catch (err) {
      console.error("Notification fetch failed", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await API.put("/notifications/FARMER/mark-read");
      setNotifications([]);
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };

  if (!token) return null;

  return (
    <>
      <ToastContainer position="top-right" />
      {/* Viksit Bharat 2047 Header Ribbon */}
      <div className="bg-success text-white py-1 px-3 d-flex justify-content-between align-items-center small">
        <div>
          🇮🇳 <strong>Digital India Innovation</strong> • Viksit Bharat 2047 | <strong>Batch 2B15</strong> (2026-2027)
        </div>
        <div className="d-flex align-items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="btn btn-sm btn-outline-light py-0 px-2 rounded-pill"
            style={{ fontSize: "0.75rem" }}
            title="Switch Language"
          >
            🌐 {lang === "en" ? "తెలుగు (Telugu)" : "English"}
          </button>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top px-3">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-success" to="/dashboard">
            🌾 Smart Farmer Assistant
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse ${showMenu ? "show" : ""}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  🏠 {lang === "te" ? "డాష్‌బోర్డ్" : "Dashboard"}
                </Link>
              </li>

              {role === "FARMER" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/crop-recommendation">
                      🌱 {lang === "te" ? "పంట సిఫార్సు" : "Crop Recommend"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/soil-fertilizer">
                      🧪 {lang === "te" ? "నేల & ఎరువులు" : "Soil & Fertilizer"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/pest-disease">
                      🔬 {lang === "te" ? "చీడపీడల నివారణ" : "Pest & Disease"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/market-prices">
                      📈 {lang === "te" ? "మార్కెట్ ధరలు" : "Market Prices"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/weather">
                      🌤️ {lang === "te" ? "వాతావరణం" : "Weather"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/farms">
                      🚜 {lang === "te" ? "నా పొలాలు" : "My Farms"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/farmerqueries">
                      💬 {lang === "te" ? "నిపుణుల సలహా" : "Ask Expert"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/farming-tips">
                      💡 {lang === "te" ? "చిట్కాలు" : "Tips"}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/schemes">
                      🏛️ {lang === "te" ? "పథకాలు" : "Schemes"}
                    </Link>
                  </li>
                </>
              )}

              {role === "EXPERT" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/expert">🧑‍🔬 Expert Queries</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cropguideview">📖 Crop Guide</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/market-prices">📈 Market Prices</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/schemes">🏛️ Schemes</Link>
                  </li>
                </>
              )}

              {role === "ADMIN" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/adminDashboard">📊 Admin Analytics</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/schemes/add">➕ Add Scheme</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cropguide">📖 Crop Guide Manager</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/adminNotificationManager">📢 Broadcast Alerts</Link>
                  </li>
                </>
              )}
            </ul>

            <div className="d-flex align-items-center gap-3">
              {/* Notification Bell for Farmers */}
              {role === "FARMER" && (
                <div
                  className="dropdown"
                  onMouseEnter={() => {
                    if (!hovered && notifications.length > 0) {
                      setHovered(true);
                      markAllAsRead();
                    }
                  }}
                >
                  <button
                    className="btn btn-outline-light position-relative"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    🔔
                    {notifications.length > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">
                        {notifications.length}
                      </span>
                    )}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow" style={{ minWidth: "280px" }}>
                    <li className="dropdown-header fw-bold text-dark">
                      📢 Agricultural Alerts
                    </li>
                    {notifications.length === 0 ? (
                      <li className="dropdown-item text-muted">No unread alerts</li>
                    ) : (
                      notifications.map((note, index) => (
                        <li key={index} className="dropdown-item small border-bottom py-2">
                          <strong className="text-success">{note.title}</strong>
                          <br />
                          <span>{note.message}</span>
                          <br />
                          <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                            {formatDate(note.timestamp)}
                          </span>
                        </li>
                      ))
                    )}
                    <li>
                      <Link to="/farmernotificationViewer" className="dropdown-item text-center text-success small fw-bold">
                        View All Alerts →
                      </Link>
                    </li>
                  </ul>
                </div>
              )}

              {/* User Dropdown */}
              <div className="dropdown">
                <button
                  className="btn btn-outline-success dropdown-toggle text-white"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  👤 {username} <span className="badge bg-warning text-dark ms-1">{role}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li><span className="dropdown-item-text"><strong>User:</strong> {username}</span></li>
                  <li><span className="dropdown-item-text"><strong>Role:</strong> {role}</span></li>
                  <li><Link className="dropdown-item" to="/profile">⚙️ Profile & Land Settings</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>🚪 Logout</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;