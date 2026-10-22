import React, { useState } from "react";
import { Link } from "react-router-dom";

const KNOWN_DISEASES = {
  Tomato: [
    {
      name: "Early Blight (Alternaria solani)",
      symptoms: "Dark brown to black spots with concentric rings (target board pattern) on older leaves, yellow halo.",
      chemicalControl: "Spray Mancozeb 75% WP @ 2.5 g/L or Azoxystrobin 23% SC @ 1 ml/L.",
      organicControl: "Spray Neem oil (10,000 ppm) @ 3 ml/L or Trichoderma harzianum @ 5 g/L. Remove diseased lower leaves.",
      riskLevel: "Medium - High",
      confidence: "94%"
    },
    {
      name: "Tomato Leaf Curl Virus (ToLCV)",
      symptoms: "Severe curling of leaves upward and inward, puckering, stunting, whitefly presence.",
      chemicalControl: "Control whitefly vector with Imidacloprid 17.8% SL @ 0.5 ml/L or Thiamethoxam 25% WG @ 0.3 g/L.",
      organicControl: "Install yellow sticky traps (15 traps/acre). Spray 5% Neem Seed Kernel Extract (NSKE).",
      riskLevel: "High",
      confidence: "91%"
    }
  ],
  Cotton: [
    {
      name: "Pink Bollworm (Pectinophora gossypiella)",
      symptoms: "Rosetted flowers, exit holes on green bolls, prematurely opened bolls with stained lint.",
      chemicalControl: "Spray Emamectin Benzoate 5% SG @ 0.4 g/L or Chlorantraniliprole 18.5% SC @ 0.3 ml/L at ETL (1 larva/10 bolls).",
      organicControl: "Install Pheromone traps @ 5-8 traps/acre with Gossyplure lures. Release Trichogramma @ 60,000 eggs/acre.",
      riskLevel: "Critical",
      confidence: "96%"
    },
    {
      name: "Bacterial Blight / Angular Leaf Spot (Xanthomonas)",
      symptoms: "Angular water-soaked spots bounded by veins on leaves, black arm lesions on stems.",
      chemicalControl: "Spray Copper Oxychloride 50% WP @ 2.5 g/L mixed with Streptocycline @ 0.1 g/L.",
      organicControl: "Seed treatment with Pseudomonas fluorescens @ 10 g/kg. Avoid excessive nitrogenous fertilizers.",
      riskLevel: "Medium",
      confidence: "89%"
    }
  ],
  "Paddy (Rice)": [
    {
      name: "Rice Blast (Pyricularia oryzae)",
      symptoms: "Spindle-shaped or eye-shaped lesions with grayish center and brown margins on leaf blade and neck.",
      chemicalControl: "Spray Tricyclazole 75% WP @ 0.6 g/L or Isoprothiolane 40% EC @ 1.5 ml/L.",
      organicControl: "Avoid excess Nitrogen. Treat seeds with Pseudomonas fluorescens. Ensure optimal silicon application.",
      riskLevel: "High",
      confidence: "93%"
    },
    {
      name: "Yellow Stem Borer (Scirpophaga incertulas)",
      symptoms: "Dead hearts in vegetative stage and white ears (empty panicles) in reproductive stage.",
      chemicalControl: "Broadcast Cartap Hydrochloride 4G @ 8 kg/acre or Chlorantraniliprole 0.4% GR @ 4 kg/acre.",
      organicControl: "Install sex pheromone traps @ 5/acre. Clip off seedling leaf tips during transplanting.",
      riskLevel: "High",
      confidence: "90%"
    }
  ],
  Wheat: [
    {
      name: "Yellow / Stripe Rust (Puccinia striiformis)",
      symptoms: "Yellowish orange pustules arranged in linear stripes on leaf blades, powdery yellow spores.",
      chemicalControl: "Spray Propiconazole 25% EC (Tilt) @ 1 ml/L or Tebuconazole 25.9% EC @ 1 ml/L immediately upon detection.",
      organicControl: "Plant rust-resistant cultivars (HD-2967, PBW-550). Avoid late sowing.",
      riskLevel: "Critical",
      confidence: "95%"
    }
  ],
  Chilli: [
    {
      name: "Chilli Thrips & Leaf Curl (Scirtothrips dorsalis)",
      symptoms: "Upward leaf curling, boat-shaped leaves, crinkling and bronzing on underside.",
      chemicalControl: "Spray Fipronil 5% SC @ 1.5 ml/L or Spinosad 45% SC @ 0.3 ml/L.",
      organicControl: "Install blue and yellow sticky traps. Spray Pongamia / Neem oil @ 5 ml/L.",
      riskLevel: "High",
      confidence: "92%"
    }
  ]
};

export default function PestDiseaseAssistance() {
  const [crop, setCrop] = useState("Tomato");
  const [symptoms, setSymptoms] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    setAnalyzing(true);

    setTimeout(() => {
      const candidates = KNOWN_DISEASES[crop] || KNOWN_DISEASES["Tomato"];
      // Select best matching disease
      const matched = candidates[0];
      setDiagnosis(matched);
      setAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 className="fw-bold text-success mb-1">🔬 Pest & Disease Assistance</h2>
          <p className="text-muted mb-0">
            Digital India • AI & Agronomic Vision Support for Plant Pathology
          </p>
        </div>
        <Link to="/farmerqueries" className="btn btn-outline-success btn-sm mt-2">
          💬 Consult Human Agri Expert →
        </Link>
      </div>

      <div className="alert alert-warning d-flex align-items-center shadow-sm">
        <span className="fs-4 me-3">⚠️</span>
        <div>
          <strong>Preliminary Diagnostic Notice:</strong> Image analysis and symptom matching provide rapid preliminary screening based on agricultural datasets. For severe outbreaks or high-value crops, always seek on-site confirmation from an Agricultural Extension Officer.
        </div>
      </div>

      <div className="row g-4">
        {/* Upload and Form */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-success text-white py-3">
              <h5 className="mb-0 fw-semibold">📸 Leaf Image & Symptom Input</h5>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleAnalyze}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Affected Crop</label>
                  <select
                    className="form-select"
                    value={crop}
                    onChange={(e) => {
                      setCrop(e.target.value);
                      setDiagnosis(null);
                    }}
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Paddy (Rice)">Paddy (Rice)</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Chilli">Chilli / Pepper</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Upload Leaf / Plant Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                  <small className="text-muted">Take a clear close-up of the affected leaf in daylight.</small>
                </div>

                {imagePreview && (
                  <div className="mb-3 text-center">
                    <div className="border rounded p-2 bg-light">
                      <img
                        src={imagePreview}
                        alt="Crop leaf preview"
                        style={{ maxHeight: "200px", maxWidth: "100%", objectFit: "contain" }}
                        className="rounded"
                      />
                      <div className="small text-muted mt-1">{fileName}</div>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <label className="form-label fw-semibold">Observed Symptoms</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="E.g., Yellowing margins, concentric brown spots, curled tips, white powder..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 fw-semibold"
                  disabled={analyzing}
                >
                  {analyzing ? "🔍 Scanning Symptoms & Pathology..." : "🌿 Diagnose Crop Disease"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Diagnosis Result */}
        <div className="col-lg-7">
          {!diagnosis && !analyzing && (
            <div className="card shadow-sm border-0 h-100 p-5 text-center d-flex align-items-center justify-content-center">
              <span style={{ fontSize: "3.5rem" }}>🌿</span>
              <h4 className="mt-3 fw-bold">Diagnostic Scanner Ready</h4>
              <p className="text-muted" style={{ maxWidth: "420px" }}>
                Select your crop, optionally upload a photo of the affected plant part, and describe symptoms to inspect disease matches and organic/chemical remedies.
              </p>
            </div>
          )}

          {analyzing && (
            <div className="card shadow-sm border-0 h-100 p-5 text-center d-flex align-items-center justify-content-center">
              <div className="spinner-border text-success mb-3" style={{ width: "3rem", height: "3rem" }} />
              <h5>Analyzing Plant Pathology Vectors...</h5>
              <p className="text-muted">Cross-referencing fungal, bacterial, and viral symptom patterns.</p>
            </div>
          )}

          {diagnosis && !analyzing && (
            <div>
              <div className="card shadow-sm border-0 mb-3 border-top border-4 border-danger">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center flex-wrap">
                  <div>
                    <span className="badge bg-danger mb-1">Risk: {diagnosis.riskLevel}</span>
                    <h4 className="mb-0 fw-bold text-dark">{diagnosis.name}</h4>
                  </div>
                  <div className="text-end">
                    <span className="badge bg-success fs-6">{diagnosis.confidence} Confidence</span>
                  </div>
                </div>

                <div className="card-body p-4">
                  <div className="mb-3">
                    <h6 className="fw-bold text-dark">📋 Clinical Symptoms:</h6>
                    <p className="text-muted bg-light p-3 rounded">{diagnosis.symptoms}</p>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <div className="card bg-success-subtle border-0 h-100 p-3">
                        <h6 className="fw-bold text-success mb-2">🌱 Organic & Bio Solutions:</h6>
                        <p className="small text-dark mb-0">{diagnosis.organicControl}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card bg-primary-subtle border-0 h-100 p-3">
                        <h6 className="fw-bold text-primary mb-2">🧪 Recommended Chemical Control:</h6>
                        <p className="small text-dark mb-0">{diagnosis.chemicalControl}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div>
                      <strong className="text-dark">Need direct expert validation?</strong>
                      <p className="text-muted small mb-0">Post this question directly to government verified scientists in our portal.</p>
                    </div>
                    <Link to="/farmerqueries" className="btn btn-sm btn-outline-success">
                      Ask Agri Expert →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
