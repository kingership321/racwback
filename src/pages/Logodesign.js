import React from 'react';
import './Logodesign.css';
import logoConcept from '../assets/logo_design.png'; // Update with your actual image path

const LogoConcept = () => {
  return (
    <section className="logo-concept section-lg">
      <div className="container">
        {/* Section Header */}
        <div className="logo-concept__header text-center mb-5">
          <h2 className="heading-2 heading-underline heading-center">Logo Design Concept</h2>
          <p className="lead text-gray max-w-3xl mx-auto">
            A symbol of service, wisdom, and community identity
          </p>
        </div>

        <div className="logo-concept__content">
          {/* Logo Concept Image */}
          <div className="logo-concept__image-container">
            <img 
              src={logoConcept} 
              alt="Rotaract Club of Tribhuvan University Logo Design Concept"
              className="logo-concept__image img-responsive img-rounded img-shadow"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="charter-president__person-infol text-center">
              <p className="charter-president__positionl">Logo Designed by Rtr. Er. Riwaj Bhurtel</p>
            </div>
          </div>

          {/* Logo Details */}
          <div className="logo-concept__details">
            {/* Distinct Features */}
            <div className="logo-concept__features">
              <h3 className="logo-concept__features-title heading-3">Distinct Features of the Logo</h3>
              
              <div className="logo-concept__features-list">
                <div className="logo-concept__feature-item">
                  <div className="logo-concept__feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"/>
                    </svg>
                  </div>
                  <div className="logo-concept__feature-content">
                    <h4 className="logo-concept__feature-heading heading-5">Rotaract Wheel Base</h4>
                    <p className="logo-concept__feature-description body-small">
                      Represents service, unity, and the global Rotaract identity.
                    </p>
                  </div>
                </div>

                <div className="logo-concept__feature-item">
                  <div className="logo-concept__feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22-11.4 41.2-28.8 52.3c-5.3 3.3-8.6 9-8.6 15.1v21.9c0 11.8-9.6 21.4-21.4 21.4c-4 0-7.8-1.1-11.1-3l-39.9-23.5c-13.3-7.8-21.5-22-21.5-37.4c0-24.2 19.6-43.8 43.8-43.8H304c8.8 0 16-7.2 16-16s-7.2-16-16-16H280c-17.7 0-32-14.3-32-32s14.3-32 32-32h56c8.8 0 16-7.2 16-16s-7.2-16-16-16H280c-35.3 0-64 28.7-64 64c0 20.5 9.7 38.8 24.7 50.5c5.8 4.5 9.3 11.5 9.3 19.1v33.4c0 27.2-21.5 49.3-48.2 50.4c-30 1.2-53.8-23.1-53.8-53.3V288c0-35.3 28.7-64 64-64h16c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-17.7 0-32-14.3-32-32s14.3-32 32-32h40 24c8.8 0 16-7.2 16-16s-7.2-16-16-16H216c-23.7 0-44.8 15-52.8 37.3l-1.3 3.8c-4.4 12.8-17.5 20-30.3 15.7s-20-17.5-15.7-30.3l1.3-3.8z"/>
                    </svg>
                  </div>
                  <div className="logo-concept__feature-content">
                    <h4 className="logo-concept__feature-heading heading-5">Lotus Blend with TU Emblem</h4>
                    <p className="logo-concept__feature-description body-small">
                      Symbolizes wisdom and the essence of Tribhuvan University.
                    </p>
                  </div>
                </div>

                <div className="logo-concept__feature-item">
                  <div className="logo-concept__feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                    </svg>
                  </div>
                  <div className="logo-concept__feature-content">
                    <h4 className="logo-concept__feature-heading heading-5">Rotary Royal Blue</h4>
                    <p className="logo-concept__feature-description body-small">
                      Reflects Rotary's official branding and trust.
                    </p>
                  </div>
                </div>

                <div className="logo-concept__feature-item">
                  <div className="logo-concept__feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                    </svg>
                  </div>
                  <div className="logo-concept__feature-content">
                    <h4 className="logo-concept__feature-heading heading-5">Rotaract Pink Highlights</h4>
                    <p className="logo-concept__feature-description body-small">
                      Adds vibrance and youthfulness tied to Rotaract spirit.
                    </p>
                  </div>
                </div>

                <div className="logo-concept__feature-item">
                  <div className="logo-concept__feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                    </svg>
                  </div>
                  <div className="logo-concept__feature-content">
                    <h4 className="logo-concept__feature-heading heading-5">Circular Text Layout</h4>
                    <p className="logo-concept__feature-description body-small">
                      Encircles the logo to signify inclusiveness and community.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoConcept;