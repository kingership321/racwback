import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import api from '../services/api';
import { defaultBoardMembers } from '../data/defaultData';
import './BoardMemberSection.css';

const BoardMemberSection = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCurrentRotaYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    return today.getMonth() >= 6 ? year : year - 1;
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get('/board');
        const data = Array.isArray(res?.data) ? res.data : [];
        if (data.length > 0) {
          setMembers(data);
        } else {
          setMembers(defaultBoardMembers);
        }
      } catch (error) {
        console.error('Error fetching board members, using fallback:', error);
        setMembers(defaultBoardMembers);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const allMembers = members.length > 0 ? members : defaultBoardMembers;
  const currentRotaYear = getCurrentRotaYear();

  // Filter for board members of current rota year
  const yearFiltered = allMembers.filter((member) => {
    const year = Number(member.year);
    const isBoard = member.role !== 'general';
    return isBoard && (year === currentRotaYear || !member.year);
  });

  // If year filter matches none, fallback to all board members
  const boardMembersToDisplay = yearFiltered.length > 0
    ? yearFiltered
    : allMembers.filter(m => m.role !== 'general');

  if (loading && members.length === 0) {
    return <div className="container text-center" style={{ padding: '2rem' }}>Loading board members...</div>;
  }

  return (
    <section className="board-members">
      <div className="container">
        <div className="board-members__header text-center mb-5">
          <h2 className="heading-2 heading-underline heading-center">Our Board Members</h2>
          <p className="lead text-gray">
            Meet the dedicated team leading our club towards positive change.
          </p>
        </div>

        <div className="board-members__grid">
          {boardMembersToDisplay.map((member) => {
            const fallbackMember = defaultBoardMembers.find(m => m.name === member.name || m.id === member.id);
            const imageSrc = member.image_url || fallbackMember?.image_url;
            const fb = member.facebook_url || member.facebook || fallbackMember?.facebook_url;
            const li = member.linkedin_url || member.linkedin || fallbackMember?.linkedin_url;
            const em = member.email || fallbackMember?.email;

            return (
              <div key={member.id} className="board-member-card card">
                <div className="board-member-card__image">
                  <img 
                    src={imageSrc} 
                    alt={member.name}
                    className="board-member-card__photo img-responsive img-circle"
                    onError={(e) => {
                      if (fallbackMember?.image_url && e.target.src !== fallbackMember.image_url) {
                        e.target.src = fallbackMember.image_url;
                      }
                    }}
                  />
                  <div className="board-member-card__socials">
                    {fb && (
                      <a href={fb} target="_blank" rel="noopener noreferrer" className="board-member-card__social-link" aria-label="Facebook">
                        <FaFacebook />
                      </a>
                    )}
                    {li && (
                      <a href={li} target="_blank" rel="noopener noreferrer" className="board-member-card__social-link" aria-label="LinkedIn">
                        <FaLinkedin />
                      </a>
                    )}
                    {em && (
                      <a href={`mailto:${em}`} className="board-member-card__social-link" aria-label="Email">
                        <FaEnvelope />
                      </a>
                    )}
                  </div>
                </div>
                <div className="board-member-card__info text-center">
                  <h3 className="board-member-card__name heading-5">{member.name}</h3>
                  <p className="board-member-card__position body-small">{member.position}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="board-members__cta">
          <Link to="/teams" className="btn btn-primary">
            Know more about our Teams
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BoardMemberSection;