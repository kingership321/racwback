import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { defaultPreviousBoards } from '../data/defaultData';
import './PreviousBoardMembers.css';

function PreviousBoardMembers() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await api.get('/previousboards');
        const data = Array.isArray(res?.data) ? res.data : [];
        if (data.length > 0) {
          setBoards(data);
        } else {
          setBoards(defaultPreviousBoards);
        }
      } catch (error) {
        console.error('Error fetching previous boards, using fallback:', error);
        setBoards(defaultPreviousBoards);
      } finally {
        setLoading(false);
      }
    };
    fetchBoards();
  }, []);

  const displayedBoards = boards.length > 0 ? boards : defaultPreviousBoards;

  if (loading && boards.length === 0) {
    return (
      <div className="previous-boards-section" style={{ padding: '2rem', textAlign: 'center' }}>
        Loading previous boards...
      </div>
    );
  }

  return (
    <div className="previous-boards-section">
      <div className="container">
        <h2 className="section-title">Previous Board Members</h2>
        <p className="section-subtitle">
          Honoring the legacy of leadership from previous years
        </p>

        <div className="previous-boards-gallery">
          {displayedBoards.map((board, idx) => {
            const fallbackBoard = defaultPreviousBoards.find(b => b.year_label === board.year_label || b.id === board.id) || defaultPreviousBoards[idx % defaultPreviousBoards.length];
            const imageSrc = board.image_url || fallbackBoard?.image_url;

            return (
              <div key={board.id || idx} className="board-year-group">
                <h3 className="board-year-title">{board.year_label}</h3>
                <div className="board-image-container">
                  <img
                    src={imageSrc}
                    alt={board.year_label}
                    className="board-image"
                    onError={(e) => {
                      if (fallbackBoard?.image_url && e.target.src !== fallbackBoard.image_url) {
                        e.target.src = fallbackBoard.image_url;
                      }
                    }}
                  />
                  <div className="board-image-overlay">
                    <div className="overlay-content">
                      <h4>{board.year_label}</h4>
                      <p>Leadership Team</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="boards-note">
          <p>
            <i className="fas fa-history"></i>
            Our legacy of leadership spans multiple years, each contributing to our club's growth and impact.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PreviousBoardMembers;