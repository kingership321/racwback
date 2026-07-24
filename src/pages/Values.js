// import React from 'react';
// import './Values.css';
// import { 
//   FaHandsHelping, 
//   FaUsers, 
//   FaLightbulb, 
//   FaDove,
//   FaGlobe,
//   FaShieldAlt,
//   FaLaugh
// } from 'react-icons/fa';

// const ValuesSection = () => {
//   const values = [
//     {
//       id: 1,
//       icon: FaHandsHelping,
//       title: "Service",
//       description: "We believe in serving our communities and putting the needs of others before our own."
//     },
//     {
//       id: 2,
//       icon: FaUsers,
//       title: "Fellowship",
//       description: "We build lasting friendships through shared experiences and common goals."
//     },
//     {
//       id: 3,
//       icon: FaLightbulb,
//       title: "Leadership",
//       description: "We develop leadership skills in our members through hands-on experience and mentorship."
//     },
//     {
//       id: 4,
//       icon: FaGlobe,
//       title: "Diversity",
//       description: "We celebrate diversity and promote inclusivity in all our activities and membership."
//     },
//     {
//       id: 5,
//       icon: FaShieldAlt,
//       title: "Integrity",
//       description: "We conduct ourselves with honesty and transparency in all our dealings."
//     },
//     {
//       id: 6,
//       icon: FaDove,
//       title: "Peace",
//       description: "We promote peace and understanding through our international service projects."
//     },
//     {
//       id: 7,
//       icon: FaLaugh,
//       title: "Fun",
//       description: "We believe that serving the community should be an enjoyable and rewarding experience."
//     },
//     {
//       id: 8,
//       icon: FaHandsHelping,
//       title: "Collaboration",
//       description: "We work together with partners to create greater impact in our communities."
//     }
//   ];

//   return (
//     <section className="values-section">
//       <div className="container">
//         <div className="values-section__header text-center mb-5">
//           <h2 className="heading-2 heading-underline heading-center">Our Values</h2>
//           <p className="lead text-gray">
//             The core principles that guide everything we do at Rotaract Club of Tribhuvan University
//           </p>
//         </div>
        
//         <div className="values-section__grid grid grid-4">
//           {values.map((value) => {
//             const IconComponent = value.icon;
//             return (
//               <div key={value.id} className="value-card card">
//                 <div className="value-card__icon">
//                   <IconComponent />
//                 </div>
//                 <div className="value-card__content">
//                   <h3 className="value-card__title heading-5">{value.title}</h3>
//                   <p className="value-card__description body-small">{value.description}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ValuesSection;


// src/pages/Values.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Values.css';
import * as Icons from 'react-icons/fa';

const ValuesSection = () => {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const res = await api.get('/values');
        setValues(res.data);
      } catch (error) {
        console.error('Error fetching values:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchValues();
  }, []);

  if (loading) return <div className="values-section" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  if (values.length === 0) {
    return (
      <section className="values-section">
        <div className="container">
          <div className="values-section__header text-center mb-5">
            <h2 className="heading-2 heading-underline heading-center">Our Values</h2>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--dark-gray)' }}>No values available.</p>
        </div>
      </section>
    );
  }

  // Helper to get icon component from string
  const getIcon = (iconName) => {
    const Icon = Icons[iconName] || Icons.FaHandsHelping;
    return <Icon />;
  };

  return (
    <section className="values-section">
      <div className="container">
        <div className="values-section__header text-center mb-5">
          <h2 className="heading-2 heading-underline heading-center">Our Values</h2>
          <p className="lead text-gray">
            The core principles that guide everything we do at Rotaract Club of Tribhuvan University
          </p>
        </div>
        <div className="values-section__grid grid grid-4">
          {values.map((value) => (
            <div key={value.id} className="value-card card">
              <div className="value-card__icon">
                {getIcon(value.icon_name)}
              </div>
              <div className="value-card__content">
                <h3 className="value-card__title heading-5">{value.title}</h3>
                <p className="value-card__description body-small">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;