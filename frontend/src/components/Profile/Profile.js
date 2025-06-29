import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const newUsername = prompt('Enter new username:', user.username);
    if (!newUsername || newUsername === user.username) return;
    try {
      const res = await axios.put(
        'http://localhost:5000/api/users/profile',
        { username: newUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      alert('Profile updated!');
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    try {
      await axios.delete('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return user ? (
    <div className="profile-wrapper">
      <h2>Welcome, {user?.username || user?.name || 'User'}!</h2>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
        <button className="profile-update-button" onClick={handleUpdate}>Update</button>
        <button className="profile-delete-button" onClick={handleDelete}>Delete</button>
        <button className="profile-logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  ) : (
    <div className="profile-wrapper">
      <div className="profile-loading">Loading...</div>
    </div>
  );
}

export default Profile;
