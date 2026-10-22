import React, { useState } from "react";
import { Link } from "react-router-dom";

const TIPS_CATEGORIES = [
  {
    category: "Sowing & Seed Treatment",
    icon: "🌱",
    tips: [
      {
        title: "Seed Treatment with Bio-Fungicides",
        desc: "Always treat seeds with Trichoderma viride @ 4-5 g/kg seed or Pseudomonas fluorescens @ 10 g/kg to protect emerging roots against damping-off and collar rot.",
        tag: "Critical Pre-Sowing"
      },
      {
        title: "Seed Germination Test",
        desc: "Place 100 seeds between damp burlap/gunny bags for 48-72 hours. Proceed with field sowing only if germination exceeds 85% to ensure full plant population.",
        tag: "Quality Check"
      }
    ]
  },
  {
    category: "Micro-Irrigation & Water Conservation",
    icon: "💧",
    tips: [
      {
        title: "Adopt Drip Fertigation",
        desc: "Drip irrigation coupled with soluble water fertilizers increases fertilizer use efficiency by 30-40% while cutting water consumption by half.",
        tag: "Water Saving"
      },
      {
        title: "Mulching in Dry Spells",
        desc: "Spread 25-micron silver-black plastic mulch or 3-inch straw mulch to suppress weed germination, conserve soil moisture, and moderate rhizosphere temperature.",
        tag: "Moisture Retention"
      }
    ]
  },
  {
    category: "Crop Rotation & Soil Regeneration",
    icon: "🔄",
    tips: [
      {
        title: "Rotate Cereals with Legumes",
        desc: "Following a heavy feeder crop like Paddy or Maize with a leguminous pulse crop (Blackgram, Greengram, or Chickpea) fixes 40-60 kg atmospheric nitrogen per hectare.",
        tag: "Soil Health"
      },
      {
        title: "Green Manuring with Dhaincha / Sunnhemp",
        desc: "Sow Dhaincha (Sesbania) in pre-monsoon and incorporate into soil at 45 days before flowering. Adds 15-20 tonnes of green biomass per hectare.",
        tag: "Organic Carbon"
      }
    ]
  },
  {
    category: "Integrated Pest Management (IPM)",
    icon: "🛡️",
    tips: [
      {
        title: "Install Pheromone & Light Traps",
        desc: "Set up 5 sex pheromone traps per acre to monitor moth activity of Helicoverpa and Spodoptera. Spray chemical insecticides only when moth catch exceeds ETL (Economic Threshold Level).",
        tag: "Cost Saving"
      },
      {
        title: "Encourage Natural Predators",
        desc: "Ladybird beetles, chrysoperla (green lacewings), and spiders feed on hundreds of aphids and mites daily. Avoid broad-spectrum prophylactic sprays that decimate beneficial insects.",
        tag: "Eco-Friendly"
      }
    ]
  }
];

export default function FarmingTips() {
  const [activeSeason, setActiveSeason] = useState("Kharif");

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 className="fw-bold text-success mb-1">💡 Smart Farming Tips & Best Practices</h2>
          <p className="text-muted mb-0">
            Digital India • Viksit Bharat 2047 Agronomic Calendar & Advisory
          </p>
        </div>
        <Link to="/dashboard" className="btn btn-outline-secondary btn-sm mt-2">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Seasonal Tab Pill Bar */}
      <div className="card shadow-sm border-0 mb-4 bg-light">
        <div className="card-body p-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span className="fw-semibold text-dark">Select Farming Season:</span>
          <div className="btn-group" role="group">
            <button
              className={`btn ${activeSeason === "Kharif" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setActiveSeason("Kharif")}
            >
              🌧️ Kharif (Monsoon)
            </button>
            <button
              className={`btn ${activeSeason === "Rabi" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setActiveSeason("Rabi")}
            >
              ❄️ Rabi (Winter)
            </button>
            <button
              className={`btn ${activeSeason === "Zaid" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setActiveSeason("Zaid")}
            >
              ☀️ Zaid (Summer)
            </button>
          </div>
        </div>
      </div>

      {/* Seasonal Alert Banner */}
      {activeSeason === "Kharif" && (
        <div className="alert alert-info shadow-sm mb-4">
          <strong>🌧️ Kharif Advisory:</strong> Ensure effective surface drainage trenches in cotton, maize, and pulse plots to avoid root asphyxiation during heavy monsoon spells. Apply Nitrogen in split doses.
        </div>
      )}
      {activeSeason === "Rabi" && (
        <div className="alert alert-primary shadow-sm mb-4">
          <strong>❄️ Rabi Advisory:</strong> Focus on seed treatment against soil-borne termites and smuts. Complete wheat sowing before November 25 for maximum tillering and optimal vernalization.
        </div>
      )}
      {activeSeason === "Zaid" && (
        <div className="alert alert-warning shadow-sm mb-4">
          <strong>☀️ Zaid Advisory:</strong> Prioritize fast-maturing crops like watermelon, cucumber, and summer moong with drip irrigation. Maintain soil mulch to control evapotranspiration.
        </div>
      )}

      {/* Categorized Tips */}
      <div className="row g-4">
        {TIPS_CATEGORIES.map((cat, idx) => (
          <div key={idx} className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-white py-3 d-flex align-items-center">
                <span className="fs-4 me-2">{cat.icon}</span>
                <h5 className="mb-0 fw-bold text-success">{cat.category}</h5>
              </div>
              <div className="card-body p-4">
                {cat.tips.map((tip, tIdx) => (
                  <div key={tIdx} className="mb-3 pb-3 border-bottom last-border-0">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="fw-bold text-dark mb-0">{tip.title}</h6>
                      <span className="badge bg-success-subtle text-success small">{tip.tag}</span>
                    </div>
                    <p className="text-muted small mb-0 mt-1">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
