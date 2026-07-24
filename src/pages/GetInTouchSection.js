import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaUsers, FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaUser } from 'react-icons/fa';
import './GetInTouchSection.css';

const GetInTouchSection = () => {
  return (
    <section className="get-in-touch-section" id="contact">
      <div className="container">
        <div className="get-in-touch-header text-center mb-5">
          <div className="get-in-touch-header__wrapper">
            <h2 className="heading-2 heading-underline heading-center">Stay Connected</h2>
            <p className="lead text-gray">
              For inquiries or collaborations, connect with us via these channels.
            </p>
          </div>
        </div>

        <div className="contact-cards-grid grid grid-4">
          {/* President's Contact details */}
          <div className="contact-card card">
            <div className="contact-card-icon">
              <FaUser />
            </div>
            <h3 className="contact-card-title heading-5">President's Contact</h3>
            <div className="contact-card-content">
              <p className="contact-name body-large font-semibold">Dipak Dhakal</p>
              <p className="contact-phone body-small">
                <FaPhone className="phone-icon" /> +977-9867996475
              </p>
            </div>
          </div>

          {/* Address Card */}
          <div className="contact-card card">
            <div className="contact-card-icon">
              <FaMapMarkerAlt />
            </div>
            <h3 className="contact-card-title heading-5">Address</h3>
            <div className="contact-card-content">
              <p className="contact-address body-small">
                Tribhuvan University<br />
                Kirtipur<br />
                Kathmandu, Nepal
              </p>
            </div>
          </div>

          {/* Club Email Card */}
          <div className="contact-card card">
            <div className="contact-card-icon">
              <FaEnvelope />
            </div>
            <h3 className="contact-card-title heading-5">Club Email</h3>
            <div className="contact-card-content">
              <a href="mailto:rotaractcluboftu@gmail.com" className="contact-email body-small">
                rotaractcluboftu@gmail.com
              </a>
            </div>
          </div>

          {/* Follow Us Card */}
          <div className="contact-card card">
            <div className="contact-card-icon">
              <FaUsers />
            </div>
            <h3 className="contact-card-title heading-5">Follow Our Club</h3>
            <div className="contact-card-content">
              <div className="social-icons">
                <a 
                  href="https://www.facebook.com/RoataractTU" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a 
                  href="https://www.instagram.com/rac_tribhuvan_university/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="https://www.linkedin.com/in/rotaract-club-of-tribhuvan-university-rac-tu-7686a4377" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section card card-lg mt-5">
          <iframe
            className="map-container"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14130.857206617418!2d85.2797058697754!3d27.675235199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1968cee7500d%3A0x260f11a4a2e7c416!2sTribhuvan%20University!5e0!3m2!1sen!2snp!4v1722345678901!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Tribhuvan University Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;