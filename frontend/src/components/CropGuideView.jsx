import React, { useEffect, useState } from 'react';
import axios from 'axios';

const monthMap = {
  January: 1, February: 2, March: 3, April: 4,
  May: 5, June: 6, July: 7, August: 8,
  September: 9, October: 10, November: 11, December: 12,
};

function getMonthRange(range) {
  const [start, end] = range.split(' - ').map(m => m.trim());
  return [monthMap[start], monthMap[end]];
}

function isActiveForCurrentMonth(plantingRange, harvestingRange) {
  const currentMonth = new Date().getMonth() + 1;
  const [pStart, pEnd] = getMonthRange(plantingRange);
  const [hStart, hEnd] = getMonthRange(harvestingRange);

  const inRange = (month, start, end) => {
    return start <= end
      ? month >= start && month <= end
      : month >= start || month <= end;
  };

  return (
    inRange(currentMonth, pStart, pEnd) || inRange(currentMonth, hStart, hEnd)
  );
}

function CropGuideView() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get('/api/cropguide/all', config)
      .then(res => setCrops(res.data))
      .catch(err => console.error('Error fetching crop guide:', err));
  }, []);

  const filteredCrops = crops.filter(crop =>
    crop.crop.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📘 Crop Guide for Farmers</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search crops..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered shadow">
          <thead className="table-primary">
            <tr>
              <th>Crop</th>
              <th>Season</th>
              <th>Planting</th>
              <th>Harvesting</th>
              <th>Tip</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCrops.length > 0 ? (
              filteredCrops.map((crop, index) => {
                const active = isActiveForCurrentMonth(crop.planting, crop.harvesting);
                return (
                  <tr key={index} className={active ? 'table-success' : ''}>
                    <td>{crop.crop}</td>
                    <td>{crop.season}</td>
                    <td>{crop.planting}</td>
                    <td>{crop.harvesting}</td>
                    <td>{crop.tip}</td>
                    <td>
                      {active ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        <span className="text-muted">Inactive</span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-danger">
                  No crop guide found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CropGuideView;