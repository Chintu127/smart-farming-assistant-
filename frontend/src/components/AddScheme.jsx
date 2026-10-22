import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddScheme() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    eligibility: "",
    region: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/scheme", form, axiosConfig)
      .then(() => {
        alert("Scheme added successfully");
        navigate("/schemes");
      })
      .catch((err) => {
        console.error("Failed to add scheme", err);
        alert("Failed to add scheme. Make sure you're logged in as ADMIN.");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add New Government Scheme</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow mt-3">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={form.description}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="form-control"
            value={form.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={form.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Eligibility</label>
          <input
            name="eligibility"
            className="form-control"
            value={form.eligibility}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Region</label>
          <input
            name="region"
            className="form-control"
            value={form.region}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Scheme
        </button>
      </form>
    </div>
  );
}

export default AddScheme;
