import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>&copy; 2025 Rotaract Club of Tribhuvan University. All rights reserved.</p>
        <p className="follow">Follow us on:
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a> |
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"> LinkedIn</a> |
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
        </p>
        <h3 className="developer-credit">Developed By Rtr. Keshav Baniya</h3>
        <p className="dev-designation">IT OFFICER, RY 25/26, Rotaract Club of Tribhuvan University</p>
      </div>
    </footer>
  );
}

export default Footer;