import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeatherViewer() {
  const { farmId } = useParams();
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchWeather(); // First call
    const interval = setInterval(fetchWeather, 60000); // Repeat every 1 min

    return () => clearInterval(interval); // Cleanup
  }, [farmId, token, navigate]);

  const fetchWeather = () => {
    axios
      .get(`/api/weather/${farmId}`, axiosConfig)
      .then((res) => {
        setWeatherData(res.data);
        setHistory((prev) => [
          ...prev.slice(-9), // Keep max 10 entries
          {
            timestamp: new Date().toLocaleTimeString(), // Short time format
            temperature: res.data.temperature,
          },
        ]);
      })
      .catch((err) => {
        console.error("Failed to fetch weather data", err);
        setError("❌ Failed to fetch weather data. Check your access or network.");
      });
  };

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  if (!weatherData) {
    return <div className="text-center mt-4">⏳ Loading Weather Data...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>🌤️ Weather Info - {weatherData.city || "Unknown"}</h2>

      <div className="card shadow p-4 mt-3">
        <h5>{weatherData.weather} - {weatherData.description}</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">🌡️ Temperature: {weatherData.temperature}°C</li>
          <li className="list-group-item">🤒 Feels Like: {weatherData.feelsLike}°C</li>
          <li className="list-group-item">💧 Humidity: {weatherData.humidity}%</li>
          <li className="list-group-item">🌬️ Wind Speed: {weatherData.windSpeed} m/s</li>
        </ul>
      </div>

      <div className="card mt-4 shadow p-3">
        <h5>📊 Temperature Trend (Auto-refresh every 1 min)</h5>
        {history.length < 2 ? (
          <p className="text-muted">Collecting data... please wait a minute.</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis unit="°C" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default WeatherViewer;
