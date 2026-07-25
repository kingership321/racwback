import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';

const UpcomingProgramsList = () => {
  const [programs, setPrograms] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    display_order: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await api.get('/upcoming-programs');
      
      // Safely extract array regardless of wrapper structure
      let programsArray = [];
      if (Array.isArray(res?.data)) {
        programsArray = res.data;
      } else if (Array.isArray(res?.data?.upcoming_programs)) {
        programsArray = res.data.upcoming_programs;
      } else if (Array.isArray(res?.data?.data)) {
        programsArray = res.data.data;
      }
      
      setPrograms(programsArray);
    } catch (err) {
      console.error('Error fetching upcoming programs:', err);
      setPrograms([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }
    setLoading(true);
    try {
      if (editing && editing !== 'new') {
        await api.put(`/upcoming-programs/${editing}`, formData);
      } else {
        await api.post('/upcoming-programs', formData);
      }
      setEditing(null);
      setFormData({ title: '', description: '', display_order: 0 });
      await fetchPrograms();
    } catch (err) {
      console.error('Error saving upcoming program:', err);
      alert(err.response?.data?.error || 'Error saving program');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this upcoming program?')) return;
    try {
      await api.delete(`/upcoming-programs/${id}`);
      await fetchPrograms();
    } catch (err) {
      alert(err.response?.data?.error || 'Error deleting');
    }
  };

  const handleEdit = (program) => {
    setEditing(program.id);
    setFormData({
      title: program.title,
      description: program.description || '',
      display_order: program.display_order || 0,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'display_order' ? parseInt(value) || 0 : value,
    }));
  };

  const cancelEdit = () => {
    setEditing(null);
    setFormData({ title: '', description: '', display_order: 0 });
  };

  return (
    <>
      <div className="admin-content__header">
        <div className="admin-content__header-left">
          <h1>Upcoming Programs</h1>
          <p>Manage upcoming events and initiatives</p>
        </div>
        <div className="admin-content__header-right">
          {!editing && (
            <button className="btn-admin btn-admin--success" onClick={() => setEditing('new')}>
              <FaPlus /> Add Program
            </button>
          )}
        </div>
      </div>

      {(editing === 'new' || editing) && (
        <div className="admin-card">
          <h3 className="admin-card__title">
            {editing === 'new' ? <><FaPlus /> Add New Upcoming Program</> : <><FaEdit /> Edit Program</>}
          </h3>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form__grid">
              <div className="admin-form__group" style={{ gridColumn: 'span 2' }}>
                <label>Title <span className="required">*</span></label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., CEDA Hall Awareness Video"
                  required
                />
              </div>
              <div className="admin-form__group">
                <label>Display Order</label>
                <input
                  name="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={handleChange}
                />
              </div>
              <div className="admin-form__group" style={{ gridColumn: 'span 2' }}>
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe the upcoming program..."
                />
              </div>
            </div>
            <div className="admin-form__actions">
              <button type="submit" className="btn-admin btn-admin--primary" disabled={loading}>
                <FaSave /> {editing === 'new' ? 'Add Program' : 'Update'}
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
                <th>Description</th>
                <th>Order</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--dark-gray)' }}>
                    No upcoming programs added yet.
                  </td>
                </tr>
              ) : (
                programs.map(p => (
                  <tr key={p.id}>
                    <td><strong>{p.title}</strong></td>
                    <td style={{ maxWidth: '300px', wordBreak: 'break-word' }}>
                      {p.description ? p.description.substring(0, 100) + (p.description.length > 100 ? '...' : '') : '—'}
                    </td>
                    <td>{p.display_order}</td>
                    <td className="col-actions">
                      <button className="btn-admin btn-admin--warning btn-admin--sm" onClick={() => handleEdit(p)}>
                        <FaEdit />
                      </button>
                      <button className="btn-admin btn-admin--danger btn-admin--sm" onClick={() => handleDelete(p.id)}>
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

export default UpcomingProgramsList;
