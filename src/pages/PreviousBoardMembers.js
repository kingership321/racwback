// import './PreviousBoardMembers.css';

// import board2425 from '../assets/board24.jpg';
// import board2324 from '../assets/board23.jpg';
// import board2526 from '../assets/board25.jpeg';

// function PreviousBoardMembers() {
//   return (
// <div className="previous-boards-section">
//   <div className="container">
//     <h2 className="section-title">Previous Board Members</h2>
//     <p className="section-subtitle">
//       Honoring the legacy of leadership from previous years
//     </p>
    
//     <div className="previous-boards-gallery">
//       {/* 2025-2026 Board */}
//       <div className="board-year-group">
//         <h3 className="board-year-title">Board 2025-2026</h3>
//         <div className="board-image-container">
//           <img 
//             src={board2526} 
//             alt="Rotaract Club TU Board Members 2025-2026" 
//             className="board-image"
//           />
//           <div className="board-image-overlay">
//             <div className="overlay-content">
//               <h4>Leadership Team 2025-2026</h4>
//               <p>Carrying forward the legacy of service and excellence</p>
//               {/* <span className="view-details">Click to view details</span> */}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* 2024-2025 Board */}
//       <div className="board-year-group">
//         <h3 className="board-year-title">Board 2024-2025</h3>
//         <div className="board-image-container">
//           <img 
//             src={board2425} 
//             alt="Rotaract Club TU Board Members 2024-2025" 
//             className="board-image"
//           />
//           <div className="board-image-overlay">
//             <div className="overlay-content">
//               <h4>Leadership Team 2024-2025</h4>
//               <p>Carrying forward the legacy of service and excellence</p>
//               {/* <span className="view-details">Click to view details</span> */}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* 2023-2024 Board */}
//       <div className="board-year-group">
//         <h3 className="board-year-title">Board 2023-2024</h3>
//         <div className="board-image-container">
//           <img 
//             src={board2324} 
//             alt="Rotaract Club TU Board Members 2023-2024" 
//             className="board-image"
//           />
//           <div className="board-image-overlay">
//             <div className="overlay-content">
//               <h4>Leadership Team 2023-2024</h4>
//               <p>Pioneers of innovation and community impact</p>
//               {/* <span className="view-details">Click to view details</span> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
    
//     {/* Optional: Add a note about more boards */}
//     <div className="boards-note">
//       <p>
//         <i className="fas fa-history"></i> 
//         Our legacy of leadership spans multiple years, each contributing to our club's growth and impact.
//       </p>
//     </div>
//   </div>
// </div>
//     );
// };

// export default PreviousBoardMembers;

// src/pages/PreviousBoardMembers.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './PreviousBoardMembers.css';

function PreviousBoardMembers() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await api.get('/previousboards');
        setBoards(res.data);
      } catch (error) {
        console.error('Error fetching previous boards:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBoards();
  }, []);

  if (loading) return <div className="previous-boards-section" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  if (boards.length === 0) {
    return (
      <div className="previous-boards-section">
        <div className="container">
          <h2 className="section-title">Previous Board Members</h2>
          <p style={{ textAlign: 'center', color: 'var(--dark-gray)' }}>No previous boards available.</p>
        </div>
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
          {boards.map((board) => (
            <div key={board.id} className="board-year-group">
              <h3 className="board-year-title">{board.year_label}</h3>
              <div className="board-image-container">
                <img
                  src={board.image_url}
                  alt={board.year_label}
                  className="board-image"
                />
                <div className="board-image-overlay">
                  <div className="overlay-content">
                    <h4>{board.year_label}</h4>
                    <p>Board Members</p>
                    {/* <span className="view-details">Click to view</span> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
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