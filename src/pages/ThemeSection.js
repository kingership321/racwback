// import { useState, useEffect } from 'react';
// import './ThemeSection.css';
// import district_theme from '../assets/district-theme-image.jpeg';
// import themeImage from '../assets/dipesh_dai.png';

// function ThemeSection() {  
//   const [isVisible, setIsVisible] = useState({
//     theme: false,
//     themeRight: false,
//   });

//   useEffect(() => {
//     const timer2 = setTimeout(() => setIsVisible(prev => ({...prev, theme: true})), 600);
//     const timer3 = setTimeout(() => setIsVisible(prev => ({...prev, themeRight: true})), 600);
//     return () => {
//       clearTimeout(timer2);
//       clearTimeout(timer3);
//     };
//   }, []);     

//   return (
//     <section className="theme-section section">
//       <div className="container">
        
//         {/* Section Header */}
//         <div className="theme-section__header text-center mb-5">
//           <h1 className="heading-2 heading-underline heading-center">Our Themes</h1>
//         </div>

//         {/* President Theme */}
//         <div className={`theme-section__content ${isVisible.theme ? 'theme-section__content--visible' : ''}`}>
//           <div className="theme-section__card card card-lg">
//             <div className="theme-section__media">
//               <img src={themeImage} alt="President Theme" className="theme-section__image img-rounded img-shadow" loading="lazy" />
//             </div>
//             <div className="theme-section__text">
//               <h2 className="theme-section__subtitle heading-4">Presidential Theme – RY 2026/27: DREAM. JOIN. PERFORM.</h2>
//               <div className="theme-section__description">
//                 <p className="theme-section__paragraph body-large">
//                   This theme carries a dual purpose: To uplift our communities and to elevate every single member of RAC TU.
//                 </p>
//                 <p className="theme-section__paragraph body-large">
//                   DREAM :Of a better society, and of becoming the best versions of ourselves.
//                 </p>
//                 <p className="theme-section__paragraph body-large">
//                   JOIN : Unite with like-minded change-makers not just to serve together, but to network, learn, and grow together.
//                 </p>
//                 <p className="theme-section__paragraph body-large">
//                   PERFORM : Execute with excellence. Deliver social impact while sharpening our leadership, communication, and professional skills.
//                 </p>
//                 <p className="theme-section__paragraph body-large">
//                   At RAC TU, we don't just change lives out there, we change our own lives right here. We grow as we give. Let's transform society and ourselves. Let's make this year unforgettable.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* District Theme */}
//         <div className={`theme-section__content ${isVisible.theme ? 'theme-section__content--visible' : ''}`}>
//           <div className="theme-section__card card card-lg">
//             <div className="theme-section__media">
//               <img src={district_theme} alt="Rotaract District Theme" className="theme-section__image img-responsive img-rounded img-shadow" loading="lazy" />
//             </div>
//             <div className="theme-section__text">
//               <h2 className="theme-section__subtitle heading-4">Rotaract District Theme:  Integrity, Vision, and Leadership</h2>
//               <div className="theme-section__description">
//                 <p className="theme-section__paragraph body-large">
//                  The Rotaract District 3292 theme represents a powerful triptych of core values: Integrity, Vision, and Leadership. Visually, the emblem captures this spirit through an abstract, dynamic human figure colored in striking gradients of deep pink and blue, reaching upward toward a glowing golden star. Flanked by stylized individuals waving flags, the design symbolizes collective action, youthful energy, and a shared community purpose. It serves as a visual reminder that true leadership within the district is not solitary, but rather a collaborative journey fueled by ambition and grounded in ethical values.
//                 </p>
//                 <p className="theme-section__paragraph body-large">
//                   Beneath this artistic representation lies a strategic call to action for all Rotaractors within the district. Integrity establishes the moral compass for every community service and professional development initiative, ensuring transparency and deep-rooted respect. Vision challenges clubs to look beyond immediate fixes, encouraging them to design sustainable, long-term solutions for local and global needs. Finally, Leadership acts as the catalyst, empowering young professionals to take ownership of their projects, inspire their peers, and drive meaningful, progressive change across their communities.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ThemeSection;

// src/pages/ThemeSection.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './ThemeSection.css';

function ThemeSection() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await api.get('/themes');
        
        // Safely extract array regardless of wrapper structure
        let rawArray = [];
        if (Array.isArray(res?.data)) {
          rawArray = res.data;
        } else if (Array.isArray(res?.data?.themes)) {
          rawArray = res.data.themes;
        } else if (Array.isArray(res?.data?.data)) {
          rawArray = res.data.data;
        } else {
          console.warn('API returned non-array themes response:', res?.data);
        }
        
        setThemes(rawArray);
      } catch (error) {
        console.error('Error fetching themes:', error);
        setThemes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchThemes();
  }, []);

  if (loading) return <div className="theme-section section" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  if (themes.length === 0) {
    return (
      <section className="theme-section section">
        <div className="container">
          <div className="theme-section__header text-center mb-5">
            <h1 className="heading-2 heading-underline heading-center">Our Themes</h1>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--dark-gray)' }}>No themes available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="theme-section section">
      <div className="container">
        <div className="theme-section__header text-center mb-5">
          <h1 className="heading-2 heading-underline heading-center">Our Themes</h1>
        </div>

        {themes.map((theme, index) => (
          <div
            key={theme.id}
            className={`theme-section__content theme-section__content--visible`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="theme-section__card card card-lg">
              <div className="theme-section__media">
                <img
                  src={theme.image_url || 'https://via.placeholder.com/600x400?text=Theme+Image'}
                  alt={theme.title}
                  className="theme-section__image img-rounded img-shadow"
                  loading="lazy"
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
        ))}
      </div>
    </section>
  );
}

export default ThemeSection;