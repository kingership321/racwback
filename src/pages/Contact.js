import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaUsers, 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaPhone, 
  FaUser 
} from 'react-icons/fa';
import emailjs from 'emailjs-com';
import './Contact.css';

const ContactPage = () => {
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // EmailJS configuration - you need to create an account at https://www.emailjs.com/
    const serviceID = 'service_88oyu0m'; // Replace with your EmailJS service ID
    const templateID = 'template_9zr4qo8'; // Replace with your EmailJS template ID
    const publicKEY = 'GmlJrldg4TUxvHgkD'; // Replace with your EmailJS user ID

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'rotaractcluboftu@gmail.com'
    }, publicKEY)
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      alert('Thank you for your message. We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      alert('Sorry, there was an error sending your message. Please try again later.');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (  
    <div className="contact-page">
      <div className="container">
      
        {/* Page Header */}
        <div className="contact-page__header text-center mb-5">
          <h1 className="heading-1 heading-underline heading-center">Contact Us</h1>
        </div>

        <div className="contact-page__content grid grid-2">  
          {/* Contact Form Section */}
          <div className="contact-page__form-section">
            <div className="contact-form card card-lg">
              <h2 className="contact-form__title heading-3 text-center">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form__form">
                <div className="contact-form__group">
                  <label htmlFor="name" className="contact-form__label">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="contact-form__input form-input"
                  />
                </div>
                
                <div className="contact-form__group">
                  <label htmlFor="email" className="contact-form__label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="contact-form__input form-input"
                  />
                </div>
                
                <div className="contact-form__group">
                  <label htmlFor="subject" className="contact-form__label">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="contact-form__input form-input"
                  />
                </div>
                
                <div className="contact-form__group">
                  <label htmlFor="message" className="contact-form__label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="contact-form__textarea form-textarea"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="contact-form__button btn btn-primary btn-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Get In Touch Section */}
          <div className="get-in-touch-section">
            <div className="get-in-touch-container contact-form card card-lg">
              <div className="get-in-touch-header text-center mb-4">
                <h2 className="contact-form__title heading-3 text-center">Stay Connected</h2>
                {/* <p className="get-in-touch-subtitle body-large text-gray">
                  For inquiries or collaborations, connect with us via these channels.
                </p> */}
              </div>
            <div contact-form card card-lg>
              <div className="contact-cards-grid grid grid-2">
                {/* President's Contact details */}
                <div className="contact-card president-contact card">
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
    </div>
  );
};

export default ContactPage;