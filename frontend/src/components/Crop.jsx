import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function Crop(){
  const [form, setForm] = useState({
    cropName: "",
    cropType: "",
    season: "",
    yeild: "",
    farmid: "",
  });

  const [farms, setFarms] = useState([]);
  const [crops, setCrops] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch farms on mount
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("/api/farms/all", axiosConfig)
      .then((res) => setFarms(res.data))
      .catch((err) => console.error("Error fetching farms", err));
  }, [token, navigate]);

  // Fetch crops when farm changes
  useEffect(() => {
    if (form.farmid) {
      axios
        .get(`/api/crops/farm/${form.farmid}`, axiosConfig)
        .then((res) => setCrops(res.data))
        .catch((err) => console.error("Error fetching crops", err));
    } else {
      setCrops([]);
    }
  }, [form.farmid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "yeild" ? parseFloat(value) : value;
    setForm({
      ...form,
      [name]: parsedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = editingId ? axios.put : axios.post;
    const url = editingId
      ? `/api/crops/update/${editingId}`
      : "/api/crops/add";

    method(url, form, axiosConfig)
      .then(() => {
        alert(`Crop ${editingId ? "updated" : "added"} successfully`);
        setForm({
          cropName: "",
          cropType: "",
          season: "",
          yeild: "",
          farmid: form.farmid,
        });
        setEditingId(null);
        return axios.get(`/api/crops/farm/${form.farmid}`, axiosConfig);
      })
      .then((res) => setCrops(res.data))
      .catch((err) => {
        console.error("Error saving crop", err);
        alert("Something went wrong.");
      });
  };

  const handleEdit = (crop) => {
    setForm({
      cropName: crop.cropName ?? "",
      cropType: crop.cropType ?? "",
      season: crop.season ?? "",
      yeild: crop.yeild ?? "",
      farmid: crop.farmid ?? "",
    });
    setEditingId(crop.id);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this crop?")) return;

    axios
      .delete(`/api/crops/delete/${id}`, axiosConfig)
      .then(() => {
        alert("Crop deleted");
        setCrops(crops.filter((c) => c.id !== id));
      })
      .catch((err) => console.error("Error deleting crop", err));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🌱 Crop Manager</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Select Farm</label>
            <select
              className="form-select"
              name="farmid"
              value={form.farmid}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose Farm --</option>
              {farms.map((farm) => (
                <option key={farm.id} value={farm.id}>
                  {farm.farmName} ({farm.location})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Crop Name</label>
            <input
              type="text"
              className="form-control"
              name="cropName"
              value={form.cropName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Crop Type</label>
            <input
              type="text"
              className="form-control"
              name="cropType"
              value={form.cropType}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Season</label>
            <input
              type="text"
              className="form-control"
              name="season"
              value={form.season}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Yield (Quintals)</label>
            <input
              type="number"
              className="form-control"
              name="yeild"
              value={form.yeild}
              onChange={handleChange}
              step="any"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success">
          {editingId ? "Update Crop" : "Add Crop"}
        </button>
      </form>

      <div className="card p-4 shadow">
        <h5 className="mb-3">🌾 Crops in Selected Farm</h5>
        {crops.length === 0 ? (
          <p>No crops found for the selected farm.</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Crop Name</th>
                <th>Type</th>
                <th>Season</th>
                <th>Yield (Quintals)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop) => (
                <tr key={crop.id}>
                  <td>{crop.cropName}</td>
                  <td>{crop.cropType}</td>
                  <td>{crop.season}</td>
                  <td>{crop.yeild}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(crop)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(crop.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


export default Crop;
