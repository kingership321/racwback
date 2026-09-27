import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaKey, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const Settings = () => {
  const [settings, setSettings] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ key: '', value: '' });
  const [loading, setLoading] = useState(false);
  const [pwData, setPwData] = useState({ verificationEmail: '', newPassword: '', confirmPassword: '' });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      setSettings(res.data);
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.key.trim()) {
      alert('Key is required');
      return;
    }
    setLoading(true);
    try {
      // If editing is an existing key (not the special 'new' marker), perform update; otherwise create
      if (editing && editing !== 'new') {
        await api.put(`/settings/${formData.key}`, { value: formData.value });
      } else {
        await api.post('/settings', { key: formData.key, value: formData.value });
      }
      setEditing(null);
      setFormData({ key: '', value: '' });
      await fetchSettings();
    } catch (err) {
      console.error('Error saving setting:', err);
      alert(err.response?.data?.error || 'Error saving setting');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (key) => {
    if (!window.confirm(`Delete setting "${key}"?`)) return;
    try {
      await api.delete(`/settings/${key}`);
      await fetchSettings();
    } catch (err) {
      alert(err.response?.data?.error || 'Error deleting');
    }
  };

  const handleEdit = (item) => {
    setEditing(item.key);
    setFormData({
      key: item.key,
      value: typeof item.value === 'string' ? item.value : JSON.stringify(item.value, null, 2),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const cancelEdit = () => {
    setEditing(null);
    setFormData({ key: '', value: '' });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwMsg(null);
    if (!pwData.verificationEmail.trim()) {
      setPwMsg({ type: 'error', text: 'Please enter your administrator security verification email.' });
      return;
    }
    if (!pwData.newPassword || pwData.newPassword.length < 6) {
      setPwMsg({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }
    if (pwData.newPassword !== pwData.confirmPassword) {
      setPwMsg({ type: 'error', text: 'Passwords do not match. Please re-enter.' });
      return;
    }
    setPwLoading(true);
    try {
      const res = await api.post('/auth/change-password', { 
        verificationEmail: pwData.verificationEmail.trim(),
        newPassword: pwData.newPassword 
      });
      setPwMsg({ type: 'success', text: res.data?.message || 'Password successfully updated!' });
      setPwData({ verificationEmail: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPwMsg({ type: 'error', text: err.response?.data?.error || 'Failed to update password.' });
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <>
      <div className="admin-content__header">
        <div className="admin-content__header-left">
          <h1>Settings</h1>
          <p>Manage site configuration and administrator security</p>
        </div>
        <div className="admin-content__header-right">
          {!editing && (
            <button className="btn-admin btn-admin--success" onClick={() => setEditing('new')}>
              <FaPlus /> Add Setting
            </button>
          )}
        </div>
      </div>

      {(editing === 'new' || editing) && (
        <div className="admin-card">
          <h3 className="admin-card__title">
            {editing === 'new' ? <><FaPlus /> Add New Setting</> : <><FaEdit /> Edit Setting</>}
          </h3>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form__grid">
              <div className="admin-form__group">
                <label>Key <span className="required">*</span></label>
                <input
                  name="key"
                  value={formData.key}
                  onChange={handleChange}
                  placeholder="e.g., site_title"
                  required
                  disabled={editing !== 'new'}
                />
              </div>
              <div className="admin-form__group" style={{ gridColumn: 'span 2' }}>
                <label>Value <span className="required">*</span></label>
                <textarea
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Can be text or JSON"
                  required
                />
              </div>
            </div>
            <div className="admin-form__actions">
              <button type="submit" className="btn-admin btn-admin--primary" disabled={loading}>
                <FaSave /> {editing === 'new' ? 'Add Setting' : 'Update'}
              </button>
              <button type="button" className="btn-admin btn-admin--outline" onClick={cancelEdit}>
                <FaTimes /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {settings.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: 'var(--dark-gray)' }}>
                    No settings found.
                  </td>
                </tr>
              ) : (
                settings.map(s => (
                  <tr key={s.key}>
                    <td><code>{s.key}</code></td>
                    <td>
                      {typeof s.value === 'object' ? (
                        <pre style={{ margin: 0, fontSize: '0.8rem', maxWidth: '300px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                          {JSON.stringify(s.value, null, 2)}
                        </pre>
                      ) : (
                        <span>{s.value}</span>
                      )}
                    </td>
                    <td className="col-actions">
                      <button className="btn-admin btn-admin--warning btn-admin--sm" onClick={() => handleEdit(s)}>
                        <FaEdit />
                      </button>
                      <button className="btn-admin btn-admin--danger btn-admin--sm" onClick={() => handleDelete(s.key)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Admin Password Card */}
      <div className="admin-card" style={{ marginTop: '2rem', borderTop: '4px solid var(--rotaract-blue, #004080)' }}>
        <h3 className="admin-card__title" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <FaKey style={{ color: 'var(--rotaract-blue, #004080)' }} /> Change Admin Password
        </h3>
        <p style={{ color: 'var(--dark-gray)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
          For security, confirm your registered administrator verification email to update your password across both the local server and Supabase database.
        </p>

        {pwMsg && (
          <div style={{
            padding: '0.8rem 1rem',
            borderRadius: '6px',
            marginBottom: '1.2rem',
            fontSize: '0.9rem',
            background: pwMsg.type === 'success' ? '#ecfdf5' : '#fef2f2',
            color: pwMsg.type === 'success' ? '#065f46' : '#b91c1c',
            border: `1px solid ${pwMsg.type === 'success' ? '#a7f3d0' : '#fecaca'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {pwMsg.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
            {pwMsg.text}
          </div>
        )}

        <form className="admin-form" onSubmit={handlePasswordChange} style={{ maxWidth: '600px' }}>
          <div className="admin-form__group" style={{ marginBottom: '1.2rem' }}>
            <label>Administrator Verification Email <span className="required">*</span></label>
            <input
              type="email"
              placeholder="e.g. your-admin-email@gmail.com"
              value={pwData.verificationEmail}
              onChange={e => setPwData(prev => ({ ...prev, verificationEmail: e.target.value }))}
              required
            />
            <small style={{ color: 'var(--dark-gray)', fontSize: '0.8rem', marginTop: '0.35rem', display: 'block' }}>
              Enter the registered security email (<code>kingership321@gmail.com</code>) to verify authorization.
            </small>
          </div>

          <div className="admin-form__grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-form__group">
              <label>New Password <span className="required">*</span></label>
              <input
                type="password"
                placeholder="At least 6 characters"
                value={pwData.newPassword}
                onChange={e => setPwData(prev => ({ ...prev, newPassword: e.target.value }))}
                required
                minLength={6}
              />
            </div>
            <div className="admin-form__group">
              <label>Confirm New Password <span className="required">*</span></label>
              <input
                type="password"
                placeholder="Re-enter new password"
                value={pwData.confirmPassword}
                onChange={e => setPwData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
                minLength={6}
              />
            </div>
          </div>
          <div className="admin-form__actions" style={{ marginTop: '1.2rem' }}>
            <button type="submit" className="btn-admin btn-admin--primary" disabled={pwLoading}>
              <FaSave /> {pwLoading ? 'Updating Password...' : 'Save New Password'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Settings;