import React from 'react';
import Nav from '../Nav/Nav';
import './Common.css';

function Home() {
  return (
    <>
      <Nav />
      <div className="page-container">
        <h2>Welcome to the Criminal and Accidents Management System (CAMS)</h2>
        <p>
          This platform is built to help Sri Lanka Police manage criminal records, accident reports, investigations, and official reporting in a secure and efficient way.
        </p>

        <div className="function-section">
          <h3>🧾 1. Criminal Records Management</h3>
          <ul>
            <li>Add, edit, delete, and view criminal profiles</li>
            <li>Include photos, aliases, crimes committed, arrest history</li>
            <li>Link criminals to relevant cases or investigations</li>
          </ul>
        </div>

        <div className="function-section">
          <h3>🚧 2. Accident Reporting & Tracking</h3>
          <ul>
            <li>Log accident details: date, time, location, type, victims</li>
            <li>Attach relevant images or documents</li>
            <li>Update and track accident investigation status</li>
            <li>Search or filter by date, location, and severity</li>
          </ul>
        </div>

        <div className="function-section">
          <h3>📁 3. Case / Investigation Management</h3>
          <ul>
            <li>Create and manage case files</li>
            <li>Assign cases to investigators</li>
            <li>Track investigation progress (open, in progress, closed)</li>
            <li>Upload evidence: files, notes, and witness statements</li>
          </ul>
        </div>

        <div className="function-section">
          <h3>📊 4. Reports & Dashboard</h3>
          <ul>
            <li>Dashboard view of total criminals, accidents, and case status</li>
            <li>Generate reports in PDF or CSV (monthly, yearly)</li>
            <li>Display analytics: trends in crime and accident data</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
