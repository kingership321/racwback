import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import './StatsCard.css';

const StatsSection = () => {
  const [stats, setStats] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const statsRef = useRef(null);
  const countersRef = useRef([]);
  const animationStarted = useRef(false);

  // 1. Fetch Stats safely
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get('/stats');

        // Safely extract array regardless of wrapper structure or errors
        let rawArray = [];
        if (Array.isArray(res?.data)) {
          rawArray = res.data;
        } else if (Array.isArray(res?.data?.stats)) {
          rawArray = res.data.stats;
        } else if (Array.isArray(res?.data?.data)) {
          rawArray = res.data.data;
        } else {
          console.warn('API returned non-array stats response:', res?.data);
        }

        // Initialize value as 0 for smooth animation
        const statsWithZero = rawArray.map((stat) => ({
          ...stat,
          target: Number(stat.target) || 0,
          value: 0,
        }));

        setStats(statsWithZero);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // 2. Intersection Observer to detect when section is scrolled into view
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

  // 3. Animate counters safely when visible and data is loaded
  useEffect(() => {
    if (!isVisible || stats.length === 0 || animationStarted.current) return;

    animationStarted.current = true; // Ensure animation runs only once

    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;

    // Clear any active timers
    countersRef.current.forEach((timer) => clearInterval(timer));
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

        setStats((prevStats) =>
          prevStats.map((item, i) =>
            i === index ? { ...item, value: Math.floor(currentValue) } : item
          )
        );
      }, interval);

      countersRef.current.push(timer);
    });

    return () => {
      countersRef.current.forEach((timer) => clearInterval(timer));
      countersRef.current = [];
    };
  }, [isVisible, stats.length]);

  const formatNumber = (num) => {
    return (num || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  if (loading) {
    return (
      <section className="stats-section section" ref={statsRef}>
        <div className="container text-center">
          <p style={{ color: 'var(--dark-gray)' }}>Loading statistics...</p>
        </div>
      </section>
    );
  }

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
          {stats.map((stat, idx) => (
            <div key={stat.id || idx} className="stats-section__card card">
              <div className="stats-section__icon">
                {stat.id === 1 && <i className="fas fa-users"></i>}
                {stat.id === 2 && <i className="fas fa-user"></i>}
                {stat.id === 3 && <i className="fas fa-calendar-check"></i>}
                {stat.id === 4 && <i className="fas fa-handshake"></i>}
                {stat.id === 5 && <i className="fas fa-user-friends"></i>}
                {![1, 2, 3, 4, 5].includes(stat.id) && <i className="fas fa-chart-line"></i>}
              </div>
              <div className="stats-section__content">
                <h3 className="stats-section__number">
                  {formatNumber(stat.value)}
                  {stat.suffix || ''}
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