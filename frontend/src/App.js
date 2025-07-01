import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import About from './components/About/About';
import ContactUs from './components/ContactUs/ContactUs';
import Nav from './components/Nav/Nav';
import axios from 'axios';

// Force logout on first visit only
if (!localStorage.getItem('firstVisitDone')) {
  localStorage.removeItem('token');
  localStorage.setItem('firstVisitDone', 'yes');
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    if (token) {
      axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.error('Failed to fetch user profile:', err);
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Nav isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/" replace />
              : <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated
              ? <Navigate to="/" replace />
              : <Register setIsAuthenticated={setIsAuthenticated} />
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated
              ? <Profile />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
