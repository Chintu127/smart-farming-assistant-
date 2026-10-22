import React, { useEffect, useState } from "react";
import axios from "axios";

function GovernmentScheme() {
  const [schemes, setSchemes] = useState([]);
  const [regionFilter, setRegionFilter] = useState("");

  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    fetchAllSchemes();
  }, []);

  const fetchAllSchemes = () => {
    axios
      .get("/api/scheme", axiosConfig)
      .then((res) => setSchemes(res.data))
      .catch((err) => console.error("Failed to fetch schemes", err));
  };

  const fetchSchemesByRegion = () => {
    if (regionFilter.trim() === "") {
      fetchAllSchemes();
      return;
    }

    axios
      .get(`/api/scheme/region/${regionFilter}`, axiosConfig)
      .then((res) => setSchemes(res.data))
      .catch((err) => console.error("Failed to fetch schemes by region", err));
  };

  return (
    <div className="container mt-4">
      <h2>Government Schemes</h2>

      {/* Region Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by region"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="form-control w-50 d-inline-block me-2"
        />
        <button className="btn btn-primary" onClick={fetchSchemesByRegion}>
          Search
        </button>
      </div>

      {/* Scheme List */}
      <div className="card p-3 shadow">
        <h5>Available Schemes</h5>
        {schemes.length === 0 ? (
          <p>No schemes found.</p>
        ) : (
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Title</th>
                <th>Region</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Eligibility</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {schemes.map((scheme) => (
                <tr key={scheme.id}>
                  <td>{scheme.title}</td>
                  <td>{scheme.region}</td>
                  <td>{scheme.startDate}</td>
                  <td>{scheme.endDate}</td>
                  <td>{scheme.eligibility}</td>
                  <td>{scheme.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default GovernmentScheme;
