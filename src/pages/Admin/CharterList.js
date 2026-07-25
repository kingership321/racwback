import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const CharterList = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    organization: '',
    term: '',
    image_url: '',
    message: '',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await api.get('/charter');
    
    // Safely extract array regardless of wrapper structure
    let itemsArray = [];
    if (Array.isArray(res?.data)) {
      itemsArray = res.data;
    } else if (Array.isArray(res?.data?.charter)) {
      itemsArray = res.data.charter;
    } else if (Array.isArray(res?.data?.data)) {
      itemsArray = res.data.data;
    }
    
    setItems(itemsArray);
  };

  const handleEdit = (item) => {
    setEditing(item.id);
    const messageText = Array.isArray(item.message) ? item.message.join('\n\n') : item.message;
    setFormData({
      name: item.name,
      position: item.position,
      organization: item.organization || '',
      term: item.term || '',
      image_url: item.image_url || '',
      message: messageText,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const messageArray = formData.message.split('\n\n').filter(p => p.trim() !== '');
      const payload = { ...formData, message: messageArray };
      await api.put(`/charter/${editing}`, payload);
      setEditing(null);
      setFormData({ name: '', position: '', organization: '', term: '', image_url: '', message: '' });
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.error || 'Error saving');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const cancelEdit = () => {
    setEditing(null);
    setFormData({ name: '', position: '', organization: '', term: '', image_url: '', message: '' });
  };

  return (
    <>
      <div className="admin-content__header">
        <div className="admin-content__header-left">
          <h1>Charter Messages</h1>
          <p>Edit messages from leaders (Charter President, DRR, ZRR, etc.)</p>
        </div>
      </div>

      {editing && (
        <div className="admin-card">
          <h3 className="admin-card__title"><FaEdit /> Editing: {items.find(i => i.id === editing)?.type}</h3>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form__grid">
              <div className="admin-form__group">
                <label>Name <span className="required">*</span></label>
                <input name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="admin-form__group">
                <label>Position <span className="required">*</span></label>
                <input name="position" value={formData.position} onChange={handleChange} required />
              </div>
              <div className="admin-form__group">
                <label>Organization</label>
                <input name="organization" value={formData.organization} onChange={handleChange} />
              </div>
              <div className="admin-form__group">
                <label>Term</label>
                <input name="term" value={formData.term} onChange={handleChange} placeholder="e.g., RY 2025–26" />
              </div>
              <div className="admin-form__group" style={{ gridColumn: 'span 2' }}>
                <label>Image URL</label>
                <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://..." />
              </div>
              <div className="admin-form__group" style={{ gridColumn: 'span 2' }}>
                <label>Message <span className="required">*</span></label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="10"
                  placeholder="Separate paragraphs with two newlines (press Enter twice)"
                  required
                />
              </div>
            </div>
            <div className="admin-form__actions">
              <button type="submit" className="btn-admin btn-admin--primary">
                <FaSave /> Update
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
                <th>Type</th>
                <th>Name</th>
                <th>Position</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--dark-gray)' }}>
                    No charter messages found. Please add them to the database.
                  </td>
                </tr>
              ) : (
                items.map(item => (
                  <tr key={item.id}>
                    <td><code>{item.type}</code></td>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.position}</td>
                    <td className="col-actions">
                      <button className="btn-admin btn-admin--warning btn-admin--sm" onClick={() => handleEdit(item)}>
                        <FaEdit />
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

export default CharterList;