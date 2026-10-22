import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [chartType, setChartType] = useState('bar');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/admin/dashboard/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
      navigate('/unauthorized'); // if not admin
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const chartData = [
    { name: 'Farmers', value: stats.totalFarmers || 0 },
    { name: 'Experts', value: stats.totalExperts || 0 },
    { name: 'Admins', value: stats.totalAdmins || 0 },
    { name: 'Farms', value: stats.totalFarms || 0 },
    { name: 'Crops', value: stats.totalCrops || 0 },
    { name: 'Soils', value: stats.totalSoils || 0 },
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('SmartFarm Admin Analytics Report', 10, 10);
    chartData.forEach((item, i) => {
      doc.text(`${item.name}: ${item.value}`, 10, 20 + i * 10);
    });
    doc.save('admin-stats.pdf');
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(chartData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Admin Stats');
    XLSX.writeFile(wb, 'admin-stats.xlsx');
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">📊 Admin Analytics Dashboard</h2>

      <div className="d-flex justify-content-center mb-3">
        <Button variant="primary" className="me-2" onClick={() => setChartType('bar')}>
          Bar Chart
        </Button>
        <Button variant="secondary" onClick={() => setChartType('pie')}>
          Pie Chart
        </Button>
      </div>

      <div style={{ width: '100%', height: 400 }}>
        {chartType === 'bar' ? (
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="text-center mt-4">
        <Button variant="success" className="me-2" onClick={downloadPDF}>📄 Export PDF</Button>
        <Button variant="warning" onClick={downloadExcel}>📁 Export Excel</Button>
      </div>
    </div>
  );
};

export default AdminDashboard;