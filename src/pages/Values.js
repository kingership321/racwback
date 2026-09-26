import React, { useState, useEffect } from 'react';
import api from '../services/api';
import * as Icons from 'react-icons/fa';
import { defaultValues } from '../data/defaultData';
import './Values.css';

const ValuesSection = () => {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const res = await api.get('/values');
        const data = Array.isArray(res?.data) ? res.data : [];
        if (data.length > 0) {
          setValues(data);
        } else {
          setValues(defaultValues);
        }
      } catch (error) {
        console.error('Error fetching values, using fallback:', error);
        setValues(defaultValues);
      } finally {
        setLoading(false);
      }
    };
    fetchValues();
  }, []);

  const displayedValues = values.length > 0 ? values : defaultValues;

  if (loading && values.length === 0) {
    return (
      <div className="values-section" style={{ padding: '2rem', textAlign: 'center' }}>
        Loading core values...
      </div>
    );
  }

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
          {displayedValues.map((value) => (
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