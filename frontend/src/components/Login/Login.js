import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setIsAuthenticated }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', form);
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      navigate('/'); // Redirect to home after login
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <label htmlFor="email" className="login-label">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          required
          className="login-input"
        />

        <label htmlFor="password" className="login-label">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          required
          className="login-input"
        />

        <button type="submit" className="login-button">Login</button>

        <div className="login-register">
          <span>Not registered? </span>
          <button type="button" className="login-register-button" onClick={() => navigate('/register')}>
            Register here
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;