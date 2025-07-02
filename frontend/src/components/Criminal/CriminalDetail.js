// src/components/Criminal/CriminalDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Criminal.css';

function CriminalDetail() {
  const { id } = useParams();
  const [criminal, setCriminal] = useState(null);

  useEffect(() => {
    const fetchCriminal = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`http://localhost:5000/api/criminals/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCriminal(res.data);
      } catch (err) {
        console.error('Error fetching criminal details:', err);
      }
    };

    fetchCriminal();
  }, [id]);

  if (!criminal) {
    return <div className="criminal-container">Loading...</div>;
  }

  return (
    <div className="criminal-container">
      <h2>Criminal Details</h2>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <img
          src={criminal.photo ? `http://localhost:5000${criminal.photo}` : '/default-user.png'}
          alt="Criminal"
          className="criminal-photo"
        />
        <h3>{criminal.name}</h3>
      </div>

      <p><strong>Aliases:</strong> {criminal.aliases.join(', ') || 'None'}</p>
      <p><strong>Crimes:</strong> {criminal.crimes.join(', ') || 'None'}</p>

      <div>
        <h4>Arrest History</h4>
        {criminal.arrestHistory.length === 0 ? (
          <p>No arrest records</p>
        ) : (
          criminal.arrestHistory.map((entry, idx) => (
            <div key={idx} className="arrest-history-entry">
              <p><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {entry.location}</p>
              <p><strong>Notes:</strong> {entry.notes}</p>
            </div>
          ))
        )}
      </div>

      <p><strong>Linked Case IDs:</strong> {criminal.linkedCases.join(', ') || 'None'}</p>

      <Link to="/criminals" className="back-button">Back to List</Link>
    </div>
  );
}

export default CriminalDetail;
