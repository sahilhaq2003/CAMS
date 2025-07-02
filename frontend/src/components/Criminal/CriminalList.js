// 📁 src/components/Criminal/CriminalList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Criminal.css';

function CriminalList() {
  const [criminals, setCriminals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCriminals, setFilteredCriminals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCriminals = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/criminals', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCriminals(res.data);
        setFilteredCriminals(res.data);
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
      setFilteredCriminals((prev) => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error('Failed to delete criminal:', err);
      alert('Delete failed.');
    }
  };

  const handleSearch = () => {
    const filtered = criminals.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCriminals(filtered);
  };

  const getLastArrestDate = (arrestHistory) => {
    if (!arrestHistory || arrestHistory.length === 0) return 'No arrest history';
    const sorted = arrestHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    const last = sorted[0];
    return new Date(last.date).toLocaleDateString();
  };

  return (
    <div className="criminal-container">
      <h2>Criminal Profiles</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          className="criminal-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>

      <button className="add-btn" onClick={() => navigate('/criminals/add')}>
        Add New Criminal
      </button>

      <ul className="criminal-list">
        {filteredCriminals.length === 0 && <li>No criminals found.</li>}
        {filteredCriminals.map(criminal => (
          <li key={criminal._id} className="criminal-card">
            <img
              src={
                criminal.photo
                  ? `http://localhost:5000${criminal.photo}`
                  : '/default-user.png'
              }
              alt={criminal.name}
              className="criminal-photo"
            />
            <div className="criminal-details">
              <span className="criminal-name">{criminal.name}</span>
              <span className="arrest-date">Last Arrest: {getLastArrestDate(criminal.arrestHistory)}</span>
              <div className="criminal-actions">
                <Link to={`/criminals/view/${criminal._id}`} className="view-btn">View</Link>
                <Link to={`/criminals/edit/${criminal._id}`} className="edit-btn">Edit</Link>
                <button onClick={() => handleDelete(criminal._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CriminalList;
