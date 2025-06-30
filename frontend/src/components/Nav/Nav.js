import React from 'react';
import { Link } from 'react-router-dom';
import '../Home/Common.css';

function Nav({ isAuthenticated }) {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">CAMS</h1>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
      </div>
      <div className="navbar-auth">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="nav-auth-btn">Login</Link>
            <Link to="/register" className="nav-auth-btn nav-auth-btn-register">Register</Link>
          </>
        ) : (
          <Link to="/profile" className="nav-profile-icon" title="Profile">
            <span role="img" aria-label="profile" style={{ fontSize: '1.7rem' }}>👤</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;