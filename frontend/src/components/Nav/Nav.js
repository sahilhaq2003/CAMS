// 📁 src/components/Nav.js
import React from 'react';
import { Link } from 'react-router-dom';
//import '../Home/Common.css'; // Ensure this includes the updated CSS below
import './Nav.css';

function Nav({ isAuthenticated, user }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">🔒 CAMS</h1>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>

          {isAuthenticated && (user?.role === 'Police Officer' || user?.role === 'Investigator') && (
            <Link to="/criminals" className="nav-link">Criminals</Link>
          )}
        </div>
      </div>

      <div className="navbar-auth">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="nav-auth-btn">Login</Link>
            <Link to="/register" className="nav-auth-btn nav-auth-btn-register">Register</Link>
          </>
        ) : (
          <Link to="/profile" className="nav-profile-icon" title="Profile">
            <img
              src={
                user?.profileImage
                  ? user.profileImage.startsWith('http')
                    ? user.profileImage
                    : `http://localhost:5000${user.profileImage}`
                  : '/default-user.png'
              }
              alt="Profile"
              className="nav-profile-photo"
            />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;
