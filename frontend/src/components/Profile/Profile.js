import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', password: '' });
  const [selectedImage, setSelectedImage] = useState(null);

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
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const updates = {
        name: editForm.name,
        email: editForm.email
      };
      if (editForm.password) updates.password = editForm.password;

      const res = await axios.put(
        'http://localhost:5000/api/users/profile',
        updates,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        const imageRes = await axios.put(
          'http://localhost:5000/api/users/profile-image',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        setUser(imageRes.data);
      } else {
        setUser(res.data);
      }

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
    return <div className="profile-wrapper"><div>Loading...</div></div>;
  }

  return (
    <div className="profile-wrapper">
      <img
        src={
          user?.profileImage
            ? user.profileImage.startsWith('http')
              ? user.profileImage
              : `http://localhost:5000${user.profileImage}`
            : '/default-user.png'
        }
        alt="Profile"
        className="profile-image"
      />
      <h2>Welcome, {user.name}!</h2>

      {editMode ? (
        <form onSubmit={handleEditSubmit} className="profile-edit-form">
          <label>
            Name:
            <input name="name" value={editForm.name} onChange={handleEditChange} required />
          </label>
          <label>
            Email:
            <input name="email" type="email" value={editForm.email} onChange={handleEditChange} required />
          </label>
          <label>
            Password:
            <input name="password" type="password" value={editForm.password} onChange={handleEditChange} placeholder="New password" />
          </label>
          <div className="image-upload">
            <label>
              Upload Profile Image:
              <input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />
            </label>
          </div>
          <label>
            Role:
            <input value={user.role} disabled />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <div className="profile-actions">
            <button onClick={handleEditClick}>Update</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
