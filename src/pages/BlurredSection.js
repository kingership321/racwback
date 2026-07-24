import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './BlurredSection.css';

function BlurredSection() {
  const [isVisible, setIsVisible] = useState({
    blurred: false
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(prev => ({...prev, blurred: true})), 2100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="blurred-section section">
      <div className={`blurred-section__content ${isVisible.blurred ? 'blurred-section__content--visible' : ''}`}>
        <div className="blurred-section__background"></div>
        <div className="container">
          <div className="blurred-section__card card card-lg">
            <div className="blurred-section__text">
              <h3 className="blurred-section__title">
                Welcome to the Rotaract Club of Tribhuvan University (RACTU)
              </h3>
              <p className="blurred-section__description body-large">
                We are a university-based, non-political club that brings together students from over 40 different departments of the Central Campus, Tribhuvan University. United by the spirit of fellowship and service, we work to develop ourselves as responsible leaders while promoting collaboration, organizing professional development opportunities, and carrying out impactful social initiatives to benefit both university students and the wider community.
              </p>
            </div>
            <Link to="/about" className="blurred-section__button btn1 btn1-primary ">
              <span className="blurred-section__button-text">About RACTU</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlurredSection;