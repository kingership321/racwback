import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { defaultGalleryPrograms, defaultPrograms } from '../data/defaultData';
import './ImageGallery.css';

const ImageGallery = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  const cleanImageSrc = (src) => {
    if (!src) return '';
    if (typeof src !== 'string') return src;
    if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('blob:') || src.startsWith('/static/')) return src;
    if (!src.startsWith('/')) return '/' + src;
    return src;
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await api.get('/programs');
        const data = Array.isArray(res?.data) ? res.data : [];
        if (data.length > 0) {
          // Normalize to folder objects
          const formatted = data.map((prog, index) => {
            const rawImages = prog.images || prog.program_images || [];
            const imgs = rawImages.map(img => {
              if (typeof img === 'string') return cleanImageSrc(img);
              if (img && img.image_url) return cleanImageSrc(img.image_url);
              return '';
            }).filter(Boolean);

            const fallbackFolder = defaultGalleryPrograms.find(p => p.name === (prog.title || prog.name) || p.id === prog.id);
            const fallbackProg = defaultPrograms.find(p => p.title === (prog.title || prog.name) || p.id === prog.id);
            const fallbackImgs = (fallbackFolder?.images || fallbackProg?.images || []).map(cleanImageSrc);

            const finalImgs = imgs.length > 0 ? imgs : fallbackImgs;

            return {
              id: prog.id || index + 1,
              name: prog.title || prog.name,
              images: finalImgs,
            };
          });
          setPrograms(formatted);
        } else {
          setPrograms(defaultGalleryPrograms);
        }
      } catch (error) {
        console.error('Error fetching programs for gallery, using defaults:', error);
        setPrograms(defaultGalleryPrograms);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const displayedPrograms = programs.length > 0 ? programs : defaultGalleryPrograms;

  if (loading && programs.length === 0) {
    return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Loading gallery...</div>;
  }

  const handleFolderClick = (program) => {
    setSelectedProgram(program);
  };

  const handleBackClick = () => {
    setSelectedProgram(null);
  };

  return (
    <section className="image-gallery">
      <div className="container">
        <div className="image-gallery__header text-center mb-5">
          <h1 className="heading-1 heading-underline heading-center">Our Programs Gallery</h1>
        </div>

        {!selectedProgram ? (
          // Folders View
          <div className="image-gallery__folders">
            <div className="image-gallery__folders-grid grid grid-3">
              {displayedPrograms.map((program, idx) => (
                <div
                  key={program.id || idx}
                  className="image-gallery__folder-item card"
                  onClick={() => handleFolderClick(program)}
                >
                  <div className="image-gallery__folder-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/>
                    </svg>
                  </div>
                  <h3 className="image-gallery__folder-name heading-5">{program.name}</h3>
                  <span className="image-gallery__folder-count body-small">
                    {program.images ? program.images.length : 0} images
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Images View
          <div className="image-gallery__images">
            <button className="image-gallery__back-button btn btn-secondary mb-4" onClick={handleBackClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
              </svg>
              Back to Programs
            </button>

            <div className="image-gallery__images-header text-center mb-5">
              <h2 className="heading-2 heading-center">{selectedProgram.name} - Event Photos</h2>
            </div>

            <div className="image-gallery__images-grid grid grid-4">
              {selectedProgram.images && selectedProgram.images.map((image, index) => {
                const fallbackFolder = defaultGalleryPrograms.find(p => p.name === selectedProgram.name);
                const fallbackProg = defaultPrograms.find(p => p.title === selectedProgram.name);
                const fallbackList = fallbackFolder?.images || fallbackProg?.images || [];
                const fallbackImg = fallbackList[index] || fallbackList[0];

                return (
                  <div key={index} className="image-gallery__image-item card">
                    <img
                      src={cleanImageSrc(image)}
                      alt={`${selectedProgram.name} ${index + 1}`}
                      className="image-gallery__image img-responsive img-rounded img-hover"
                      loading="lazy"
                      onError={(e) => {
                        if (fallbackImg && e.target.src !== fallbackImg) {
                          e.target.src = fallbackImg;
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageGallery;