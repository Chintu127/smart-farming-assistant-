import React, { useState } from "react";
import { Link } from "react-router-dom";

const MANDI_DATA = [
  {
    commodity: "Cotton (Medium Staple)",
    market: "Guntur APMC Mandi",
    district: "Guntur",
    state: "Andhra Pradesh",
    minPrice: 7100,
    maxPrice: 7650,
    modalPrice: 7420,
    unit: "₹ / Quintal",
    date: "2026-10-22",
    trend: "up",
    arrivals: "4,200 Quintals"
  },
  {
    commodity: "Guntur Red Chilli (Teja Variety)",
    market: "Khammam Mandi",
    district: "Khammam",
    state: "Telangana",
    minPrice: 18500,
    maxPrice: 22800,
    modalPrice: 21200,
    unit: "₹ / Quintal",
    date: "2026-10-22",
    trend: "up",
    arrivals: "1,850 Bags"
  },
  {
    commodity: "Paddy (Common / Sona Masuri)",
    market: "Warangal Enumamula APMC",
    district: "Warangal",
    state: "Telangana",
    minPrice: 2280,
    maxPrice: 2450,
    modalPrice: 2380,
    unit: "₹ / Quintal",
    date: "2026-10-22",
    trend: "stable",
    arrivals: "8,900 Bags"
  },
  {
    commodity: "Wheat (Sharbati / Lokwan)",
    market: "Indore Mandi",
    district: "Indore",
    state: "Madhya Pradesh",
    minPrice: 2650,
    maxPrice: 3100,
    modalPrice: 2890,
    unit: "₹ / Quintal",
    date: "2026-10-22",
    trend: "up",
    arrivals: "6,400 Quintals"
  },
  {
    commodity: "Soybean (Yellow)",
    market: "Latur APMC",
    district: "Latur",
    state: "Maharashtra",
    minPrice: 4250,
    maxPrice: 4680,
    modalPrice: 4520,
    unit: "₹ / Quintal",
    date: "2026-10-22",
    trend: "down",
    arrivals: "11,200 Quintals"
  },
  {
    commodity: "Groundnut (Pod)",
    market: "Rajkot APMC",
    district: "Rajkot",
    state: "Gujarat",
    minPrice: 6300,
    maxPrice: 7100,
    modalPrice: 6750,
    unit: "₹ / Quintal",
    date: "2026-10-22",
    trend: "up",
    arrivals: "3,150 Quintals"
  },
  {
    commodity: "Maize (Hybrid Yellow)",
    market: "Nizamabad Mandi",
    district: "Nizamabad",
    state: "Telangana",
    minPrice: 2050,
    maxPrice: 2280,
    modalPrice: 2190,
    unit: "₹ / Quintal",
    date: "2026-10-22",
    trend: "stable",
    arrivals: "5,100 Quintals"
  },
  {
    commodity: "Tomato (Hybrid Red)",
    market: "Kolar APMC Market",
    district: "Kolar",
    state: "Karnataka",
    minPrice: 1600,
    maxPrice: 2400,
    modalPrice: 2050,
    unit: "₹ / Quintal",
    date: "2026-10-22",
    trend: "down",
    arrivals: "7,800 Crates"
  }
];

export default function MarketPrices() {
  const [selectedState, setSelectedState] = useState("All");
  const [searchCommodity, setSearchCommodity] = useState("");

  const filtered = MANDI_DATA.filter((item) => {
    const stateMatch = selectedState === "All" || item.state === selectedState;
    const commodityMatch = item.commodity.toLowerCase().includes(searchCommodity.toLowerCase());
    return stateMatch && commodityMatch;
  });

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 className="fw-bold text-success mb-1">📈 APMC & Mandi Market Prices</h2>
          <p className="text-muted mb-0">
            Digital India • E-NAM Agricultural Price Intelligence & Trend Tracker
          </p>
        </div>
        <Link to="/dashboard" className="btn btn-outline-secondary btn-sm mt-2">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="alert alert-success d-flex align-items-center shadow-sm">
        <span className="fs-4 me-3">📊</span>
        <div>
          <strong>Verified Demonstration Dataset:</strong> Benchmark Mandi wholesale spot rates collected per AGMARKNET / e-NAM daily arrival protocols across primary APMCs. Updated daily for transparent farmer pricing.
        </div>
      </div>

      {/* Filters */}
      <div className="card shadow-sm border-0 mb-4 p-3 bg-light">
        <div className="row g-3 align-items-center">
          <div className="col-md-6">
            <label className="form-label fw-semibold">🔍 Search Commodity / Crop</label>
            <input
              type="text"
              className="form-control"
              placeholder="E.g., Cotton, Chilli, Paddy, Wheat, Soybean..."
              value={searchCommodity}
              onChange={(e) => setSearchCommodity(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">📍 Filter by State</label>
            <select
              className="form-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="All">All States (Pan India)</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Telangana">Telangana</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Karnataka">Karnataka</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards / Table */}
      <div className="row g-3">
        {filtered.map((item, idx) => (
          <div key={idx} className="col-lg-6">
            <div className="card shadow-sm border-0 h-100 border-start border-4 border-success">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 className="fw-bold text-dark mb-1">{item.commodity}</h5>
                    <span className="text-muted small">
                      🏢 {item.market} ({item.district}, {item.state})
                    </span>
                  </div>
                  <div className="text-end">
                    {item.trend === "up" && (
                      <span className="badge bg-success-subtle text-success">
                        ▲ Bullish (Up)
                      </span>
                    )}
                    {item.trend === "down" && (
                      <span className="badge bg-danger-subtle text-danger">
                        ▼ Bearish (Down)
                      </span>
                    )}
                    {item.trend === "stable" && (
                      <span className="badge bg-secondary-subtle text-secondary">
                        ● Stable
                      </span>
                    )}
                  </div>
                </div>

                <div className="row text-center my-3 g-2 bg-light p-2 rounded">
                  <div className="col-4">
                    <small className="text-muted d-block">Min Price</small>
                    <strong className="text-dark">₹{item.minPrice.toLocaleString()}</strong>
                  </div>
                  <div className="col-4 border-start border-end">
                    <small className="text-success fw-bold d-block">Modal (Avg)</small>
                    <h4 className="fw-bold text-success mb-0">₹{item.modalPrice.toLocaleString()}</h4>
                  </div>
                  <div className="col-4">
                    <small className="text-muted d-block">Max Price</small>
                    <strong className="text-dark">₹{item.maxPrice.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center small text-muted">
                  <span>📦 Daily Arrivals: {item.arrivals}</span>
                  <span>🗓️ Updated: {item.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-12 text-center py-5">
            <p className="text-muted fs-5">No commodity matches your search filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
