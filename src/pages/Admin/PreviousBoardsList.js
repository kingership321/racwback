import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaImage } from 'react-icons/fa';

const PreviousBoardsList = () => {
  const [boards, setBoards] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    year_label: '',
    image_url: '',
    display_order: 0,
  });

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    const res = await api.get('/previousboards');
    
    // Safely extract array regardless of wrapper structure
    let boardsArray = [];
    if (Array.isArray(res?.data)) {
      boardsArray = res.data;
    } else if (Array.isArray(res?.data?.previousboards)) {
      boardsArray = res.data.previousboards;
    } else if (Array.isArray(res?.data?.data)) {
      boardsArray = res.data.data;
    }
    
    setBoards(boardsArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only perform update if editing is an existing id (not 'new')
      if (editing && editing !== 'new') {
        await api.put(`/previousboards/${editing}`, formData);
      } else {
        await api.post('/previousboards', formData);
      }
      setEditing(null);
      setFormData({ year_label: '', image_url: '', display_order: 0 });
      fetchBoards();
    } catch (err) {
      alert(err.response?.data?.error || 'Error saving');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this board image?')) return;
    try {
      await api.delete(`/previousboards/${id}`);
      fetchBoards();
    } catch (err) {
      alert(err.response?.data?.error || 'Error deleting');
    }
  };

  const handleEdit = (board) => {
    setEditing(board.id);
    setFormData(board);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const cancelEdit = () => {
    setEditing(null);
    setFormData({ year_label: '', image_url: '', display_order: 0 });
  };

  return (
    <>
      <div className="admin-content__header">
        <div className="admin-content__header-left">
          <h1>Previous Boards</h1>
          <p>Manage images of past board groups</p>
        </div>
        <div className="admin-content__header-right">
          {!editing && (
            <button className="btn-admin btn-admin--success" onClick={() => setEditing('new')}>
              <FaPlus /> Add Board Image
            </button>
          )}
        </div>
      </div>

      {(editing === 'new' || editing) && (
        <div className="admin-card">
          <h3 className="admin-card__title">
            {editing === 'new' ? <><FaPlus /> Add New Board Image</> : <><FaEdit /> Edit Board Image</>}
          </h3>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form__grid">
              <div className="admin-form__group">
                <label>Year Label <span className="required">*</span></label>
                <input name="year_label" value={formData.year_label} onChange={handleChange} placeholder="e.g., Board 2024-2025" required />
              </div>
              <div className="admin-form__group">
                <label>Display Order</label>
                <input name="display_order" type="number" value={formData.display_order} onChange={handleChange} />
              </div>
              <div className="admin-form__group" style={{ gridColumn: 'span 2' }}>
                <label>Image URL <span className="required">*</span></label>
                <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://..." required />
              </div>
            </div>
            <div className="admin-form__actions">
              <button type="submit" className="btn-admin btn-admin--primary">
                <FaSave /> {editing === 'new' ? 'Add' : 'Update'}
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
                <th><FaImage /></th>
                <th>Year Label</th>
                <th>Order</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {boards.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--dark-gray)' }}>
                    No previous board images added yet.
                  </td>
                </tr>
              ) : (
                boards.map(b => (
                  <tr key={b.id}>
                    <td className="cell-image">
                      <img src={b.image_url} alt={b.year_label} />
                    </td>
                    <td><strong>{b.year_label}</strong></td>
                    <td>{b.display_order}</td>
                    <td className="col-actions">
                      <button className="btn-admin btn-admin--warning btn-admin--sm" onClick={() => handleEdit(b)}>
                        <FaEdit />
                      </button>
                      <button className="btn-admin btn-admin--danger btn-admin--sm" onClick={() => handleDelete(b.id)}>
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

export default PreviousBoardsList;