import './Quote.css';
import React, { useState, useEffect } from 'react';


function Quote() {  
  const [isVisible, setIsVisible] = useState ({
    quote:false
  });

useEffect(() => {
        const timer2 = setTimeout(() => setIsVisible(prev => ({...prev, quote: true})), 600);
            return () => {
                      clearTimeout(timer2);
                     };
  }, []);     

  return (
      <div className={`quote-section ${isVisible.quote ? 'visible' : ''}`}>
        <div className="container">
          <blockquote>
            <div className="quote-icon">
              <i className="fas fa-quote-left"></i>
            </div>
            <p>
              Rotaract members are #PeopleOfAction. We don’t wait for change to happen; we make it happen. And what do people of action do? We unite for good.
            </p>
            <footer>
              By <strong>Rtn. Francesco Arezzo</strong> (Rotary International, President RY 25-26)
            </footer>
          </blockquote>
        </div>
      </div>

  );

};

export default Quote;