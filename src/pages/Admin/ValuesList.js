import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ValuesList = () => {
  const [values, setValues] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon_name: 'FaHandsHelping',
    display_order: 0,
  });

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchValues = async () => {
    const res = await api.get('/values');
    
    // Safely extract array regardless of wrapper structure
    let valuesArray = [];
    if (Array.isArray(res?.data)) {
      valuesArray = res.data;
    } else if (Array.isArray(res?.data?.values)) {
      valuesArray = res.data.values;
    } else if (Array.isArray(res?.data?.data)) {
      valuesArray = res.data.data;
    }
    
    setValues(valuesArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only update if editing references an existing id (not the 'new' sentinel)
      if (editing && editing !== 'new') {
        await api.put(`/values/${editing}`, formData);
      } else {
        await api.post('/values', formData);
      }
      setEditing(null);
      setFormData({ title: '', description: '', icon_name: 'FaHandsHelping', display_order: 0 });
      fetchValues();
    } catch (err) {
      alert(err.response?.data?.error || 'Error saving');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this value?')) return;
    try {
      await api.delete(`/values/${id}`);
      fetchValues();
    } catch (err) {
      alert(err.response?.data?.error || 'Error deleting');
    }
  };

  const handleEdit = (val) => {
    setEditing(val.id);
    setFormData(val);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const cancelEdit = () => {
    setEditing(null);
    setFormData({ title: '', description: '', icon_name: 'FaHandsHelping', display_order: 0 });
  };

  // Common icon names (you can expand this)
  const iconOptions = [
    'FaHandsHelping', 'FaUsers', 'FaLightbulb', 'FaDove', 'FaGlobe',
    'FaShieldAlt', 'FaLaugh', 'FaHeart', 'FaStar', 'FaRocket'
  ];

  return (
    <>
      <div className="admin-content__header">
        <div className="admin-content__header-left">
          <h1>Core Values</h1>
          <p>Manage the principles displayed on the About page</p>
        </div>
        <div className="admin-content__header-right">
          {!editing && (
            <button className="btn-admin btn-admin--success" onClick={() => setEditing('new')}>
              + Add Value
            </button>
          )}
        </div>
      </div>

      {(editing === 'new' || editing) && (
        <div className="admin-card">
          <h3 className="admin-card__title">{editing === 'new' ? '➕ Add New Value' : '✏️ Edit Value'}</h3>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form__grid">
              <div className="admin-form__group">
                <label>Title <span className="required">*</span></label>
                <input name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="admin-form__group">
                <label>Icon Name</label>
                <select name="icon_name" value={formData.icon_name} onChange={handleChange}>
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div className="admin-form__group" style={{ gridColumn: 'span 2' }}>
                <label>Description <span className="required">*</span></label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>
              <div className="admin-form__group">
                <label>Display Order</label>
                <input name="display_order" type="number" value={formData.display_order} onChange={handleChange} />
              </div>
            </div>
            <div className="admin-form__actions">
              <button type="submit" className="btn-admin btn-admin--primary">
                {editing === 'new' ? 'Add Value' : 'Update'}
              </button>
              <button type="button" className="btn-admin btn-admin--outline" onClick={cancelEdit}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Title</th>
                <th>Description</th>
                <th>Order</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {values.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--dark-gray)' }}>
                    No values added yet.
                  </td>
                </tr>
              ) : (
                values.map(v => (
                  <tr key={v.id}>
                    <td><code>{v.icon_name}</code></td>
                    <td><strong>{v.title}</strong></td>
                    <td>{v.description}</td>
                    <td>{v.display_order}</td>
                    <td className="col-actions">
                      <button className="btn-admin btn-admin--warning btn-admin--sm" onClick={() => handleEdit(v)}>Edit</button>
                      <button className="btn-admin btn-admin--danger btn-admin--sm" onClick={() => handleDelete(v.id)}>Delete</button>
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

export default ValuesList;