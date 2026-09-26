import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { defaultThemes } from '../data/defaultData';
import './ThemeSection.css';

function ThemeSection() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await api.get('/themes');
        let rawArray = [];
        if (Array.isArray(res?.data)) {
          rawArray = res.data;
        } else if (Array.isArray(res?.data?.themes)) {
          rawArray = res.data.themes;
        } else if (Array.isArray(res?.data?.data)) {
          rawArray = res.data.data;
        }

        if (rawArray.length > 0) {
          setThemes(rawArray);
        } else {
          setThemes(defaultThemes);
        }
      } catch (error) {
        console.error('Error fetching themes, using fallback:', error);
        setThemes(defaultThemes);
      } finally {
        setLoading(false);
      }
    };
    fetchThemes();
  }, []);

  const displayedThemes = themes.length > 0 ? themes : defaultThemes;

  if (loading && themes.length === 0) {
    return (
      <div className="theme-section section" style={{ padding: '2rem', textAlign: 'center' }}>
        Loading themes...
      </div>
    );
  }

  return (
    <section className="theme-section section">
      <div className="container">
        <div className="theme-section__header text-center mb-5">
          <h1 className="heading-2 heading-underline heading-center">Our Themes</h1>
        </div>

        {displayedThemes.map((theme, index) => {
          const fallbackTheme = defaultThemes.find(t => t.id === theme.id || t.title === theme.title) || defaultThemes[index % defaultThemes.length];
          const imageSrc = theme.image_url || fallbackTheme?.image_url;

          const isDistrictTheme = index === 1 || theme.title?.toLowerCase().includes('district');

          return (
            <div
              key={theme.id || index}
              className="theme-section__content theme-section__content--visible"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="theme-section__card card card-lg">
                <div className="theme-section__media">
                  <img
                    src={imageSrc}
                    alt={theme.title}
                    className={`theme-section__image img-rounded img-shadow ${isDistrictTheme ? 'img-responsive' : ''}`}
                    loading="lazy"
                    onError={(e) => {
                      if (fallbackTheme?.image_url && e.target.src !== fallbackTheme.image_url) {
                        e.target.src = fallbackTheme.image_url;
                      }
                    }}
                  />
                </div>
                <div className="theme-section__text">
                  <h2 className="theme-section__subtitle heading-4">{theme.title}</h2>
                  <div className="theme-section__description">
                    {theme.description && theme.description.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="theme-section__paragraph body-large">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ThemeSection;