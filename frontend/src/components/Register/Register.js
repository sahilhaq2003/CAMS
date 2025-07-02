import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register(props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Reporter'
  });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', form);
      alert('Registered successfully');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-wrapper">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register</h2>

        <label htmlFor="name" className="register-label">Name</label>
        <input
          name="name"
          id="name"
          onChange={handleChange}
          placeholder="Name"
          required
          className="register-input"
        />

        <label htmlFor="email" className="register-label">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          required
          className="register-input"
        />

        <label htmlFor="password" className="register-label">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
          className="register-input"
        />

        <label htmlFor="role" className="register-label">Role</label>
        <select
          name="role"
          id="role"
          onChange={handleChange}
          className="register-select"
        >
          <option>Admin</option>
          <option>Police Officer</option>
          <option>Investigator</option>
          <option>Reporter</option>
        </select>

        <button type="submit" className="register-button">Register</button>
        <button
          type="button"
          className="register-login-button"
          style={{ marginTop: '1rem', width: '100%' }}
          onClick={() => navigate('/login')}
        >
          Go to Login
        </button>
      </form>
    </div>
  );
}

export default Register;