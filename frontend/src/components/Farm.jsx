import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Farm() {
  const [farms, setFarms] = useState([]);
  const [form, setForm] = useState({
    farmName: "",
    location: "",
    sizeInAcres: "",
    latitude: "",
    longitude: "",
  });

  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("/api/farms/all", axiosConfig)
      .then((res) => setFarms(res.data))
      .catch((err) => console.error("Failed to fetch farms", err));
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "sizeInAcres" || name === "latitude" || name === "longitude"
        ? parseFloat(value)
        : value;

    setForm({ ...form, [name]: parsedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editingId ? `/api/farms/${editingId}` : "/api/farms/create";
    const method = editingId ? axios.put : axios.post;

    method(url, form, axiosConfig)
      .then(() => {
        alert(`Farm ${editingId ? "updated" : "added"} successfully`);
        setForm({
          farmName: "",
          location: "",
          sizeInAcres: "",
          latitude: "",
          longitude: "",
        });
        setEditingId(null);
        return axios.get("/api/farms/all", axiosConfig);
      })
      .then((res) => setFarms(res.data))
      .catch((err) => {
        console.error("Failed to save farm", err);
        alert("Something went wrong.");
      });
  };

  const handleEdit = (farm) => {
    setForm({
      farmName: farm.farmName ?? "",
      location: farm.location ?? "",
      sizeInAcres: farm.sizeInAcres ?? "",
      latitude: farm.latitude ?? "",
      longitude: farm.longitude ?? "",
    });
    setEditingId(farm.id);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this farm?")) return;

    axios
      .delete(`/api/farms/${id}`, axiosConfig)
      .then(() => {
        alert("Farm deleted");
        setFarms(farms.filter((f) => f.id !== id));
      })
      .catch((err) => {
        console.error("Failed to delete farm", err);
        alert("Delete failed");
      });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">{editingId ? "✏ Edit Farm" : "➕ Add New Farm"}</h3>

      <div className="card p-4 shadow-sm mb-5">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {[
              { label: "Farm Name", name: "farmName" },
              { label: "Location", name: "location" },
              { label: "Size (Acres)", name: "sizeInAcres", type: "number" },
              { label: "Latitude", name: "latitude", type: "number" },
              { label: "Longitude", name: "longitude", type: "number" },
            ].map(({ label, name, type = "text" }) => (
              <div className="col-md-6 mb-3" key={name}>
                <label className="form-label">{label}</label>
                <input
                  type={type}
                  name={name}
                  className="form-control"
                  step={type === "number" ? "any" : undefined}
                  value={form[name]}
                  onChange={handleChange}
                  required={name !== "latitude" && name !== "longitude"}
                />
              </div>
            ))}
          </div>
          <button className="btn btn-success w-100" type="submit">
            {editingId ? "Update Farm" : "Add Farm"}
          </button>
        </form>
      </div>

      <h5 className="mb-3">📋 Your Registered Farms</h5>
      {farms.length === 0 ? (
        <p>No farms added yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Size</th>
                <th>Lat</th>
                <th>Long</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {farms.map((farm) => (
                <tr key={farm.id}>
                  <td>{farm.farmName}</td>
                  <td>{farm.location}</td>
                  <td>{farm.sizeInAcres}</td>
                  <td>{farm.latitude}</td>
                  <td>{farm.longitude}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-1"
                      onClick={() => handleEdit(farm)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger me-1"
                      onClick={() => handleDelete(farm.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => navigate(`/soil/${farm.id}`)}
                    >
                      Soil
                    </button>
                    <Link
                      to={`/weather/${farm.id}`}
                      className="btn btn-sm btn-info text-white"
                    >
                      Weather
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Farm;