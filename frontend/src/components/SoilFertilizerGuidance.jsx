import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SoilFertilizerGuidance() {
  const [inputs, setInputs] = useState({
    soilType: "Black Cotton Soil",
    crop: "Cotton",
    nitrogenStatus: "Low",
    phosphorusStatus: "Medium",
    potassiumStatus: "High",
    soilPh: "7.2",
    organicCarbon: "0.45",
  });

  const [advice, setAdvice] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    let ureaDose = "80 - 100 kg/acre";
    let dapDose = "40 - 50 kg/acre";
    let mopDose = "25 - 30 kg/acre";
    let compostDose = "2 - 3 tonnes/acre";

    if (inputs.nitrogenStatus === "Low") ureaDose = "100 - 120 kg/acre (Apply in 3 splits)";
    else if (inputs.nitrogenStatus === "High") ureaDose = "50 - 60 kg/acre";

    if (inputs.phosphorusStatus === "Low") dapDose = "60 - 70 kg/acre as basal dose";
    else if (inputs.phosphorusStatus === "High") dapDose = "25 - 30 kg/acre";

    if (inputs.potassiumStatus === "Low") mopDose = "40 - 50 kg/acre (At flowering)";
    else if (inputs.potassiumStatus === "High") mopDose = "15 - 20 kg/acre";

    setAdvice({
      ureaDose,
      dapDose,
      mopDose,
      compostDose,
      phAdvice:
        parseFloat(inputs.soilPh) < 6.0
          ? "Acidic soil: Apply agricultural lime @ 200 kg/acre to neutralize acidity."
          : parseFloat(inputs.soilPh) > 8.0
          ? "Alkaline / Sodic soil: Apply Gypsum @ 300-400 kg/acre with adequate irrigation to reduce sodicity."
          : "Optimal neutral pH: Excellent nutrient bioavailability for crop root uptake.",
      micronutrients:
        "Apply Zinc Sulphate (ZnSO4) @ 10 kg/acre once every 2 years. Spray Boron 0.2% during flowering for flower and boll retention.",
      biofertilizers:
        "Incorporate Azotobacter / Rhizobium (2 kg/acre) and Phosphate Solubilizing Bacteria (PSB) mixed with 100 kg FYM."
    });
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 className="fw-bold text-success mb-1">🧪 Soil & Fertilizer Guidance</h2>
          <p className="text-muted mb-0">
            Digital India • Soil Health Card Integration & Scientific Nutrient Management
          </p>
        </div>
        <Link to="/dashboard" className="btn btn-outline-secondary btn-sm mt-2">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="alert alert-info d-flex align-items-center shadow-sm">
        <span className="fs-4 me-3">🌱</span>
        <div>
          <strong>Soil Testing First!</strong> Applying balanced N-P-K and organic manures according to test values protects soil microbiome, cuts input expenses by up to 25%, and prevents soil salinity.
        </div>
      </div>

      <div className="row g-4">
        {/* Form */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-success text-white py-3">
              <h5 className="mb-0 fw-semibold">📝 Enter Soil Test & Crop Parameters</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleCalculate}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Soil Type</label>
                  <select
                    name="soilType"
                    className="form-select"
                    value={inputs.soilType}
                    onChange={handleChange}
                  >
                    <option value="Black Cotton Soil">Black Cotton Soil (Vertisol)</option>
                    <option value="Loamy Soil">Loamy Soil (Balanced NPK)</option>
                    <option value="Red Sandy Loam">Red Sandy Loam (Alfisol)</option>
                    <option value="Alluvial Soil">Alluvial Soil (River Plains)</option>
                    <option value="Laterite Soil">Laterite Soil (Porous, Acidic)</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Target Crop</label>
                  <select
                    name="crop"
                    className="form-select"
                    value={inputs.crop}
                    onChange={handleChange}
                  >
                    <option value="Cotton">Cotton</option>
                    <option value="Paddy (Rice)">Paddy (Rice)</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Chilli">Chilli / Pepper</option>
                    <option value="Maize">Maize</option>
                    <option value="Groundnut">Groundnut</option>
                    <option value="Sugarcane">Sugarcane</option>
                  </select>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Soil pH</label>
                    <input
                      type="number"
                      step="0.1"
                      name="soilPh"
                      className="form-control"
                      value={inputs.soilPh}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Organic Carbon (%)</label>
                    <input
                      type="number"
                      step="0.05"
                      name="organicCarbon"
                      className="form-control"
                      value={inputs.organicCarbon}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="p-3 bg-light rounded-3 mb-3">
                  <label className="form-label fw-semibold text-success mb-2">
                    Available Nutrients (from Soil Health Card)
                  </label>
                  <div className="row g-2">
                    <div className="col-4">
                      <small className="fw-bold">Nitrogen (N)</small>
                      <select
                        name="nitrogenStatus"
                        className="form-select form-select-sm"
                        value={inputs.nitrogenStatus}
                        onChange={handleChange}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div className="col-4">
                      <small className="fw-bold">Phosphorus (P)</small>
                      <select
                        name="phosphorusStatus"
                        className="form-select form-select-sm"
                        value={inputs.phosphorusStatus}
                        onChange={handleChange}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div className="col-4">
                      <small className="fw-bold">Potassium (K)</small>
                      <select
                        name="potassiumStatus"
                        className="form-select form-select-sm"
                        value={inputs.potassiumStatus}
                        onChange={handleChange}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100 py-2 fw-semibold">
                  🌿 Calculate Scientific Fertilizer Schedule
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Advice Panel */}
        <div className="col-lg-7">
          {!advice ? (
            <div className="card shadow-sm border-0 h-100 p-5 text-center d-flex align-items-center justify-content-center">
              <span style={{ fontSize: "3.5rem" }}>🧪</span>
              <h4 className="mt-3 fw-bold">Fertilizer Calculator Ready</h4>
              <p className="text-muted" style={{ maxWidth: "420px" }}>
                Select your crop, soil type, and nutrient statuses on the left to receive a custom 4R nutrient plan (Right Source, Right Rate, Right Time, Right Place).
              </p>
            </div>
          ) : (
            <div>
              <div className="card shadow-sm border-0 mb-3 border-top border-4 border-success">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0 fw-bold text-success">
                    🌾 Custom Fertilizer Dose for {inputs.crop} ({inputs.soilType})
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <div className="card bg-light border-0 p-3">
                        <div className="text-muted small">Primary Nitrogen (Urea 46% N)</div>
                        <h4 className="fw-bold text-dark mt-1">{advice.ureaDose}</h4>
                        <small className="text-success">Split application recommended</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card bg-light border-0 p-3">
                        <div className="text-muted small">Phosphorus (DAP 18:46:0 or SSP)</div>
                        <h4 className="fw-bold text-dark mt-1">{advice.dapDose}</h4>
                        <small className="text-primary">Apply 100% as basal at sowing</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card bg-light border-0 p-3">
                        <div className="text-muted small">Potassium (MOP 60% K2O)</div>
                        <h4 className="fw-bold text-dark mt-1">{advice.mopDose}</h4>
                        <small className="text-warning">Enhances grain/boll weight</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card bg-light border-0 p-3">
                        <div className="text-muted small">Organic Compost / FYM</div>
                        <h4 className="fw-bold text-dark mt-1">{advice.compostDose}</h4>
                        <small className="text-info">Incorporate 3 weeks before sowing</small>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h6 className="fw-bold text-dark">⚖️ Soil pH Analysis:</h6>
                    <p className="text-muted small bg-light p-2 rounded">{advice.phAdvice}</p>
                  </div>

                  <div className="mb-3">
                    <h6 className="fw-bold text-dark">⚡ Micronutrient Enrichment:</h6>
                    <p className="text-muted small bg-light p-2 rounded">{advice.micronutrients}</p>
                  </div>

                  <div>
                    <h6 className="fw-bold text-dark">🦠 Bio-fertilizer Integration:</h6>
                    <p className="text-muted small bg-light p-2 rounded">{advice.biofertilizers}</p>
                  </div>
                </div>
              </div>

              <div className="alert alert-warning small">
                <strong>⚠️ Notice:</strong> These dosages follow Indian Council of Agricultural Research (ICAR) state package of practices. Before massive field applications, kindly consult your local Agricultural Extension Officer (AEO) or Agriculture Expert through our Ask Expert module.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
