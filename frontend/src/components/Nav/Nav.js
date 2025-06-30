import React from 'react';
import { Link } from 'react-router-dom';
import '../Home/Common.css';

function Nav() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">CAMS</h1>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
      </div>
      <div className="navbar-auth">
        <Link to="/login" className="nav-auth-btn">Login</Link>
        <Link to="/register" className="nav-auth-btn nav-auth-btn-register">Register</Link>
      </div>
    </nav>
  );
}

export default Nav;