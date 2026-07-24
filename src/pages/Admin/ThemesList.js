import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ThemesList = () => {
  const [themes, setThemes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    display_order: 0,
  });

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    const res = await api.get('/themes');
    setThemes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only update when editing refers to an existing id (not 'new')
      if (editing && editing !== 'new') {
        await api.put(`/themes/${editing}`, formData);
      } else {
        await api.post('/themes', formData);
      }
      setEditing(null);
      setFormData({ title: '', description: '', image_url: '', display_order: 0 });
      fetchThemes();
    } catch (err) {
      alert(err.response?.data?.error || 'Error saving');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this theme?')) return;
    try {
      await api.delete(`/themes/${id}`);
      fetchThemes();
    } catch (err) {
      alert(err.response?.data?.error || 'Error deleting');
    }
  };

  const handleEdit = (theme) => {
    setEditing(theme.id);
    setFormData(theme);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const cancelEdit = () => {
    setEditing(null);
    setFormData({ title: '', description: '', image_url: '', display_order: 0 });
  };

  return (
    <>
      <div className="admin-content__header">
        <div className="admin-content__header-left">
          <h1>Themes</h1>
          <p>Manage the themes (District & Presidential) shown on the homepage</p>
        </div>
        <div className="admin-content__header-right">
          {!editing && (
            <button className="btn-admin btn-admin--success" onClick={() => setEditing('new')}>
              + Add Theme
            </button>
          )}
        </div>
      </div>

      {(editing === 'new' || editing) && (
        <div className="admin-card">
          <h3 className="admin-card__title">{editing === 'new' ? '➕ Add New Theme' : '✏️ Edit Theme'}</h3>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form__grid">
              <div className="admin-form__group" style={{ gridColumn: 'span 2' }}>
                <label>Title <span className="required">*</span></label>
                <input name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="admin-form__group" style={{ gridColumn: 'span 2' }}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Full description (can include multiple paragraphs)"
                />
              </div>
              <div className="admin-form__group" style={{ gridColumn: 'span 2' }}>
                <label>Image URL</label>
                <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://..." />
              </div>
              <div className="admin-form__group">
                <label>Display Order</label>
                <input name="display_order" type="number" value={formData.display_order} onChange={handleChange} />
              </div>
            </div>
            <div className="admin-form__actions">
              <button type="submit" className="btn-admin btn-admin--primary">
                {editing === 'new' ? 'Add Theme' : 'Update'}
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
                <th>Image</th>
                <th>Title</th>
                <th>Order</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {themes.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--dark-gray)' }}>
                    No themes added yet.
                  </td>
                </tr>
              ) : (
                themes.map(t => (
                  <tr key={t.id}>
                    <td className="cell-image">
                      {t.image_url ? <img src={t.image_url} alt={t.title} /> : <span style={{ color: '#aaa' }}>No image</span>}
                    </td>
                    <td><strong>{t.title}</strong></td>
                    <td>{t.display_order}</td>
                    <td className="col-actions">
                      <button className="btn-admin btn-admin--warning btn-admin--sm" onClick={() => handleEdit(t)}>Edit</button>
                      <button className="btn-admin btn-admin--danger btn-admin--sm" onClick={() => handleDelete(t.id)}>Delete</button>
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

export default ThemesList;