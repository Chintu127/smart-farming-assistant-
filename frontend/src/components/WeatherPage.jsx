import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function WeatherPage() {
  const [city, setCity] = useState("Guntur");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = (searchCity) => {
    setLoading(true);
    setError("");
    API.get(`/weather/city/${searchCity}`)
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load weather", err);
        setError("Could not load live weather data. Displaying regional agricultural baseline.");
        setWeather({
          weather: "Partly Cloudy",
          description: "Scattered clouds with intermittent sunshine",
          temperature: 30.2,
          feelsLike: 32.5,
          windSpeed: 4.2,
          humidity: 64,
          city: searchCity
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWeather("Guntur");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 className="fw-bold text-success mb-1">🌤️ Weather & Agro-Advisory Forecast</h2>
          <p className="text-muted mb-0">
            Digital India • OpenWeather Integration with Real-Time Farming Guidance
          </p>
        </div>
        <Link to="/dashboard" className="btn btn-outline-secondary btn-sm mt-2">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Search Bar */}
      <div className="card shadow-sm border-0 mb-4 p-3 bg-light">
        <form onSubmit={handleSearch} className="row g-2 align-items-center">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              placeholder="Search agricultural mandal or city (e.g., Guntur, Warangal, Vijayawada, Hyderabad)..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-success w-100 fw-semibold">
              🔍 Get Live Weather
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status" />
          <p className="mt-2 text-muted">Retrieving meteorological telemetry...</p>
        </div>
      )}

      {error && <div className="alert alert-warning">{error}</div>}

      {weather && !loading && (
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="card shadow-sm border-0 bg-success text-white p-4 h-100">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <span className="badge bg-white text-success mb-2 px-3 py-1 fw-bold">
                    📍 {weather.city || "Regional Mandal"}
                  </span>
                  <h1 className="display-3 fw-bold mb-0">
                    {Math.round(weather.temperature)}°C
                  </h1>
                  <h5 className="mt-2 text-light">{weather.weather}</h5>
                  <p className="small text-light opacity-75">{weather.description}</p>
                </div>
                <div style={{ fontSize: "4.5rem" }}>
                  {weather.weather.toLowerCase().includes("rain") ? "🌧️" : weather.weather.toLowerCase().includes("cloud") ? "⛅" : "☀️"}
                </div>
              </div>

              <hr className="my-3 border-white opacity-25" />

              <div className="row text-center g-2">
                <div className="col-4">
                  <small className="opacity-75 d-block">Feels Like</small>
                  <strong>{weather.feelsLike}°C</strong>
                </div>
                <div className="col-4">
                  <small className="opacity-75 d-block">Humidity</small>
                  <strong>{weather.humidity}%</strong>
                </div>
                <div className="col-4">
                  <small className="opacity-75 d-block">Wind Speed</small>
                  <strong>{weather.windSpeed} m/s</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card shadow-sm border-0 p-4 h-100">
              <h5 className="fw-bold text-success mb-3">🌾 Farming Operations Advisory Based on Weather</h5>

              <div className="mb-3">
                <h6 className="fw-bold text-dark">💦 Irrigation Advisory:</h6>
                <p className="text-muted small bg-light p-2 rounded">
                  {weather.humidity > 75 || weather.weather.toLowerCase().includes("rain")
                    ? "Rainfall / High humidity detected: Postpone non-critical irrigation for 48 hours to prevent root waterlogging."
                    : "Moderate humidity and fair weather: Safe to proceed with scheduled furrow or drip irrigation."}
                </p>
              </div>

              <div className="mb-3">
                <h6 className="fw-bold text-dark">🧪 Chemical & Foliar Spraying:</h6>
                <p className="text-muted small bg-light p-2 rounded">
                  {weather.windSpeed > 5.5
                    ? "High wind velocity detected (> 5.5 m/s): Avoid pesticide or foliar fertilizer spraying due to spray drift risk."
                    : "Calm wind conditions: Ideal for early morning or evening pesticide / fungicide application."}
                </p>
              </div>

              <div>
                <h6 className="fw-bold text-dark">🌾 Harvesting & Post-Harvest Drying:</h6>
                <p className="text-muted small bg-light p-2 rounded">
                  {weather.weather.toLowerCase().includes("rain")
                    ? "Caution: Keep harvested produce covered with tarpaulins to avoid moisture absorption and fungal mycotoxins."
                    : "Favorable dry sunlight: Ideal for crop drying and field harvesting operations."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
