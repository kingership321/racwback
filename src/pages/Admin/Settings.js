import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';

const Settings = () => {
  const [settings, setSettings] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ key: '', value: '' });
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <div className="admin-content__header">
        <div className="admin-content__header-left">
          <h1>Settings</h1>
          <p>Manage global key-value settings (e.g., site name, contact info)</p>
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
    </>
  );
};

export default Settings;