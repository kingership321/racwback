import React from 'react';
import { FaPhone, FaEnvelope, FaFacebook, FaLinkedin, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import './PresidentSection.css';
import presidentImage from '../assets/dipesh.png';
import signatureImage from '../assets/dipak_sign.png';

const PresidentSection = () => {
  const presidentData = {
    name: "Rtr. Dipesh Rai",
    role: "Club President RY 2026-2027",
    image: presidentImage,
    signature: signatureImage,
    messages: [
      "It is a tremendous honor and privilege to serve as the President of the Rotaract Club of Tribhuvan University for Rotary Year 2026–27.",
      "This club is more than an organization, it is a community of passionate young leaders committed to learning, serving, and creating meaningful change. As President, my foremost priority is the professional and personal growth of every member. I firmly believe that when we invest in ourselves, the positive impact we create in our communities becomes a natural outcome.",
      "I want every member to know that this is our club. Leadership is not centered on one individual; it is shared among all of us. I see myself not as someone who leads from above, but as someone who works alongside each member. Together, we will foster a culture where every voice is heard, every idea is valued, and every decision is made collectively.",
      "My commitment to the Rotaract movement is unwavering, and I promise to dedicate my efforts to ensuring that this Rotary Year is filled with opportunities for learning, collaboration, friendship, and impactful service.",
      "Let us embark on this journey together not just as club members, but as a united team driven by a shared vision of excellence. I am excited for what we will accomplish together and look forward to making Rotary Year 2026–27 a truly memorable one."
    ],
    contact: {
      phone: "+977 9762416063",
      email: "rtrdipeshraipresident@gmail.com ",
      facebook: "rai1dipesh",
      linkedin: "dipesh-rai-757b052b2/"
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
    e.target.onerror = null;
  };

  return (
    <section className="president-section section-lg">
      <div className="container">
        
        {/* Section Header */}
        <div className="president-section__header text-center mb-5">
          <h2 className="heading-2 heading-underline heading-center">
            Meet Our President
          </h2>
          <p className="lead text-gray">
            Leading with Vision and Dedication
          </p>
        </div>

        {/* President Card */}
        <div className="president-section__card card card-lg">
          
          {/* President Image */}
          <div className="president-section__image-container">
            <img 
              src={presidentData.image} 
              alt={presidentData.name}
              className="president-section__image img-circle img-border img-shadow img-hover"
              onError={handleImageError}
            />
          </div>

          {/* President Details */}
          <div className="president-section__details">
            <div className="text-center mb-4">
              <h3 className="president-section__name heading-3">
                {presidentData.name}
              </h3>
              <div className="president-section__role">
                {presidentData.role}
              </div>
            </div>
            
            {/* President Message */}
            <div className="president-section__message">
              <div className="president-section__quote-icon">
                <FaQuoteLeft />
              </div>
              {presidentData.messages.map((message, index) => (
                <p 
                  key={index} 
                  className="president-section__message-text body-large"
                >
                  {message}
                </p>
              ))}
              <div className="president-section__quote-icon president-section__quote-icon--end">
                <FaQuoteRight />
              </div>
            </div>

            {/* Contact Information */}
            <div className="president-section__contact">
              <h4 className="president-section__contact-title heading-3 text-center">
                Get In Touch
              </h4>
              <div className="president-section__contact-details grid grid-2">
                <ContactItem 
                  icon={<FaPhone />}
                  label="Phone"
                  value={presidentData.contact.phone}
                  href={`tel:${presidentData.contact.phone}`}
                />
                <ContactItem 
                  icon={<FaEnvelope />}
                  label="Email"
                  value={presidentData.contact.email}
                  href={`mailto:${presidentData.contact.email}`}
                />
                <ContactItem 
                  icon={<FaFacebook />}
                  label="Facebook"
                  value={`@${presidentData.contact.facebook}`}
                  href={`https://facebook.com/${presidentData.contact.facebook}`}
                  external
                />
                <ContactItem 
                  icon={<FaLinkedin />}
                  label="LinkedIn"
                  value={presidentData.contact.linkedin}
                  href={`https://linkedin.com/in/${presidentData.contact.linkedin}`}
                  external
                />
              </div>
            </div>

            {/* Signature Section */}
            <div className="president-section__signature text-center">
              {/* <div className="president-section__signature-image">
                <img 
                  src={presidentData.signature} 
                  alt={`Signature of ${presidentData.name}`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div> */}
              <p className="president-section__signature-name body-large font-semibold">
                {presidentData.name}
              </p>
              <p className="president-section__signature-role body-small text-gray">
                President, RY 26/27
              </p>
              <p className="president-section__signature-organization body-small text-gray">
                Rotaract Club of Tribhuvan University
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Item Sub-component
const ContactItem = ({ icon, label, value, href, external = false }) => (
  <div className="president-section__contact-item">
    <div className="president-section__contact-icon">
      {icon}
    </div>
    <div className="president-section__contact-info">
      <span className="president-section__contact-label">
        {label}
      </span>
      <a 
        href={href}
        className="president-section__contact-value"
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {value}
      </a>
    </div>
  </div>
);

export default PresidentSection;