import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Soil() {
  const [soils, setSoils] = useState([]);
  const [form, setForm] = useState({ type: "", phLevel: "", nutrients: "" });
  const [editingId, setEditingId] = useState(null);
  const [soilTypes, setSoilTypes] = useState([]);
  const [selectedSoilId, setSelectedSoilId] = useState("");
  const [suggestedCrops, setSuggestedCrops] = useState([]);

  const { farmId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!token) return navigate("/");
    fetchSoils();
    fetchSoilTypes();
  }, []);

  const fetchSoils = () => {
    axios.get(`/api/soils/farm/${farmId}`, axiosConfig)
      .then((res) => setSoils(res.data))
      .catch((err) => console.error("Failed to fetch soils", err));
  };

  const fetchSoilTypes = () => {
    axios.get("/api/soil-types", axiosConfig)
      .then((res) => setSoilTypes(res.data))
      .catch((err) => console.error("Failed to fetch soil types", err));
  };

  const handleSoilTypeSelect = (soilId) => {
    setSelectedSoilId(soilId);
    const selected = soilTypes.find(s => s.id === parseInt(soilId));
    if (!selected) return;

    setForm({
      type: selected.name,
      phLevel: ((selected.minPh + selected.maxPh) / 2).toFixed(2),
      nutrients: selected.nutrients
    });

    // 🔁 Fetch recommended crops
    axios.get(`/api/soil-types/${soilId}/crops`, axiosConfig)
      .then((res) => setSuggestedCrops(res.data))
      .catch((err) => console.error("Crop suggestion failed", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "phLevel" ? parseFloat(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingId ? axios.put : axios.post;
    const url = editingId ? `/api/soils/${editingId}` : "/api/soils/add";
    const payload = { ...form, farmid: farmId };

    method(url, payload, axiosConfig)
      .then(() => {
        alert(`Soil ${editingId ? "updated" : "added"} successfully`);
        setForm({ type: "", phLevel: "", nutrients: "" });
        setEditingId(null);
        setSelectedSoilId("");
        setSuggestedCrops([]);
        fetchSoils();
      })
      .catch((err) => console.error("Soil save failed", err));
  };

  const handleEdit = (soil) => {
    setForm({
      type: soil.type,
      phLevel: soil.phLevel,
      nutrients: soil.nutrients
    });
    setEditingId(soil.id);
    setSelectedSoilId("");
    setSuggestedCrops([]);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this soil entry?")) return;
    axios.delete(`/api/soils/${id}`, axiosConfig)
      .then(() => {
        alert("Soil deleted");
        setSoils(soils.filter((s) => s.id !== id));
      })
      .catch((err) => console.error("Delete failed", err));
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-success text-center">Soil Management</h3>

      <div className="card p-4 shadow-sm mb-4">
        <div className="mb-3">
          <label>Select Predefined Soil Type</label>
          <select
            className="form-select"
            value={selectedSoilId}
            onChange={(e) => handleSoilTypeSelect(e.target.value)}
          >
            <option value="">-- Select Soil Type --</option>
            {soilTypes.map((soil) => (
              <option key={soil.id} value={soil.id}>{soil.name}</option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {[
              { label: "Soil Type", name: "type" },
              { label: "pH Level", name: "phLevel", type: "number" },
              { label: "Nutrients", name: "nutrients" },
            ].map(({ label, name, type = "text" }) => (
              <div className="col-md-4 mb-3" key={name}>
                <label>{label}</label>
                <input
                  type={type}
                  className="form-control"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>
          <button className="btn btn-primary w-100" type="submit">
            {editingId ? "Update Soil" : "Add Soil"}
          </button>
        </form>

        {suggestedCrops.length > 0 && (
          <div className="alert alert-info mt-3">
            <strong>🌾 Recommended Crops:</strong> {suggestedCrops.join(", ")}
          </div>
        )}
      </div>

      <h5 className="mb-3">Registered Soils</h5>
      {soils.length === 0 ? (
        <p className="text-muted">No soils added yet.</p>
      ) : (
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>Type</th>
              <th>pH</th>
              <th>Nutrients</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {soils.map((soil) => (
              <tr key={soil.id}>
                <td>{soil.type}</td>
                <td>{soil.phLevel}</td>
                <td>{soil.nutrients}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(soil)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(soil.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Soil;
