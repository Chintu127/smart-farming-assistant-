import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [role, setRole] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [farms, setFarms] = useState([]);
  const [weatherSummary, setWeatherSummary] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const storedUsername = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const onLangChange = () => {
      setLang(localStorage.getItem("lang") || "en");
    };
    window.addEventListener("languageChange", onLangChange);

    API.get("/user/role")
      .then((res) => {
        const fetchedRole = res.data.role;
        setRole(fetchedRole);

        if (fetchedRole === "FARMER") {
          // Fetch user profile
          API.get("/user/profile")
            .then((pRes) => setUserProfile(pRes.data))
            .catch(() => {});

          // Fetch user farms
          API.get(`/farms/user/${userId}`)
            .then((fRes) => {
              const farmList = fRes.data || [];
              setFarms(farmList);
              if (farmList.length > 0) {
                // Fetch weather for first farm
                API.get(`/weather/${farmList[0].id}`)
                  .then((wRes) => setWeatherSummary(wRes.data))
                  .catch(() => {
                    setWeatherSummary({
                      city: farmList[0].location || "Guntur",
                      temperature: 29.5,
                      weather: "Partly Cloudy",
                      humidity: 65,
                      windSpeed: 3.8
                    });
                  });
              } else {
                setWeatherSummary({
                  city: "Andhra Pradesh / Telangana",
                  temperature: 30.0,
                  weather: "Clear Sky",
                  humidity: 60,
                  windSpeed: 3.5
                });
              }
            })
            .catch(() => {});

          // Fetch notifications
          API.get("/notifications/farmer")
            .then((nRes) => setAlerts(nRes.data || []))
            .catch(() => {});
        }
      })
      .catch((err) => {
        console.error("Dashboard init error", err);
      });

    return () => window.removeEventListener("languageChange", onLangChange);
  }, [token, userId, storedUsername, navigate]);

  return (
    <div className="container mt-4 mb-5">
      {/* Welcome & Banner */}
      <div className="card shadow-sm border-0 bg-success text-white p-4 mb-4" style={{ borderRadius: "14px" }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <div className="badge bg-warning text-dark mb-2 px-3 py-1 fw-bold">
              🇮🇳 Digital India Innovation • Viksit Bharat 2047
            </div>
            <h2 className="fw-bold mb-1">
              🌾 {lang === "te" ? "స్వాగతం," : "Welcome to Smart Farmer Assistant,"} {userProfile?.firstname ? `${userProfile.firstname} ${userProfile.lastname || ""}` : (storedUsername || "Farmer")}!
            </h2>
            <p className="mb-0 text-light opacity-90">
              {lang === "te"
                ? "మీ వ్యవసాయ నిర్ణయాలకు ఆధునిక డిజిటల్ సహాయకుడు • Batch 2B15"
                : "Your Comprehensive AI & Scientific Agriculture Support System • Batch 2B15 (2026–2027)"}
            </p>
          </div>
          <div className="d-flex gap-2">
            <Link to="/profile" className="btn btn-outline-light btn-sm px-3">
              👤 {lang === "te" ? "ప్రొఫైల్" : "My Profile"}
            </Link>
            <Link to="/crop-recommendation" className="btn btn-warning btn-sm text-dark fw-bold px-3">
              🌱 {lang === "te" ? "పంట సిఫార్సు" : "Recommend Crops"}
            </Link>
          </div>
        </div>
      </div>

      {/* Role View: FARMER */}
      {role === "FARMER" && (
        <>
          {/* Quick Metrics & Weather Widget */}
          <div className="row g-3 mb-4">
            {/* Weather Metric Card */}
            <div className="col-md-4">
              <div className="card shadow-sm border-0 h-100 p-3 bg-light border-start border-4 border-info">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <span className="text-muted small fw-semibold">
                      🌤️ {lang === "te" ? "స్థానిక వాతావరణం" : "Local Weather"}
                    </span>
                    <h3 className="fw-bold text-dark mt-1 mb-0">
                      {weatherSummary ? `${Math.round(weatherSummary.temperature)}°C` : "29°C"}
                    </h3>
                    <small className="text-success fw-semibold">
                      {weatherSummary?.weather || "Clear Skies"} ({weatherSummary?.city || "Regional"})
                    </small>
                  </div>
                  <Link to="/weather" className="btn btn-sm btn-outline-info">
                    Forecast →
                  </Link>
                </div>
                <div className="mt-2 text-muted small d-flex justify-content-between">
                  <span>💧 Humidity: {weatherSummary?.humidity || 62}%</span>
                  <span>🌬️ Wind: {weatherSummary?.windSpeed || 3.4} m/s</span>
                </div>
              </div>
            </div>

            {/* Farms Registered Metric */}
            <div className="col-md-4">
              <div className="card shadow-sm border-0 h-100 p-3 bg-light border-start border-4 border-success">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <span className="text-muted small fw-semibold">
                      🚜 {lang === "te" ? "నమోదైన పొలాలు" : "Farms Registered"}
                    </span>
                    <h3 className="fw-bold text-success mt-1 mb-0">
                      {farms.length} {farms.length === 1 ? "Plot" : "Plots"}
                    </h3>
                    <small className="text-muted">
                      {farms.length > 0 ? `${farms[0].farmName} (${farms[0].sizeInAcres} Acres)` : "No farm logged yet"}
                    </small>
                  </div>
                  <Link to="/farms" className="btn btn-sm btn-outline-success">
                    Manage →
                  </Link>
                </div>
                <div className="mt-2 text-muted small">
                  📍 Location: {farms[0]?.location || userProfile?.location || "Andhra Pradesh"}
                </div>
              </div>
            </div>

            {/* Soil Health Metric */}
            <div className="col-md-4">
              <div className="card shadow-sm border-0 h-100 p-3 bg-light border-start border-4 border-warning">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <span className="text-muted small fw-semibold">
                      🧪 {lang === "te" ? "నేల ఆరోగ్యం & pH" : "Soil Health & pH"}
                    </span>
                    <h3 className="fw-bold text-dark mt-1 mb-0">pH 6.8</h3>
                    <small className="text-warning fw-semibold">Black Cotton Soil (Optimal)</small>
                  </div>
                  <Link to="/soil-fertilizer" className="btn btn-sm btn-outline-warning text-dark">
                    Schedule →
                  </Link>
                </div>
                <div className="mt-2 text-muted small">
                  ⚡ Nutrient Status: N: Low | P: Med | K: High
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Feature Shortcuts Grid */}
          <h4 className="fw-bold text-success mb-3">
            ⚡ {lang === "te" ? "త్వరిత వ్యవసాయ సేవలు" : "Quick Agricultural Decision Services"}
          </h4>
          <div className="row g-3 mb-4">
            {/* 1. Smart Crop Recommendation */}
            <div className="col-md-4 col-sm-6">
              <div
                className="card shadow-sm border-0 h-100 p-3 text-center hover-shadow"
                style={{ cursor: "pointer", transition: "0.2s" }}
                onClick={() => navigate("/crop-recommendation")}
              >
                <div className="fs-1 mb-2">🌱</div>
                <h5 className="fw-bold text-dark">
                  {lang === "te" ? "స్మార్ట్ పంట సిఫార్సు" : "Smart Crop Recommendation"}
                </h5>
                <p className="text-muted small mb-3">
                  Match soil type, pH, season, and irrigation to find highest-yielding crops.
                </p>
                <button className="btn btn-sm btn-success mt-auto">Open Recommender →</button>
              </div>
            </div>

            {/* 2. Soil & Fertilizer Guidance */}
            <div className="col-md-4 col-sm-6">
              <div
                className="card shadow-sm border-0 h-100 p-3 text-center hover-shadow"
                style={{ cursor: "pointer", transition: "0.2s" }}
                onClick={() => navigate("/soil-fertilizer")}
              >
                <div className="fs-1 mb-2">🧪</div>
                <h5 className="fw-bold text-dark">
                  {lang === "te" ? "నేల & ఎరువుల మార్గదర్శి" : "Soil & Fertilizer Guidance"}
                </h5>
                <p className="text-muted small mb-3">
                  Scientific NPK dosage calculator and customized 4R fertilizer schedules.
                </p>
                <button className="btn btn-sm btn-success mt-auto">Calculate Dose →</button>
              </div>
            </div>

            {/* 3. Pest & Disease Assistance */}
            <div className="col-md-4 col-sm-6">
              <div
                className="card shadow-sm border-0 h-100 p-3 text-center hover-shadow"
                style={{ cursor: "pointer", transition: "0.2s" }}
                onClick={() => navigate("/pest-disease")}
              >
                <div className="fs-1 mb-2">🔬</div>
                <h5 className="fw-bold text-dark">
                  {lang === "te" ? "చీడపీడల నివారణ" : "Pest & Disease Doctor"}
                </h5>
                <p className="text-muted small mb-3">
                  Upload leaf photos and diagnose plant diseases with bio/chemical remedies.
                </p>
                <button className="btn btn-sm btn-success mt-auto">Diagnose Leaf →</button>
              </div>
            </div>

            {/* 4. Live Market Prices */}
            <div className="col-md-4 col-sm-6">
              <div
                className="card shadow-sm border-0 h-100 p-3 text-center hover-shadow"
                style={{ cursor: "pointer", transition: "0.2s" }}
                onClick={() => navigate("/market-prices")}
              >
                <div className="fs-1 mb-2">📈</div>
                <h5 className="fw-bold text-dark">
                  {lang === "te" ? "మండి మార్కెట్ ధరలు" : "APMC Mandi Spot Prices"}
                </h5>
                <p className="text-muted small mb-3">
                  Benchmark e-NAM wholesale market rates, modal prices, and price trends.
                </p>
                <button className="btn btn-sm btn-success mt-auto">View Mandi Rates →</button>
              </div>
            </div>

            {/* 5. Farming Tips & Seasonal Calendar */}
            <div className="col-md-4 col-sm-6">
              <div
                className="card shadow-sm border-0 h-100 p-3 text-center hover-shadow"
                style={{ cursor: "pointer", transition: "0.2s" }}
                onClick={() => navigate("/farming-tips")}
              >
                <div className="fs-1 mb-2">💡</div>
                <h5 className="fw-bold text-dark">
                  {lang === "te" ? "వ్యవసాయ చిట్కాలు" : "Seasonal Farming Tips"}
                </h5>
                <p className="text-muted small mb-3">
                  Kharif, Rabi, and Zaid cultivation tips for sowing, irrigation, and IPM.
                </p>
                <button className="btn btn-sm btn-success mt-auto">Read Tips →</button>
              </div>
            </div>

            {/* 6. Ask Agri Expert */}
            <div className="col-md-4 col-sm-6">
              <div
                className="card shadow-sm border-0 h-100 p-3 text-center hover-shadow"
                style={{ cursor: "pointer", transition: "0.2s" }}
                onClick={() => navigate("/farmerqueries")}
              >
                <div className="fs-1 mb-2">💬</div>
                <h5 className="fw-bold text-dark">
                  {lang === "te" ? "వ్యవసాయ శాస్త్రవేత్తను అడగండి" : "Consult Agri Scientist"}
                </h5>
                <p className="text-muted small mb-3">
                  Submit real-time crop queries and receive verified scientific solutions.
                </p>
                <button className="btn btn-sm btn-success mt-auto">Ask Expert →</button>
              </div>
            </div>
          </div>

          {/* Active Agricultural Alerts & Government Schemes */}
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold text-success">
                    📢 {lang === "te" ? "వ్యవసాయ హెచ్చరికలు" : "Weather & Crop Alerts"}
                  </h5>
                  <Link to="/farmernotificationViewer" className="btn btn-sm btn-outline-secondary">
                    All Alerts
                  </Link>
                </div>
                <div className="card-body p-3">
                  {alerts.length === 0 ? (
                    <p className="text-muted small mb-0">No new alerts at this time.</p>
                  ) : (
                    alerts.slice(0, 3).map((alert, idx) => (
                      <div key={idx} className="p-2 border-bottom last-border-0">
                        <strong className="text-dark small d-block">{alert.title}</strong>
                        <p className="text-muted small mb-0">{alert.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold text-success">
                    🏛️ {lang === "te" ? "ప్రభుత్వ పథకాలు" : "Viksit Bharat Government Schemes"}
                  </h5>
                  <Link to="/schemes" className="btn btn-sm btn-outline-secondary">
                    Explore Schemes
                  </Link>
                </div>
                <div className="card-body p-3">
                  <div className="p-2 border-bottom">
                    <strong className="text-dark small d-block">🌾 PM-KISAN Direct Benefit Transfer</strong>
                    <span className="text-muted small">₹6,000/year direct financial support in 3 equal installments.</span>
                  </div>
                  <div className="p-2 border-bottom">
                    <strong className="text-dark small d-block">🛡️ Pradhan Mantri Fasal Bima Yojana (PMFBY)</strong>
                    <span className="text-muted small">Low premium comprehensive crop insurance protection for notified crops.</span>
                  </div>
                  <div className="p-2">
                    <strong className="text-dark small d-block">💧 Micro Irrigation 90% Subsidy (NMSA)</strong>
                    <span className="text-muted small">Drip and sprinkler installation subsidies for water-smart farming.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Role View: EXPERT */}
      {role === "EXPERT" && (
        <div className="card shadow-sm border-0 p-4">
          <h4 className="fw-bold text-success mb-3">🧑‍🔬 Agriculture Expert Consultation Hub</h4>
          <p className="text-muted">
            Empowering farmers with verified, scientific solutions. View incoming questions from farmers, inspect reported crop symptoms, and post actionable advice.
          </p>
          <div className="d-flex gap-3 mt-2 flex-wrap">
            <button className="btn btn-success" onClick={() => navigate("/expert")}>
              💬 Open Expert Answering Panel
            </button>
            <button className="btn btn-outline-secondary" onClick={() => navigate("/cropguideview")}>
              📖 Review Crop Guides
            </button>
            <button className="btn btn-outline-secondary" onClick={() => navigate("/market-prices")}>
              📈 Check Market Prices
            </button>
          </div>
        </div>
      )}

      {/* Role View: ADMIN */}
      {role === "ADMIN" && (
        <div className="card shadow-sm border-0 p-4">
          <h4 className="fw-bold text-success mb-3">🛡️ Viksit Bharat Agriculture Admin Hub</h4>
          <p className="text-muted">
            Manage government schemes, broadcast emergency meteorological or pest alerts to all farmers, and monitor system analytics.
          </p>
          <div className="d-flex gap-3 mt-2 flex-wrap">
            <button className="btn btn-success" onClick={() => navigate("/adminDashboard")}>
              📊 View System Analytics & Stats
            </button>
            <button className="btn btn-outline-success" onClick={() => navigate("/schemes/add")}>
              ➕ Post New Government Scheme
            </button>
            <button className="btn btn-outline-warning text-dark" onClick={() => navigate("/adminNotificationManager")}>
              📢 Broadcast Alert to Farmers
            </button>
            <button className="btn btn-outline-secondary" onClick={() => navigate("/cropguide")}>
              🌱 Manage Crop Guides
            </button>
          </div>
        </div>
      )}
    </div>
  );
}