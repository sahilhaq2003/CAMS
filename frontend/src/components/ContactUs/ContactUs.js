import React from 'react';

import './ContactUs.css';

function ContactUs() {
  return (
    <>
     

      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>

        <p className="contact-paragraph">
          For support, feedback, or inquiries related to the Criminal and Accidents Management System (CAMS), please use the contact information below.
        </p>

        <ul className="contact-info-list">
          <li><strong>📧 Email:</strong> support@slpolice.lk</li>
          <li><strong>📞 Phone:</strong> +94 11 123 4567</li>
          <li><strong>🏢 Address:</strong> Police Headquarters, Colombo 01, Sri Lanka</li>
        </ul>

        <p className="contact-note">
          Our technical support team is available Monday to Friday from 9:00 AM to 5:00 PM.
        </p>
      </div>
    </>
  );
}

export default ContactUs;
