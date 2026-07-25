import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaImage } from 'react-icons/fa';

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    place: '',
    coorganizer: '',
    display_order: 0,
  });
  const [imageList, setImageList] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    const res = await api.get('/programs');
    
    // Safely extract array regardless of wrapper structure
    let programsArray = [];
    if (Array.isArray(res?.data)) {
      programsArray = res.data;
    } else if (Array.isArray(res?.data?.programs)) {
      programsArray = res.data.programs;
    } else if (Array.isArray(res?.data?.data)) {
      programsArray = res.data.data;
    }
    
    setPrograms(programsArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only update when editing refers to an existing id (not the 'new' sentinel)
      if (editing && editing !== 'new') {
        await api.put(`/programs/${editing}`, formData);
      } else {
        const res = await api.post('/programs', formData);
        setEditing(res.data.id);
        fetchPrograms();
        const updated = await api.get('/programs');
        
       // Safely extract array
       let updatedPrograms = [];
       if (Array.isArray(updated?.data)) {
         updatedPrograms = updated.data;
       } else if (Array.isArray(updated?.data?.programs)) {
         updatedPrograms = updated.data.programs;
       } else if (Array.isArray(updated?.data?.data)) {
         updatedPrograms = updated.data.data;
       }
        
       setPrograms(updatedPrograms);
       const prog = updatedPrograms.find(p => p.id === res.data.id);
       setImageList(prog?.program_images || []);
        setFormData({ title: '', date: '', place: '', coorganizer: '', display_order: 0 });
        return;
      }
      setEditing(null);
      setFormData({ title: '', date: '', place: '', coorganizer: '', display_order: 0 });
      setImageList([]);
      fetchPrograms();
    } catch (err) {
      alert(err.response?.data?.error || 'Error saving');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this program?')) return;
    try {
      await api.delete(`/programs/${id}`);
      fetchPrograms();
    } catch (err) {
      alert(err.response?.data?.error || 'Error deleting');
    }
  };

  const handleEdit = (program) => {
    setEditing(program.id);
    setFormData({
      title: program.title,
      date: program.date || '',
      place: program.place || '',
      coorganizer: program.coorganizer || '',
      display_order: program.display_order || 0,
    });
    setImageList(program.program_images || []);
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;
    try {
      const res = await api.post(`/programs/${editing}/images`, {
        image_url: newImageUrl,
        display_order: imageList.length,
      });
      setImageList([...imageList, res.data]);
      setNewImageUrl('');
      fetchPrograms();
    } catch (err) {
      alert(err.response?.data?.error || 'Error adding image');
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await api.delete(`/programs/images/${imageId}`);
      setImageList(imageList.filter(img => img.id !== imageId));
      fetchPrograms();
    } catch (err) {
      alert(err.response?.data?.error || 'Error deleting image');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const cancelEdit = () => {
    setEditing(null);
    setFormData({ title: '', date: '', place: '', coorganizer: '', display_order: 0 });
    setImageList([]);
  };

  return (
    <>
      <div className="admin-content__header">
        <div className="admin-content__header-left">
          <h1>Programs</h1>
          <p>Manage events and activities</p>
        </div>
        <div className="admin-content__header-right">
          {!editing && (
            <button className="btn-admin btn-admin--success" onClick={() => setEditing('new')}>
              <FaPlus /> Add New Program
            </button>
          )}
        </div>
      </div>

      {(editing === 'new' || editing) && (
        <div className="admin-card">
          <h3 className="admin-card__title">
            {editing === 'new' ? <><FaPlus /> Add New Program</> : <><FaEdit /> Edit Program</>}
          </h3>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form__grid">
              <div className="admin-form__group" style={{ gridColumn: 'span 2' }}>
                <label>Title <span className="required">*</span></label>
                <input name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="admin-form__group">
                <label>Date</label>
                <input name="date" value={formData.date} onChange={handleChange} placeholder="e.g., July 19, 2025" />
              </div>
              <div className="admin-form__group">
                <label>Place</label>
                <input name="place" value={formData.place} onChange={handleChange} placeholder="Location" />
              </div>
              <div className="admin-form__group">
                <label>Co-organizer</label>
                <input name="coorganizer" value={formData.coorganizer} onChange={handleChange} />
              </div>
              <div className="admin-form__group">
                <label>Display Order</label>
                <input name="display_order" type="number" value={formData.display_order} onChange={handleChange} />
              </div>
            </div>
            <div className="admin-form__actions">
              <button type="submit" className="btn-admin btn-admin--primary">
                <FaSave /> {editing === 'new' ? 'Create Program' : 'Update'}
              </button>
              <button type="button" className="btn-admin btn-admin--outline" onClick={cancelEdit}>
                <FaTimes /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {editing && editing !== 'new' && (
        <div className="admin-card">
          <h3 className="admin-card__title"><FaImage /> Manage Images</h3>
          <form className="admin-add-image-form" onSubmit={handleAddImage}>
            <input
              type="text"
              value={newImageUrl}
              onChange={e => setNewImageUrl(e.target.value)}
              placeholder="Image URL (e.g., https://...)"
              required
            />
            <button type="submit" className="btn-admin btn-admin--primary"><FaPlus /> Add Image</button>
          </form>
          <div className="admin-images-grid">
            {imageList.map(img => (
              <div key={img.id} className="admin-image-item">
                <img src={img.image_url} alt="Program" />
                <div className="image-order">Order: {img.display_order}</div>
                <button className="btn-admin btn-admin--danger btn-admin--sm" onClick={() => handleDeleteImage(img.id)}>
                  <FaTrash />
                </button>
              </div>
            ))}
            {imageList.length === 0 && <p style={{ color: 'var(--dark-gray)' }}>No images added yet.</p>}
          </div>
        </div>
      )}

      <div className="admin-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Place</th>
                <th>Images</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--dark-gray)' }}>
                    No programs yet. Click "Add New Program" to start.
                  </td>
                </tr>
              ) : (
                programs.map(p => (
                  <tr key={p.id}>
                    <td><strong>{p.title}</strong></td>
                    <td>{p.date || '—'}</td>
                    <td>{p.place || '—'}</td>
                    <td>{(p.program_images || []).length}</td>
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

export default ProgramList;