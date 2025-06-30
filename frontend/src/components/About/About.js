import React from 'react';
import Navbar from '../Nav/Nav';
import './About.css';

function About() {
  return (
    <>
      <Navbar />

      <div className="about-container">
        <h2 className="about-title">About CAMS</h2>

        <p className="about-paragraph">
          The <strong>Criminal and Accidents Management System (CAMS)</strong> is a centralized web-based solution designed to support the Sri Lanka Police in managing crime and accident-related data with high security, efficiency, and accuracy.
        </p>

        <p className="about-paragraph">
          CAMS brings together all the key operational areas of law enforcement — including criminal profiling, accident reporting, case investigations, and detailed reporting — into one unified platform. The system helps officers track cases, access critical data, and collaborate more effectively across departments.
        </p>

        <p className="about-paragraph">
          This platform ensures greater transparency, data accessibility, and responsiveness, improving how the police serve and protect the public.
        </p>

        <p className="about-paragraph">
          Developed with a focus on usability, security, and professional standards, CAMS is a vital tool for modernizing police workflows and upholding justice.
        </p>
      </div>
    </>
  );
}

export default About;
