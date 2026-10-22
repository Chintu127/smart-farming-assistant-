import React, { useState } from 'react';
import axios from 'axios';

const AdminNotificationManager = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setStatus('You are not authorized. Please login as admin.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8080/api/notifications/send',
        { title, message , role:"FARMER"},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatus('✅ Notification sent successfully.');
      setTitle('');
      setMessage('');
    } catch (error) {
      console.error(error);
      if (error.response?.status === 403) {
        setStatus('❌ You are not authorized to send notifications.');
      } else {
        setStatus('❌ Failed to send notification.');
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Send Notification to All Farmers</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            className="form-control"
            rows="4"
            value={message}
            required
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Send Notification
        </button>
      </form>

      {status && <div className="alert alert-info mt-4">{status}</div>}
    </div>
  );
};

export default  AdminNotificationManager;