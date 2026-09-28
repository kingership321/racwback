import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { defaultPrograms, defaultUpcomingPrograms } from '../data/defaultData';
import './Programs.css';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [upcomingPrograms, setUpcomingPrograms] = useState([]);
  const [activeProgram, setActiveProgram] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programsRes, upcomingRes] = await Promise.all([
          api.get('/programs').catch(err => { console.warn('Could not fetch /programs:', err); return null; }),
          api.get('/upcoming-programs').catch(err => { console.warn('Could not fetch /upcoming-programs:', err); return null; }),
        ]);

        let programsArray = [];
        if (Array.isArray(programsRes?.data)) {
          programsArray = programsRes.data;
        } else if (Array.isArray(programsRes?.data?.programs)) {
          programsArray = programsRes.data.programs;
        } else if (Array.isArray(programsRes?.data?.data)) {
          programsArray = programsRes.data.data;
        }

        let upcomingArray = [];
        if (Array.isArray(upcomingRes?.data)) {
          upcomingArray = upcomingRes.data;
        } else if (Array.isArray(upcomingRes?.data?.upcoming_programs)) {
          upcomingArray = upcomingRes.data.upcoming_programs;
        } else if (Array.isArray(upcomingRes?.data?.data)) {
          upcomingArray = upcomingRes.data.data;
        }

        setPrograms(programsArray.length > 0 ? programsArray : defaultPrograms);
        setUpcomingPrograms(upcomingArray.length > 0 ? upcomingArray : defaultUpcomingPrograms);
      } catch (error) {
        console.error('Error fetching programs, using defaults:', error);
        setPrograms(defaultPrograms);
        setUpcomingPrograms(defaultUpcomingPrograms);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const displayedPrograms = programs.length > 0 ? programs : defaultPrograms;
  const displayedUpcoming = upcomingPrograms.length > 0 ? upcomingPrograms : defaultUpcomingPrograms;

  if (loading && programs.length === 0) {
    return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Loading programs...</div>;
  }

  const currentProgram = displayedPrograms[activeProgram] || displayedPrograms[0] || defaultPrograms[0];

  const cleanImageSrc = (src) => {
    if (!src) return '';
    if (typeof src !== 'string') return src;
    if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('blob:') || src.startsWith('/static/')) return src;
    if (!src.startsWith('/')) return '/' + src;
    return src;
  };

  const fallbackProg = defaultPrograms.find(p => p.id === currentProgram?.id || p.title === currentProgram?.title) || defaultPrograms[activeProgram % defaultPrograms.length];
  const fallbackImages = (fallbackProg?.images || []).map(cleanImageSrc);

  // Normalize images to array of string URLs
  const rawImages = currentProgram?.images || currentProgram?.program_images || [];
  const normalizedImages = rawImages.map(img => {
    if (typeof img === 'string') return cleanImageSrc(img);
    if (img && img.image_url) return cleanImageSrc(img.image_url);
    return '';
  }).filter(Boolean);

  const resolvedImages = normalizedImages.length > 0 ? normalizedImages : fallbackImages;
  const images = resolvedImages.length > 0 ? resolvedImages.slice(0, 10) : [];

  const nextProgram = () => {
    setActiveProgram((prev) => (prev + 1) % displayedPrograms.length);
    setActiveImageIndex(0);
  };

  const prevProgram = () => {
    setActiveProgram((prev) => (prev - 1 + displayedPrograms.length) % displayedPrograms.length);
    setActiveImageIndex(0);
  };

  const nextImage = () => {
    if (images.length === 0) return;
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length === 0) return;
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="programs-page">
      <div className="container">
        <div className="programs-page__header text-center mb-5">
          <h1 className="heading-1 heading-underline heading-center">Our Programs</h1>
        </div>

        <section className="programs-page__intro text-center mb-5">
          <p className="lead text-gray max-w-3xl mx-auto">
            The Rotaract Club of Tribhuvan University organizes impactful programs and activities
            focused on community service, leadership development, and fellowship. Explore our recent initiatives below.
          </p>
        </section>

        <div className="programs-carousel card card-lg">
          <div className="programs-carousel__navigation">
            <button className="programs-carousel__nav-btn btn1 btn1-primary" onClick={prevProgram} aria-label="Previous Program">
              <i className="fas fa-chevron-left"></i>
            </button>

            <div className="programs-carousel__indicators">
              {displayedPrograms.map((_, index) => (
                <button
                  key={index}
                  className={`programs-carousel__indicator ${index === activeProgram ? 'programs-carousel__indicator--active' : ''}`}
                  onClick={() => { setActiveProgram(index); setActiveImageIndex(0); }}
                  aria-label={`Go to program ${index + 1}`}
                />
              ))}
            </div>

            <button className="programs-carousel__nav-btn btn1 btn1-primary" onClick={nextProgram} aria-label="Next Program">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <div className="programs-carousel__content grid grid-2">
            <div className="programs-carousel__info">
              <h2 className="programs-carousel__title heading-3">{currentProgram.title}</h2>
              <div className="programs-carousel__details">
                {currentProgram.date && (
                  <div className="programs-carousel__detail-item">
                    <i className="fas fa-calendar-alt"></i>
                    <span className="body-large">{currentProgram.date}</span>
                  </div>
                )}
                {currentProgram.place && (
                  <div className="programs-carousel__detail-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span className="body-large">{currentProgram.place}</span>
                  </div>
                )}
                {currentProgram.coorganizer && (
                  <div className="programs-carousel__detail-item">
                    <i className="fas fa-handshake"></i>
                    <span className="body-large">Co-organized with: {currentProgram.coorganizer}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="programs-carousel__gallery">
              {images.length > 0 ? (
                <>
                  <div className="programs-carousel__gallery-main">
                    <button className="programs-carousel__gallery-nav-btn btn-xl" onClick={prevImage} aria-label="Previous Image">
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <img
                      src={cleanImageSrc(images[activeImageIndex] || images[0])}
                      alt={`${currentProgram.title} - Image ${activeImageIndex + 1}`}
                      className="programs-carousel__gallery-image img-responsive img-rounded"
                      onError={(e) => {
                        const fb = fallbackImages[activeImageIndex] || fallbackImages[0];
                        if (fb && e.target.src !== fb) {
                          e.target.src = fb;
                        }
                      }}
                    />
                    <button className="programs-carousel__gallery-nav-btn btn-lg" onClick={nextImage} aria-label="Next Image">
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                  <div className="programs-carousel__gallery-thumbnails">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={cleanImageSrc(image)}
                        alt={`Thumbnail ${index + 1}`}
                        className={`programs-carousel__thumbnail img-responsive img-rounded ${index === activeImageIndex ? 'programs-carousel__thumbnail--active' : ''}`}
                        onClick={() => setActiveImageIndex(index)}
                        onError={(e) => {
                          const fb = fallbackImages[index] || fallbackImages[0];
                          if (fb && e.target.src !== fb) {
                            e.target.src = fb;
                          }
                        }}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="programs-carousel__gallery-main">
                  <p>No images for this program.</p>
                </div>
              )}
            </div>
          </div>
        </div>



        {/* Upcoming Programs section */}
        <section className="upcoming-programs mt-5">
          <div className="upcoming-programs__header text-center mb-5">
            <h2 className="heading-2 heading-underline heading-center">Upcoming Programs</h2>
          </div>
          {displayedUpcoming.length > 0 ? (
            <div className="upcoming-programs__list grid grid-3">
              {displayedUpcoming.map((program, idx) => (
                <div key={program.id || idx} className="upcoming-programs__item card-lg">
                  <h3 className="upcoming-programs__item-title heading-5">{program.title}</h3>
                  <p className="upcoming-programs__item-description body-small">
                    {program.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--dark-gray)' }}>
              <p className="body-large">No upcoming programs at this time.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Programs;