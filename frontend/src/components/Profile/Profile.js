import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    password: ''
  });

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

  const handleEditClick = () => {
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      password: ''
    });
    setEditMode(true);
  };

  const handleEditChange = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        'http://localhost:5000/api/users/profile',
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      setEditMode(false);
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

  if (!user) {
    return (
      <div className="profile-wrapper">
        <div className="profile-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="profile-wrapper">
      <h2>Welcome, {user?.username || user?.name || 'User'}!</h2>
      {editMode ? (
        <form onSubmit={handleEditSubmit} className="profile-edit-form">
          <label>
            Name:
            <input
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={editForm.email}
              onChange={handleEditChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={editForm.password}
              onChange={handleEditChange}
              placeholder="New password"
            />
          </label>
          <label>
            Role:
            <input
              value={user.role}
              disabled
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
            <button className="profile-update-button" onClick={handleEditClick}>Update</button>
            <button className="profile-delete-button" onClick={handleDelete}>Delete</button>
            <button className="profile-logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
