import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Teams.css';

const Teams = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeYear, setActiveYear] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get('/board');
        setMembers(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const yearGroups = members.reduce((acc, member) => {
    const year = member.year || 'Unspecified';
    if (!acc[year]) acc[year] = [];
    acc[year].push(member);
    return acc;
  }, {});

  const sortedYears = Object.keys(yearGroups).sort((a, b) => {
    if (a === 'Unspecified') return 1;
    if (b === 'Unspecified') return -1;
    return Number(b) - Number(a);
  });

  useEffect(() => {
    if (!activeYear && sortedYears.length > 0) {
      setActiveYear(sortedYears[0]);
    }
  }, [sortedYears, activeYear]);

  const visibleGroups = sortedYears;

  if (loading) {
    return (
      <div className="teams-page">
        <div className="container">Loading team details...</div>
      </div>
    );
  }

  return (
    <section className="teams-page">
      <div className="container">
        <header className="teams-page__header text-center mb-5">
          <h1 className="heading-1">Teams & Member Hierarchy</h1>
          <p className="body-large text-gray">
            Discover our club’s yearly teams and expand each rota year to view its members.
          </p>
        </header>

        <div className="teams-accordion animate-fade-up delay-100">
          {visibleGroups.length === 0 ? (
            <p className="teams-tree__empty">No team members available yet.</p>
          ) : (
            visibleGroups.map((year) => {
              const yearLabel = year === 'Unspecified' ? 'Team Unspecified' : `Team ${year}/${String(Number(year) + 1).slice(-2)}`;
              const items = yearGroups[year] || [];
              const boardItems = items.filter((member) => member.role !== 'general');
              const generalItems = items.filter((member) => member.role === 'general');
              const isActive = activeYear === year;

              return (
                <div key={year} className="teams-accordion__item">
                  <button
                    type="button"
                    className={`teams-accordion__trigger ${isActive ? 'open' : ''}`}
                    onClick={() => setActiveYear(isActive ? null : year)}
                  >
                    <span>{yearLabel}</span>
                    <span className="teams-accordion__icon">{isActive ? '−' : '+'}</span>
                  </button>

                  {isActive && (
                    <div className="teams-accordion__panel">
                      {boardItems.length > 0 && (
                        <div className="teams-accordion__section">
                          <h4>Board Members</h4>
                          <div className="teams-accordion__grid">
                            {boardItems.map((member) => (
                              <article key={member.id} className="teams-tree__card">
                                <div className="teams-tree__card-photo">
                                  <img src={member.image_url} alt={member.name} />
                                </div>
                                <div>
                                  <h4>{member.name}</h4>
                                  <p>{member.position}</p>
                                  <p className="teams-tree__small">{member.committee || 'Leadership Committee'}</p>
                                  <p className="teams-tree__small">{member.contribution || 'No contribution details yet.'}</p>
                                </div>
                              </article>
                            ))}
                          </div>
                        </div>
                      )}

                      {generalItems.length > 0 && (
                        <div className="teams-accordion__section">
                          <h4>General Members</h4>
                          <div className="teams-accordion__grid">
                            {generalItems.map((member) => (
                              <article key={member.id} className="teams-tree__card teams-tree__card--small">
                                <div className="teams-tree__card-photo">
                                  <img src={member.image_url} alt={member.name} />
                                </div>
                                <div>
                                  <h5>{member.name}</h5>
                                  <p>{member.position}</p>
                                  <p className="teams-tree__small">{member.committee || 'Committee Member'}</p>
                                  <p className="teams-tree__small">{member.contribution || 'No contribution details yet.'}</p>
                                </div>
                              </article>
                            ))}
                          </div>
                        </div>
                      )}

                      {boardItems.length === 0 && generalItems.length === 0 && (
                        <p className="teams-tree__empty">No members assigned for this rota year yet.</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Teams;
