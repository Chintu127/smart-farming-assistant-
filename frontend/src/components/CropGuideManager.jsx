import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CropGuideManager() {
    const [crops, setCrops] = useState([]);
    const [form, setForm] = useState({
        crop: '',
        season: '',
        planting: '',
        harvesting: '',
        tip: '',
    });
    const [editingId, setEditingId] = useState(null);
    const token = localStorage.getItem('token');

           const config = {
            headers : {
                Authorization : `Bearer ${token}`
            },
           };

           useEffect(()=>{
            fetchCrops();
           }, []);

    const fetchCrops = () => {
        axios.get('/api/cropguide/all', config)
            .then(res => setCrops(res.data))
            .catch(err => console.error('Error fetching crops:', err));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            axios.put(`/api/cropguide/update/${editingId}`, form, config)
            .then(() => {
                fetchCrops();
                setForm({
                    crop: '',
                    season: '',
                    planting: '',
                    harvesting: '',
                    tip: ''
                });
                setEditingId(null);
            })
            .catch(err => console.error('Error updating crop:', err));
        }
        else {
            axios.post('/api/cropguide/add', form, config)
            .then(() => {
                fetchCrops();
                setForm({
                    crop: '',
                    season: '',
                    planting: '',
                    harvesting: '', 
                    tip: ''
                });
            })
            .catch(err => console.error('Error adding crop:', err));
        }
    };

    const handleEdit = (crop) => {
        setForm({ ...crop });
        setEditingId(crop.id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this crop?')) {
            axios.delete(`/api/cropguide/delete/${id}`, config)
            .then(() => fetchCrops())
            .catch(err => console.error('Error deleting crop:', err));
        }
    };

    return (
        <div className="container mt-5">
            <h2>Crop Guide Manager (Admin)</h2>

            <form onSubmit={handleSubmit} className="card p-4 shadow mb-4">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label>Crop Name:</label>
                        <input name="crop" value={form.crop} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Season:</label>
                        <input name="season" value={form.season} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Planting Period:</label>
                        <input name="planting" value={form.planting} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Harvesting Period:</label>
                        <input name="harvesting" value={form.harvesting} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="col-12 mb-3">
                        <label>Tip:</label>
                        <textarea name="tip" value={form.tip} onChange={handleChange} className="form-control" rows={2} required />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    {editingId ? 'Update Crop Guide' : 'Add Crop Guide'}
                </button>
            </form>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-success">
                        <tr>
                            <th>Crop</th>
                            <th>Season</th>
                            <th>Planting</th>
                            <th>Harvesting</th>
                            <th>Tip</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crops.map((crop) => (
                            <tr key={crop.id}>
                                <td>{crop.crop}</td>
                                <td>{crop.season}</td>
                                <td>{crop.planting}</td>
                                <td>{crop.harvesting}</td>
                                <td>{crop.tip}</td>
                                <td>
                                    <button onClick={() => handleEdit(crop)} className="btn btn-sm btn-warning me-2">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(crop.id)} className="btn btn-sm btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {crops.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center text-muted">
                                    No crop guide entries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
}


export default CropGuideManager;