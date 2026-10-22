import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FarmerNotificationViewer = () => {
  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8080/api/notifications/farmer', {
          headers: {
            Authorization:` Bearer ${token}`,
          },
        });
        setNotifications(response.data);
      } catch (error) {
        console.error(error);
        setStatus('❌ Failed to fetch notifications.');
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📢 Notifications</h2>
      {status && <div className="alert alert-danger">{status}</div>}
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul className="list-group">
          {notifications.map((note) => (
            <li key={note.id} className="list-group-item">
              <h5>{note.title}</h5>
              <p>{note.message}</p>
              <small className="text-muted">
                {new Date(note.timestamp).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FarmerNotificationViewer;