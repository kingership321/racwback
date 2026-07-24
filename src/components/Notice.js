import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Notice.css';

function Notice() {
  const [notice, setNotice] = useState('Welcome to Rotaract Club of Tribhuvan University');

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await api.get('/settings/notice_text');
        if (res.data) setNotice(res.data.value);
      } catch (error) {
        console.error('Error fetching notice:', error);
        // Fallback to default
      }
    };
    fetchNotice();
  }, []);

  return (
    <div className="notice-section">
      <p>{notice}</p>
    </div>
  );
}

export default Notice;