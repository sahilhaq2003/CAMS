// 📁 src/App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import About from './components/About/About';
import ContactUs from './components/ContactUs/ContactUs';
import CriminalList from './components/Criminal/CriminalList';
import CriminalForm from './components/Criminal/CriminalForm';
import CriminalDetail from './components/Criminal/CriminalDetail';
import Nav from './components/Nav/Nav';
import axios from 'axios';

function App() {
  // Optional: Clear token on first load (can be removed if undesired)
  useEffect(() => {
    if (!localStorage.getItem('firstVisitDone')) {
      localStorage.removeItem('token');
      localStorage.setItem('firstVisitDone', 'yes');
    }
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      return;
    }

    axios.get('http://localhost:5000/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setUser(res.data);
        setIsAuthenticated(true);
      })
      .catch(err => {
        console.error('Failed to fetch user profile:', err);
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      });
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
          element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" replace />}
        />

        <Route
          path="/register"
          element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" replace />}
        />

        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />}
        />

        {/* ✅ Criminal Management */}
        <Route
          path="/criminals"
          element={isAuthenticated ? <CriminalList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/criminals/add"
          element={isAuthenticated ? <CriminalForm /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/criminals/edit/:id"
          element={isAuthenticated ? <CriminalForm /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/criminals/view/:id"
          element={isAuthenticated ? <CriminalDetail /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
