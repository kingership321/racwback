import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './CharterPresident.css';
import ractuLogo from '../assets/logo1.jpg'; // keep logo, but can be made dynamic later

const CharterPresident = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get('/charter');
        setMessages(res.data);
      } catch (error) {
        console.error('Error fetching charter messages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;

  const renderMessage = (messageArray) => {
    if (!messageArray || !Array.isArray(messageArray)) return null;
    return messageArray.map((para, idx) => (
      <p key={idx} className="charter-president__paragraph body-large">
        {para.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < para.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    ));
  };

  return (
    <div className="charter-president">
      <div className="container">
        {messages.map((item) => {
          const isCharterPresident = item.type === 'charter_president';
          const isDRR = item.type === 'drr';
          const isZRR = item.type === 'zrr';
          const isParent = item.type === 'parent_president';
          const isSister = item.type === 'sister_president';

          let headerTitle = '';
          if (isCharterPresident) headerTitle = 'Message from Our Charter President';
          else if (isDRR) headerTitle = 'Message from Our DRR';
          else if (isZRR) headerTitle = 'Message from Our ZRR';
          else if (isParent) headerTitle = 'Message from Our Parent Club President';
          else if (isSister) headerTitle = 'Message from Our Sister Club President';
          else headerTitle = 'Message';

          return (
            <div key={item.id} className="charter-president__card card card-lg">
              <div className="charter-president__header text-center mb-4">
                <h2 className="charter-president__title heading-3">{headerTitle}</h2>
              </div>

              <div className="charter-president__content">
                <div className="charter-president__image-container">
                  <div className="charter-president__image-wrapper">
                    <img
                      src={item.image_url || '/placeholder-image.jpg'} // fallback
                      alt={item.name}
                      className="charter-president__image-fixed"
                      onError={(e) => { e.target.src = '/placeholder-image.jpg'; }} // handle broken images
                    />
                  </div>
                </div>

                <div className="charter-president__person-info text-center">
                  <h3 className="charter-president__name heading-3">{item.name}</h3>
                  <p className="charter-president__position">{item.position}</p>
                  {item.organization && (
                    <p className="charter-president__organization body-small">{item.organization}</p>
                  )}
                  {item.term && (
                    <p className="charter-president__term body-small">{item.term}</p>
                  )}
                  <div className="charter-president__logo">
                    <img className="charter-president__logo-image img-responsive" src={ractuLogo} alt="RACTU logo" />
                  </div>
                </div>

                <div className="charter-president__text">
                  {renderMessage(item.message)}

                  <div className="charter-president__footer text-center">
                    <p className="charter-president__closing body-large">
                      {isCharterPresident ? 'Warm regards,' :
                       isDRR ? 'Warm regards,' :
                       isZRR ? 'With warm regards and utmost admiration,' :
                       isParent ? 'With warm regards,' :
                       isSister ? 'With warm regards and utmost admiration,' :
                       'Warm regards,'}
                    </p>
                    <p className="charter-president__signatory body-large font-semibold">{item.name}</p>
                    <p className="charter-president__signatory-position body-small">{item.position}</p>
                    {item.organization && (
                      <p className="charter-president__organization_1 body-small">{item.organization}</p>
                    )}
                    {item.term && (
                      <p className="charter-president__term body-small">{item.term}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharterPresident;