// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import './StatsCard.css';

// const StatsSection = () => {
//   // Statistics data
//   const [stats, setStats] = useState([
//     { id: 1, title: "Total Members", value: 0, target: 7500 },
//     { id: 2, title: "Active Members", value: 0, target: 4100 },
//     { id: 3, title: "Activities Conducted", value: 0, target: 15000, suffix: "+" },
//     { id: 4, title: "Events Participated", value: 0, target: 10000, suffix: "+" },
//     { id: 5, title: "Total Meetings", value: 0, target: 4500, suffix: "+" },
//   ]);

//   const statsRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);

//   // Create a ref for the counters to clear them on unmount
//   const countersRef = useRef([]);

//   // Animation function using useCallback to avoid recreation on every render
//   const animateCounters = useCallback(() => {
//     const duration = 2000;
//     const interval = 20;
//     const steps = duration / interval;

//     // Clear any existing counters
//     countersRef.current.forEach(timer => clearInterval(timer));
//     countersRef.current = [];

//     const newCounters = stats.map(stat => {
//       const stepValue = stat.target / steps;
//       let currentValue = 0;

//       const timer = setInterval(() => {
//         currentValue += stepValue;
//         if (currentValue >= stat.target) {
//           currentValue = stat.target;
//           clearInterval(timer);
//         }

//         setStats(prevStats => 
//           prevStats.map(item => 
//             item.id === stat.id 
//               ? { ...item, value: Math.floor(currentValue) } 
//               : item
//           )
//         );
//       }, interval);

//       return timer;
//     });

//     countersRef.current = newCounters;
//   }, [stats]);

//   useEffect(() => {
//     const node = statsRef.current;
//     if (!node) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.3 }
//     );

//     observer.observe(node);

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     if (!isVisible) return;

//     animateCounters();

//     // Cleanup function to clear intervals when component unmounts or dependencies change
//     return () => {
//       countersRef.current.forEach(timer => clearInterval(timer));
//       countersRef.current = [];
//     };
//   }, [isVisible, animateCounters]);

//   // Format large numbers with commas
//   const formatNumber = (num) => {
//     return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

//   return (
//     <section className="stats-section section" ref={statsRef}>
//       <div className="container">
        
//         {/* Section Header */}
//         <div className="stats-section__header text-center mb-5">
//           <h2 className="heading-2 heading-underline heading-center">
//             Our Impact in Numbers
//           </h2>
//           <p className="lead text-gray">
//             The growth and achievements of our club over the years
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="stats-section__grid grid grid-5">
//           {stats.map(stat => (
//             <div key={stat.id} className="stats-section__card card">
//               <div className="stats-section__icon">
//                 {stat.id === 1 && <i className="fas fa-users"></i>}
//                 {stat.id === 2 && <i className="fas fa-user"></i>}
//                 {stat.id === 3 && <i className="fas fa-calendar-check"></i>}
//                 {stat.id === 4 && <i className="fas fa-handshake"></i>}
//                 {stat.id === 5 && <i className="fas fa-user-friends"></i>}
//               </div>
//               <div className="stats-section__content">
//                 <h3 className="stats-section__number">
//                   {formatNumber(stat.value)}
//                   {stat.suffix}
//                 </h3>
//                 <p className="stats-section__stat-title body-large font-semibold">
//                   {stat.title}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StatsSection;

// src/pages/StatsCard.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import api from '../services/api';
import './StatsCard.css';

const StatsSection = () => {
  const [stats, setStats] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats');
        // Initialize value as 0 for animation
        const statsWithZero = res.data.map(stat => ({ ...stat, value: 0 }));
        setStats(statsWithZero);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  // Intersection Observer for animation trigger
  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Animate counters when visible
  useEffect(() => {
    if (!isVisible || stats.length === 0) return;

    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;

    // Clear previous intervals
    countersRef.current.forEach(timer => clearInterval(timer));
    countersRef.current = [];

    stats.forEach((stat, index) => {
      const stepValue = stat.target / steps;
      let currentValue = 0;

      const timer = setInterval(() => {
        currentValue += stepValue;
        if (currentValue >= stat.target) {
          currentValue = stat.target;
          clearInterval(timer);
        }
        setStats(prevStats =>
          prevStats.map((item, i) =>
            i === index ? { ...item, value: Math.floor(currentValue) } : item
          )
        );
      }, interval);

      countersRef.current.push(timer);
    });

    return () => {
      countersRef.current.forEach(timer => clearInterval(timer));
      countersRef.current = [];
    };
  }, [isVisible, stats]);

  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (stats.length === 0) {
    return (
      <section className="stats-section section" ref={statsRef}>
        <div className="container">
          <div className="stats-section__header text-center mb-5">
            <h2 className="heading-2 heading-underline heading-center">Our Impact in Numbers</h2>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--dark-gray)' }}>No statistics available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="stats-section section" ref={statsRef}>
      <div className="container">
        <div className="stats-section__header text-center mb-5">
          <h2 className="heading-2 heading-underline heading-center">Our Impact in Numbers</h2>
          <p className="lead text-gray">The growth and achievements of our club over the years</p>
        </div>
        <div className="stats-section__grid grid grid-5">
          {stats.map((stat) => (
            <div key={stat.id} className="stats-section__card card">
              <div className="stats-section__icon">
                {stat.id === 1 && <i className="fas fa-users"></i>}
                {stat.id === 2 && <i className="fas fa-user"></i>}
                {stat.id === 3 && <i className="fas fa-calendar-check"></i>}
                {stat.id === 4 && <i className="fas fa-handshake"></i>}
                {stat.id === 5 && <i className="fas fa-user-friends"></i>}
                {/* fallback icon if id doesn't match */}
                {![1,2,3,4,5].includes(stat.id) && <i className="fas fa-chart-line"></i>}
              </div>
              <div className="stats-section__content">
                <h3 className="stats-section__number">
                  {formatNumber(stat.value)}
                  {stat.suffix}
                </h3>
                <p className="stats-section__stat-title body-large font-semibold">
                  {stat.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;