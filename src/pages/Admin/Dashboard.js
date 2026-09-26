import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { 
  FaCalendarAlt, 
  FaUsers, 
  FaComment, 
  FaGem, 
  FaBullseye, 
  FaImages,
  FaSync,
  FaCheckCircle,
  FaExclamationTriangle,
  FaDatabase
} from 'react-icons/fa';

const Dashboard = () => {
  const [dbStatus, setDbStatus] = useState({ isSupabaseOnline: false, mode: 'checking', lastSync: null });
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState(null);
  const [stats, setStats] = useState({
    programs: 0,
    boardMembers: 0,
    charterMessages: 0,
    values: 0,
    themes: 0,
    previousBoards: 0,
  });

  const fetchSyncStatus = async () => {
    try {
      const res = await api.get('/sync/status');
      setDbStatus(res.data);
    } catch (err) {
      setDbStatus({ isSupabaseOnline: false, mode: 'local_fallback', lastSync: null });
    }
  };

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
      
      const getArrayLength = (res) => {
        if (Array.isArray(res?.data)) return res.data.length;
        if (Array.isArray(res?.data?.data)) return res.data.data.length;
        return 0;
      };
      
      setStats({
        programs: getArrayLength(programsRes),
        boardMembers: getArrayLength(boardRes),
        charterMessages: getArrayLength(charterRes),
        values: getArrayLength(valuesRes),
        themes: getArrayLength(themesRes),
        previousBoards: getArrayLength(boardsRes),
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  useEffect(() => {
    fetchAllCounts();
    fetchSyncStatus();
  }, []);

  const handleManualSync = async () => {
    setSyncing(true);
    setSyncMsg(null);
    try {
      const res = await api.post('/sync');
      if (res.data?.success) {
        const counts = res.data.results || {};
        const total = Object.values(counts).reduce((a, b) => a + b, 0);
        setSyncMsg({
          type: 'success',
          text: `✅ Successfully synced ${total} items to Supabase database! (Programs: ${counts.programs || 0}, Board: ${counts.board_members || 0}, Settings: ${counts.settings || 0}, etc.)`
        });
      } else {
        setSyncMsg({
          type: 'warning',
          text: `⚠️ ${res.data?.message || 'Sync could not complete. Supabase is still offline. Your local data remains safe!'}`
        });
      }
      await fetchSyncStatus();
      await fetchAllCounts();
    } catch (err) {
      setSyncMsg({
        type: 'error',
        text: `⚠️ ${err.response?.data?.message || 'Supabase database is currently unreachable. All changes remain saved locally.'}`
      });
    } finally {
      setSyncing(false);
    }
  };

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
          <p>Overview of your Rotaract Club content and database status</p>
        </div>
      </div>

      {/* Database Status & Sync Widget */}
      <div className="admin-card" style={{ 
        borderLeft: `5px solid ${dbStatus.isSupabaseOnline ? '#10b981' : '#f59e0b'}`,
        marginBottom: '2rem',
        background: '#ffffff',
        padding: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <FaDatabase style={{ color: dbStatus.isSupabaseOnline ? '#10b981' : '#f59e0b', fontSize: '1.3rem' }} />
              <strong style={{ fontSize: '1.15rem' }}>
                Database Status:{' '}
                {dbStatus.isSupabaseOnline ? (
                  <span style={{ color: '#10b981' }}><FaCheckCircle style={{ verticalAlign: 'middle' }} /> Supabase Online</span>
                ) : (
                  <span style={{ color: '#f59e0b' }}><FaExclamationTriangle style={{ verticalAlign: 'middle' }} /> Local Storage Mode (Offline Safe)</span>
                )}
              </strong>
            </div>
            <p style={{ margin: 0, color: 'var(--dark-gray)', fontSize: '0.92rem' }}>
              {dbStatus.isSupabaseOnline
                ? 'Your website is connected to Supabase. When online, all changes sync automatically.'
                : 'Supabase is currently offline or unreachable. All additions, updates, and deletes are safely stored on this computer in fallbackData.json. You will never lose any changes.'}
            </p>
            {dbStatus.lastSync && (
              <small style={{ color: '#888', display: 'block', marginTop: '0.3rem' }}>
                Last synced to Supabase: {new Date(dbStatus.lastSync).toLocaleString()}
              </small>
            )}
          </div>

          <div>
            <button 
              className="btn-admin btn-admin--primary"
              onClick={handleManualSync}
              disabled={syncing}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
            >
              <FaSync className={syncing ? 'fa-spin' : ''} /> {syncing ? 'Syncing...' : 'Sync Local Changes to Supabase'}
            </button>
          </div>
        </div>

        {syncMsg && (
          <div style={{ 
            marginTop: '1rem',
            padding: '0.8rem 1rem',
            borderRadius: '6px',
            fontSize: '0.9rem',
            background: syncMsg.type === 'success' ? '#ecfdf5' : '#fffbeb',
            color: syncMsg.type === 'success' ? '#065f46' : '#92400e',
            border: `1px solid ${syncMsg.type === 'success' ? '#a7f3d0' : '#fde68a'}`
          }}>
            {syncMsg.text}
          </div>
        )}
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
          <a href="/admin/settings" className="btn-admin btn-admin--outline">⚙️ Manage Settings</a>
        </div>
      </div>
    </>
  );
};

export default Dashboard;