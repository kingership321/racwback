import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { 
  FaCalendarAlt, 
  FaUsers, 
  FaComment, 
  FaGem, 
  FaBullseye, 
  FaImages 
} from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    programs: 0,
    boardMembers: 0,
    charterMessages: 0,
    values: 0,
    themes: 0,
    previousBoards: 0,
  });

  useEffect(() => {
    const fetchAllCounts = async () => {
      try {
        const [programsRes, boardRes, charterRes, valuesRes, themesRes, boardsRes] = await Promise.all([
          api.get('/programs'),
          api.get('/board'),
          api.get('/charter'),
          api.get('/values'),
          api.get('/themes'),
          api.get('/previousboards'),
        ]);
        setStats({
          programs: programsRes.data.length,
          boardMembers: boardRes.data.length,
          charterMessages: charterRes.data.length,
          values: valuesRes.data.length,
          themes: themesRes.data.length,
          previousBoards: boardsRes.data.length,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };
    fetchAllCounts();
  }, []);

  const statCards = [
    { label: 'Programs', value: stats.programs, icon: FaCalendarAlt, color: 'var(--rotaract-blue)' },
    { label: 'Board Members', value: stats.boardMembers, icon: FaUsers, color: 'var(--rotaract-gold)' },
    { label: 'Charter Messages', value: stats.charterMessages, icon: FaComment, color: 'var(--rotaract-pink)' },
    { label: 'Core Values', value: stats.values, icon: FaGem, color: '#10b981' },
    { label: 'Themes', value: stats.themes, icon: FaBullseye, color: '#8b5cf6' },
    { label: 'Previous Boards', value: stats.previousBoards, icon: FaImages, color: '#f59e0b' },
  ];

  return (
    <>
      <div className="admin-content__header">
        <div className="admin-content__header-left">
          <h1>Dashboard</h1>
          <p>Overview of your Rotaract Club content</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {statCards.map((item, idx) => (
          <div key={idx} className="admin-card" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: item.color }}>
              <item.icon />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: item.color }}>{item.value}</div>
            <div style={{ color: 'var(--dark-gray)', fontSize: '0.9rem', fontWeight: '500' }}>{item.label}</div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h3 className="admin-card__title">📌 Quick Actions</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <a href="/admin/programs" className="btn-admin btn-admin--primary">+ Add Program</a>
          <a href="/admin/board" className="btn-admin btn-admin--warning">+ Add Board Member</a>
          <a href="/admin/charter" className="btn-admin btn-admin--success">Edit Charter Messages</a>
          <a href="/admin/stats" className="btn-admin btn-admin--outline">Update Stats</a>
        </div>
      </div>
    </>
  );
};

export default Dashboard;