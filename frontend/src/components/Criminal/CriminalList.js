// src/components/Criminal/CriminalList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Criminal.css';

function CriminalList() {
  const [criminals, setCriminals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCriminals = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/criminals', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCriminals(res.data);
      } catch (err) {
        console.error('Failed to fetch criminals:', err);
      }
    };
    fetchCriminals();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this criminal?')) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/criminals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCriminals((prev) => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error('Failed to delete criminal:', err);
      alert('Delete failed.');
    }
  };

  return (
    <div className="criminal-container">
      <h2>Criminal Profiles</h2>
      <button className="add-btn" onClick={() => navigate('/criminals/add')}>Add New Criminal</button>

      <ul className="criminal-list">
        {criminals.length === 0 && <li>No criminals found.</li>}
        {criminals.map(criminal => (
          <li key={criminal._id}>
            <span className="criminal-name">{criminal.name}</span>
            <div className="criminal-actions">
              <Link to={`/criminals/view/${criminal._id}`} className="view-btn">View</Link>
              <Link to={`/criminals/edit/${criminal._id}`} className="edit-btn">Edit</Link> {/* Update */}
              <button onClick={() => handleDelete(criminal._id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CriminalList;
