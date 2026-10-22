import React, { useState } from "react";
import { Link } from "react-router-dom";

const CROP_DATABASE = [
  {
    name: "Bt Cotton",
    suitableSoils: ["Black Soil", "Loamy Soil"],
    minPh: 6.0,
    maxPh: 8.0,
    suitableSeasons: ["Kharif"],
    minWater: "Medium",
    duration: "150 - 180 Days",
    waterRequirement: "650 - 800 mm (Drip irrigation highly effective)",
    expectedYield: "15 - 20 Quintals/Acre",
    reason: "Thrives in deep black cotton soils with high moisture retention and moderate to high temperatures during vegetative growth.",
    guidance: "Sow in late May to June with monsoon onset. Maintain 90x60 cm spacing. Install pheromone traps at 45 DAS to monitor pink bollworm.",
    badgeColor: "success"
  },
  {
    name: "Paddy (Rice)",
    suitableSoils: ["Clay Soil", "Loamy Soil", "Alluvial Soil"],
    minPh: 5.0,
    maxPh: 7.0,
    suitableSeasons: ["Kharif", "Rabi"],
    minWater: "High",
    duration: "120 - 140 Days",
    waterRequirement: "1100 - 1400 mm (Requires continuous standing water/flooding)",
    expectedYield: "25 - 32 Quintals/Acre",
    reason: "Heavy clay and alluvial soils have low percolation loss, preserving standing water needed during tillering and panicle initiation.",
    guidance: "Raise nursery in June, transplant 21-day seedlings. Apply basal NPK with Zinc Sulphate. Keep 2-3 cm water till grain hardening.",
    badgeColor: "primary"
  },
  {
    name: "Wheat (HD-2967 / Shriram)",
    suitableSoils: ["Loamy Soil", "Alluvial Soil", "Clay Soil"],
    minPh: 6.0,
    maxPh: 7.5,
    suitableSeasons: ["Rabi"],
    minWater: "Medium",
    duration: "115 - 130 Days",
    waterRequirement: "450 - 600 mm (4 to 5 critical irrigations)",
    expectedYield: "20 - 24 Quintals/Acre",
    reason: "Well-aerated loamy soil with neutral pH allows vigorous crown root development in cool, dry winter months.",
    guidance: "Sow between 10th - 25th November. The first irrigation at Crown Root Initiation (21 days) is critical. Apply Nitrogen in split doses.",
    badgeColor: "warning"
  },
  {
    name: "Guntur Red Chilli",
    suitableSoils: ["Black Soil", "Loamy Soil", "Red Soil"],
    minPh: 6.0,
    maxPh: 7.5,
    suitableSeasons: ["Kharif", "Rabi"],
    minWater: "Medium",
    duration: "150 - 170 Days",
    waterRequirement: "600 - 750 mm (Sensitive to waterlogging)",
    expectedYield: "12 - 16 Quintals/Acre (Dry)",
    reason: "Rich organic matter and good drainage prevent root rot; warm humid weather enhances capsaicin content and fruit size.",
    guidance: "Transplant 35-day seedlings on raised beds. Apply neem cake at basal. Spray bio-agents against thrips and mites during flowering.",
    badgeColor: "danger"
  },
  {
    name: "Groundnut (Peanut)",
    suitableSoils: ["Sandy Soil", "Loamy Soil", "Red Soil"],
    minPh: 5.5,
    maxPh: 7.0,
    suitableSeasons: ["Kharif", "Zaid"],
    minWater: "Low",
    duration: "105 - 120 Days",
    waterRequirement: "450 - 550 mm (Drought tolerant)",
    expectedYield: "14 - 18 Quintals/Acre",
    reason: "Light, friable sandy loam prevents peg damage and facilitates effortless penetration and uniform pod expansion underground.",
    guidance: "Treat seed with Rhizobium culture. Apply Gypsum @ 200 kg/acre at peg initiation (40-45 DAS) for calcium and sulfur nutrition.",
    badgeColor: "info"
  },
  {
    name: "Maize (Hybrid Corn)",
    suitableSoils: ["Loamy Soil", "Black Soil", "Alluvial Soil"],
    minPh: 5.8,
    maxPh: 7.5,
    suitableSeasons: ["Kharif", "Rabi"],
    minWater: "Medium",
    duration: "95 - 110 Days",
    waterRequirement: "500 - 650 mm",
    expectedYield: "28 - 35 Quintals/Acre",
    reason: "Deep, well-drained loams provide rapid root proliferation and heavy nutrient uptake required by this heavy feeder crop.",
    guidance: "Plant with 60x20 cm spacing. Apply 1/3rd Nitrogen at sowing, 1/3rd at knee-high, and 1/3rd at tasseling stage. Avoid water stagnation.",
    badgeColor: "success"
  },
  {
    name: "Soybean",
    suitableSoils: ["Black Soil", "Loamy Soil"],
    minPh: 6.0,
    maxPh: 7.5,
    suitableSeasons: ["Kharif"],
    minWater: "Medium",
    duration: "90 - 105 Days",
    waterRequirement: "450 - 600 mm",
    expectedYield: "10 - 14 Quintals/Acre",
    reason: "Atmospheric nitrogen-fixing legume that performs exceptionally well in black soils with good phosphorus availability.",
    guidance: "Seed treatment with PSB + Bradyrhizobium. Spray 2% DAP or 19:19:19 at flowering and pod filling for enhanced seed size.",
    badgeColor: "primary"
  },
  {
    name: "Watermelon",
    suitableSoils: ["Sandy Soil", "Loamy Soil"],
    minPh: 6.0,
    maxPh: 7.0,
    suitableSeasons: ["Zaid"],
    minWater: "Low",
    duration: "75 - 90 Days",
    waterRequirement: "350 - 450 mm (Drip with fertigation recommended)",
    expectedYield: "150 - 200 Quintals/Acre",
    reason: "Warm sandy riverbeds and well-drained sandy loam warm up quickly in early summer, accelerating sweet fruit maturation.",
    guidance: "Sow in January-February on raised plastic-mulched beds. Provide light, frequent drip irrigations. Stop watering 5 days before harvest.",
    badgeColor: "warning"
  }
];

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    soilType: "Black Soil",
    soilPh: "6.8",
    season: "Kharif",
    irrigation: "Canal / Borewell (Moderate)",
    location: "Andhra Pradesh",
    rainfall: "Normal"
  });

  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecommend = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const ph = parseFloat(formData.soilPh) || 7.0;

      const scored = CROP_DATABASE.map((crop) => {
        let score = 50;

        // Soil match
        if (crop.suitableSoils.includes(formData.soilType)) {
          score += 25;
        }

        // Season match
        if (crop.suitableSeasons.includes(formData.season)) {
          score += 20;
        }

        // pH range match
        if (ph >= crop.minPh && ph <= crop.maxPh) {
          score += 15;
        } else if (Math.abs(ph - crop.minPh) <= 0.8 || Math.abs(ph - crop.maxPh) <= 0.8) {
          score += 5;
        }

        // Water match
        if (formData.irrigation.includes("High") && crop.minWater === "High") {
          score += 10;
        } else if (formData.irrigation.includes("Rainfed") && crop.minWater === "Low") {
          score += 10;
        } else {
          score += 5;
        }

        const matchPercent = Math.min(Math.round(score), 98);
        return { ...crop, matchPercent };
      });

      // Sort descending by match percentage
      scored.sort((a, b) => b.matchPercent - a.matchPercent);
      setRecommendations(scored.slice(0, 4));
      setLoading(false);
    }, 600);
  };

  return (
    <div className="container mt-4 mb-5">
      {/* Breadcrumb / Title Banner */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 className="fw-bold text-success mb-1">
            🌾 Smart Crop Recommendation System
          </h2>
          <p className="text-muted mb-0">
            Digital India Innovation • Viksit Bharat 2047 Agricultural Intelligence Engine
          </p>
        </div>
        <Link to="/dashboard" className="btn btn-outline-secondary btn-sm mt-2">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="alert alert-success d-flex align-items-center shadow-sm" role="alert">
        <span className="fs-4 me-3">💡</span>
        <div>
          <strong>Transparent Rule-Based Recommendation Engine:</strong> Input your soil properties, season, and available irrigation to compute scientifically-sound crop suitability rankings with agronomic cultivation advice.
        </div>
      </div>

      <div className="row g-4">
        {/* Form Column */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-success text-white py-3">
              <h5 className="mb-0 fw-semibold">📋 Enter Land & Seasonal Parameters</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleRecommend}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Soil Type</label>
                  <select
                    name="soilType"
                    className="form-select"
                    value={formData.soilType}
                    onChange={handleChange}
                  >
                    <option value="Black Soil">Black Soil (High Water Retention)</option>
                    <option value="Loamy Soil">Loamy Soil (Fertile & Well Balanced)</option>
                    <option value="Clay Soil">Clay Soil (Heavy, Fine Texture)</option>
                    <option value="Sandy Soil">Sandy Soil (Fast Draining, Porous)</option>
                    <option value="Alluvial Soil">Alluvial Soil (River Basin, High NPK)</option>
                    <option value="Red Soil">Red Soil (Iron Rich, Moderate Water)</option>
                  </select>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Soil pH (5.0 - 8.5)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="4.0"
                      max="9.5"
                      name="soilPh"
                      className="form-control"
                      value={formData.soilPh}
                      onChange={handleChange}
                      required
                    />
                    <small className="text-muted">Neutral is ~6.5 - 7.5</small>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Current Season</label>
                    <select
                      name="season"
                      className="form-select"
                      value={formData.season}
                      onChange={handleChange}
                    >
                      <option value="Kharif">Kharif (Monsoon: Jun - Oct)</option>
                      <option value="Rabi">Rabi (Winter: Oct - Mar)</option>
                      <option value="Zaid">Zaid (Summer: Mar - Jun)</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Water / Irrigation Availability</label>
                  <select
                    name="irrigation"
                    className="form-select"
                    value={formData.irrigation}
                    onChange={handleChange}
                  >
                    <option value="Canal / Borewell (Moderate)">Canal / Borewell (Moderate Water)</option>
                    <option value="Assured Perennial (High Water)">Assured Perennial / Flooding (High Water)</option>
                    <option value="Micro-Irrigation (Drip / Sprinkler)">Micro-Irrigation (Drip / Sprinkler)</option>
                    <option value="Rainfed Only (Limited Water)">Rainfed Only (Low / Dryland)</option>
                  </select>
                </div>

                <div className="row g-2 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">State / Region</label>
                    <select
                      name="location"
                      className="form-select"
                      value={formData.location}
                      onChange={handleChange}
                    >
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Gujarat">Gujarat</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Rainfall Condition</label>
                    <select
                      name="rainfall"
                      className="form-select"
                      value={formData.rainfall}
                      onChange={handleChange}
                    >
                      <option value="Normal">Normal Seasonal</option>
                      <option value="High">Above Normal / High</option>
                      <option value="Low">Deficit / Dry Spell</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 fw-semibold shadow-sm"
                  disabled={loading}
                >
                  {loading ? "🔄 Analyzing Land Parameters..." : "🌱 Generate Smart Recommendations"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="col-lg-7">
          {!recommendations && !loading && (
            <div className="card shadow-sm border-0 h-100 text-center p-5 d-flex align-items-center justify-content-center">
              <div className="text-muted">
                <span style={{ fontSize: "4rem" }}>🌾</span>
                <h4 className="mt-3 fw-bold text-dark">Ready to Analyze</h4>
                <p className="mx-auto" style={{ maxWidth: "420px" }}>
                  Select your soil type, season, and irrigation facility on the left and click <strong>Generate Smart Recommendations</strong> to view tailored crops and cultivation strategies.
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="card shadow-sm border-0 h-100 text-center p-5 d-flex align-items-center justify-content-center">
              <div className="spinner-border text-success mb-3" style={{ width: "3rem", height: "3rem" }} role="status" />
              <h5>Synthesizing ICAR Agronomic Guidelines...</h5>
              <p className="text-muted">Matching soil pH, moisture capacity, and seasonal photoperiod.</p>
            </div>
          )}

          {recommendations && !loading && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0 text-success">
                  🎯 Top Recommended Crops for Your Farm
                </h5>
                <span className="badge bg-secondary">
                  {formData.soilType} • {formData.season} Season
                </span>
              </div>

              {recommendations.map((crop, idx) => (
                <div key={idx} className="card shadow-sm border-0 mb-3 border-start border-4 border-success">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                      <div>
                        <h4 className="card-title fw-bold text-dark mb-1">
                          #{idx + 1} {crop.name}
                        </h4>
                        <span className="badge bg-success-subtle text-success me-2">
                          ⏱ Duration: {crop.duration}
                        </span>
                        <span className="badge bg-info-subtle text-info">
                          📊 Yield: {crop.expectedYield}
                        </span>
                      </div>
                      <div className="text-end">
                        <span className="badge bg-success fs-6 px-3 py-2">
                          {crop.matchPercent}% Match
                        </span>
                        <div className="text-muted small mt-1">Suitability Index</div>
                      </div>
                    </div>

                    <div className="bg-light p-3 rounded-3 my-3">
                      <p className="mb-1 text-dark">
                        <strong>🔍 Agronomic Reason:</strong> {crop.reason}
                      </p>
                      <p className="mb-0 text-dark">
                        <strong>💧 Water Requirement:</strong> {crop.waterRequirement}
                      </p>
                    </div>

                    <div className="mb-2">
                      <strong className="text-success">🌿 Cultivation & Field Management:</strong>
                      <p className="text-muted small mb-0 mt-1">{crop.guidance}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="card bg-light border-0 p-3 mt-3">
                <small className="text-muted">
                  <strong>⚠️ Academic Disclaimer:</strong> These rule-based recommendations are compiled for decision support in the Smart Farmer Assistant prototype. Real-world planting should be supplemented with localized soil testing from your nearest Krishi Vigyan Kendra (KVK).
                </small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
