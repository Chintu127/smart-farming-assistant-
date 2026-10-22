import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function FarmerQueries() {
  const [queries, setQueries] = useState([]);
  const [form, setForm] = useState({ question: "", farmid: "" });
  const [farms, setFarms] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchFarms();
    fetchQueries();
  }, []);

  const fetchFarms = async () => {
    try {
      const res = await API.get("/farms/all", axiosConfig);
      setFarms(res.data);
    } catch (err) {
      console.error("Error fetching farms", err);
      alert("Failed to load farms. Check your backend or CORS settings.");
    }
  };

  const fetchQueries = async () => {
    try {
      const res = await API.get("/expert-query/my-queries", axiosConfig);
      setQueries(res.data);
    } catch (err) {
      console.error("Error fetching queries", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, farmerId: userId };

    try {
      await API.post("/expert-query/submit", payload, axiosConfig);
      alert("Query submitted successfully.");
      setForm({ question: "", farmid: "" });
      fetchQueries();
    } catch (err) {
      console.error("Error submitting query", err);
      alert("Failed to submit query.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">❓ Submit Expert Query</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow mb-4">
        <div className="row">
          <div className="col-md-6 mb-3">
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

          <div className="col-md-6 mb-3">
            <label className="form-label">Your Question</label>
            <input
              type="text"
              className="form-control"
              name="question"
              value={form.question}
              onChange={handleChange}
              placeholder="Ask your question"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Query
        </button>
      </form>

      <div className="card p-4 shadow">
        <h5>📋 Your Queries</h5>
        {queries.length === 0 ? (
          <p>No queries submitted yet.</p>
        ) : (
          <ul className="list-group">
            {queries.map((query) => (
              <li key={query.id} className="list-group-item">
                <strong>Q:</strong> {query.question} <br />
                <strong>A:</strong> {query.answer || "Awaiting expert response"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FarmerQueries;
