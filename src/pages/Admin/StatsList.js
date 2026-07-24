import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';

const StatsList = () => {
  const [stats, setStats] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    target: 0,
    suffix: '',
    display_order: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await api.get('/stats');
    setStats(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only perform update if editing refers to an existing stat id (not the 'new' sentinel)
      if (editing && editing !== 'new') {
        await api.put(`/stats/${editing}`, formData);
      } else {
        await api.post('/stats', formData);
      }
      setEditing(null);
      setFormData({ title: '', target: 0, suffix: '', display_order: 0 });
      fetchStats();
    } catch (err) {
      alert(err.response?.data?.error || 'Error saving');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this stat?')) return;
    try {
      await api.delete(`/stats/${id}`);
      fetchStats();
    } catch (err) {
      alert(err.response?.data?.error || 'Error deleting');
    }
  };

  const handleEdit = (stat) => {
    setEditing(stat.id);
    setFormData(stat);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'target' ? parseInt(value) || 0 : value }));
  };

  const cancelEdit = () => {
    setEditing(null);
    setFormData({ title: '', target: 0, suffix: '', display_order: 0 });
  };

  return (
    <>
      <div className="admin-content__header">
        <div className="admin-content__header-left">
          <h1>Statistics</h1>
          <p>Manage the numbers shown on the homepage</p>
        </div>
        <div className="admin-content__header-right">
          {!editing && (
            <button className="btn-admin btn-admin--success" onClick={() => setEditing('new')}>
              <FaPlus /> Add Stat
            </button>
          )}
        </div>
      </div>

      {(editing === 'new' || editing) && (
        <div className="admin-card">
          <h3 className="admin-card__title">
            {editing === 'new' ? <><FaPlus /> Add New Stat</> : <><FaEdit /> Edit Stat</>}
          </h3>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form__grid">
              <div className="admin-form__group">
                <label>Title <span className="required">*</span></label>
                <input name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="admin-form__group">
                <label>Target Number <span className="required">*</span></label>
                <input name="target" type="number" value={formData.target} onChange={handleChange} required />
              </div>
              <div className="admin-form__group">
                <label>Suffix (e.g., + or %)</label>
                <input name="suffix" value={formData.suffix} onChange={handleChange} placeholder="e.g., +" />
              </div>
              <div className="admin-form__group">
                <label>Display Order</label>
                <input name="display_order" type="number" value={formData.display_order} onChange={handleChange} />
              </div>
            </div>
            <div className="admin-form__actions">
              <button type="submit" className="btn-admin btn-admin--primary">
                <FaSave /> {editing === 'new' ? 'Add Stat' : 'Update'}
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
                <th>Title</th>
                <th>Target</th>
                <th>Suffix</th>
                <th>Order</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--dark-gray)' }}>
                    No statistics added yet.
                  </td>
                </tr>
              ) : (
                stats.map(s => (
                  <tr key={s.id}>
                    <td><strong>{s.title}</strong></td>
                    <td>{s.target}</td>
                    <td>{s.suffix || '—'}</td>
                    <td>{s.display_order}</td>
                    <td className="col-actions">
                      <button className="btn-admin btn-admin--warning btn-admin--sm" onClick={() => handleEdit(s)}>
                        <FaEdit />
                      </button>
                      <button className="btn-admin btn-admin--danger btn-admin--sm" onClick={() => handleDelete(s.id)}>
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

export default StatsList;