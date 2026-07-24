
import './HeroSection.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';  
import { Link } from 'react-router-dom';
// Import images from assets
import chart1 from '../assets/ProjectCharter/chart1.jpg';

   
function HeroSection() {

    const [isVisible, setIsVisible] = useState({
        hero: false
          });  
      useEffect(() => {
        // Simulate scroll animations with delays
        const timer1 = setTimeout(() => setIsVisible(prev => ({...prev, hero: true})), 100);
            return () => {
      clearTimeout(timer1);
          };
  }, []);

    return (
      <section className={`hero-banner ${isVisible.hero ? 'visible' : ''}`}>
        <div className="hero-background">
          <img src={chart1} alt="Rotaract Club Hero" className="hero-image" />
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title-welcome">Welcome To</h1>
              <h1 className="hero-title">The Rotaract Club of Tribhuvan University</h1>
              <p className="hero-subtitle">Fellowship Through Service</p>
              <div className="hero-buttons">
                <Link to="/programs" className="btn1 btn1-primary">Our Programs</Link>
                <Link to="/contact" className="btn1 btn1-secondary">Join Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

   );
}

export default HeroSection;