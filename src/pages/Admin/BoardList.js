import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const BoardList = () => {
  const [members, setMembers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    image_url: '',
    facebook_url: '',
    linkedin_url: '',
    email: '',
    display_order: 0,
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const res = await api.get('/board');
    setMembers(res.data);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editing && editing !== 'new') {
      await api.put(`/board/${editing}`, formData);
    } else {
      // For new, remove any id field that might be present
      const { id, ...newData } = formData;
      await api.post('/board', newData);
    }
    // ... reset
  } catch (err) {
    alert(err.response?.data?.error || 'Error saving');
  }
};

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this member?')) return;
    try {
      await api.delete(`/board/${id}`);
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.error || 'Error deleting');
    }
  };

  const handleEdit = (member) => {
    setEditing(member.id);
    setFormData(member);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const cancelEdit = () => {
    setEditing(null);
    setFormData({ name: '', position: '', image_url: '', facebook_url: '', linkedin_url: '', email: '', display_order: 0 });
  };

  return (
    <>
      <div className="admin-content__header">
        <div className="admin-content__header-left">
          <h1>Board Members</h1>
          <p>Manage your club's leadership team</p>
        </div>
        <div className="admin-content__header-right">
          {!editing && (
            <button className="btn-admin btn-admin--success" onClick={() => setEditing('new')}>
              <FaPlus /> Add New
            </button>
          )}
        </div>
      </div>

      {/* Form */}
      {(editing === 'new' || editing) && (
        <div className="admin-card">
          <h3 className="admin-card__title">{editing === 'new' ? '➕ Add New Member' : '✏️ Edit Member'}</h3>
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
                <label>Image URL</label>
                <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://..." />
              </div>
              <div className="admin-form__group">
                <label>Display Order</label>
                <input name="display_order" type="number" value={formData.display_order} onChange={handleChange} />
              </div>
              <div className="admin-form__group">
                <label>Facebook URL</label>
                <input name="facebook_url" value={formData.facebook_url} onChange={handleChange} />
              </div>
              <div className="admin-form__group">
                <label>LinkedIn URL</label>
                <input name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} />
              </div>
              <div className="admin-form__group" style={{ gridColumn: 'span 2' }}>
                <label>Email</label>
                <input name="email" value={formData.email} onChange={handleChange} type="email" />
              </div>
            </div>
            <div className="admin-form__actions">
              <button type="submit" className="btn-admin btn-admin--primary">
                {editing === 'new' ? <FaPlus /> : <FaEdit />} {editing === 'new' ? 'Add Member' : 'Update'}
              </button>
              <button type="button" className="btn-admin btn-admin--outline" onClick={cancelEdit}>
                <FaTimes /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="admin-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Position</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--dark-gray)' }}>
                    No board members yet. Click "Add New" to create one.
                  </td>
                </tr>
              ) : (
                members.map(m => (
                  <tr key={m.id}>
                    <td className="cell-image">
                      {m.image_url ? <img src={m.image_url} alt={m.name} /> : <span style={{ color: '#aaa' }}>No image</span>}
                    </td>
                    <td><strong>{m.name}</strong></td>
                    <td>{m.position}</td>
                    <td className="col-actions">
                      <button className="btn-admin btn-admin--warning btn-admin--sm" onClick={() => handleEdit(m)}>
                        <FaEdit />
                      </button>
                      <button className="btn-admin btn-admin--danger btn-admin--sm" onClick={() => handleDelete(m.id)}>
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

export default BoardList;