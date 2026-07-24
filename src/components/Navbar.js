// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import logo from '../assets/logo.png';
// import { FaHome, FaInfoCircle, FaPhone, FaList, FaImage, FaUser, FaUserCog, FaSignOutAlt } from 'react-icons/fa';
// import './Navbar.css';
// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeLink, setActiveLink] = useState('');
//   const location = useLocation();
//   const navbarRef = useRef(null);

//   // Close menu when route changes
//   useEffect(() => {
//     setIsOpen(false);
//     setActiveLink(location.pathname);
//   }, [location]);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLinkClick = () => {
//     // Close menu on mobile after clicking a link
//     if (window.innerWidth < 768) {
//       // Add closing animation class
//       if (navbarRef.current) {
//         navbarRef.current.classList.add('folding');
//       }
      
//       // Close menu after animation completes
//       setTimeout(() => {
//         setIsOpen(false);
//         if (navbarRef.current) {
//           navbarRef.current.classList.remove('folding');
//         }
//       }, 300);
//     }
//   };

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (window.innerWidth < 768 && 
//           isOpen &&
//           navbarRef.current &&
//           !navbarRef.current.contains(event.target) &&
//           !event.target.closest('.navbar-toggle')) {
//         handleLinkClick();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen]);

//   // Close menu on escape key
//   useEffect(() => {
//     const handleEscapeKey = (event) => {
//       if (event.key === 'Escape' && isOpen) {
//         handleLinkClick();
//       }
//     };

//     document.addEventListener('keydown', handleEscapeKey);
//     return () => {
//       document.removeEventListener('keydown', handleEscapeKey);
//     };
//   }, [isOpen]);

//   return (
//     <>
//       <nav className="custom-navbar">
//         <div className="navbar-brand">
//           <img src={logo} alt="RCTU Logo" className="navbar-logo" />
//           {/* // Replace this line in your JSX:
//           <span>Rotaract Club of Tribhuvan University</span>

//           // With this: */}
//           {"Rotaract Club Of Tribhuvan University".split('').map((letter, index) => (
//             <span key={index}>
//               {letter === ' ' ? '\u00A0' : letter}
//             </span>
//           ))}
//           <button 
//             className={`navbar-toggle ${isOpen ? 'active' : ''}`}
//             onClick={toggleMenu}
//             aria-label="Toggle navigation"
//             aria-expanded={isOpen}
//           >
//             <span></span>
//             <span></span>
//             <span></span>
//           </button>
//         </div>

//         <ul 
//           ref={navbarRef}
//           className={`navbar-menu ${isOpen ? 'open' : ''}`}
//           aria-hidden={!isOpen}
//         >
//           <li>
//             <Link 
//               to="/" 
//               className={activeLink === '/' ? 'nav-link-active' : ''}
//               onClick={handleLinkClick}
//             >
//               <FaHome className="nav-icon" /> Home
//             </Link>
//           </li>
//           <li>
//             <Link 
//               to="/about" 
//               className={activeLink === '/about' ? 'nav-link-active' : ''}
//               onClick={handleLinkClick}
//             >
//               <FaInfoCircle className="nav-icon" /> About
//             </Link>
//           </li>
//           <li>
//             <Link 
//               to="/contact" 
//               className={activeLink === '/contact' ? 'nav-link-active' : ''}
//               onClick={handleLinkClick}
//             >
//               <FaPhone className="nav-icon" /> Contact
//             </Link>
//           </li>
//           <li>
//             <Link 
//               to="/programs" 
//               className={activeLink === '/programs' ? 'nav-link-active' : ''}
//               onClick={handleLinkClick}
//             >
//               <FaList className="nav-icon" /> Programs
//             </Link>
//           </li>
//           <li>
//             <Link 
//               to="/imagegallery" 
//               className={activeLink === '/imagegallery' ? 'nav-link-active' : ''}
//               onClick={handleLinkClick}
//             >
//               <FaImage className="nav-icon" /> Gallery
//             </Link>
//           </li>
//           <li>
//             <a 
//               href="https://my.rotaract3292.org/software" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="nav-link"
//               onClick={handleLinkClick}
//             >
//               <FaUser className="nav-icon" /> Login My Rotaract
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// }

// export default Navbar;


import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import { FaHome, FaInfoCircle, FaPhone, FaList, FaImage, FaUser, FaUserCog, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const { user, logout } = useAuth();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveLink(location.pathname);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    // Close menu on mobile after clicking a link
    if (window.innerWidth < 768) {
      if (navbarRef.current) {
        navbarRef.current.classList.add('folding');
      }
      setTimeout(() => {
        setIsOpen(false);
        if (navbarRef.current) {
          navbarRef.current.classList.remove('folding');
        }
      }, 300);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    handleLinkClick();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 768 && 
          isOpen &&
          navbarRef.current &&
          !navbarRef.current.contains(event.target) &&
          !event.target.closest('.navbar-toggle')) {
        handleLinkClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        handleLinkClick();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  // Determine if user is admin
  const isAdmin = user && user.role === 'admin';

  return (
    <>
      <nav className="custom-navbar">
        <div className="navbar-brand">
          <img src={logo} alt="RCTU Logo" className="navbar-logo" />
          {"Rotaract Club Of Tribhuvan University".split('').map((letter, index) => (
            <span key={index}>
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
          <button 
            className={`navbar-toggle ${isOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <ul 
          ref={navbarRef}
          className={`navbar-menu ${isOpen ? 'open' : ''}`}
          aria-hidden={!isOpen}
        >
          <li>
            <Link 
              to="/" 
              className={activeLink === '/' ? 'nav-link-active' : ''}
              onClick={handleLinkClick}
            >
              <FaHome className="nav-icon" /> Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={activeLink === '/about' ? 'nav-link-active' : ''}
              onClick={handleLinkClick}
            >
              <FaInfoCircle className="nav-icon" /> About
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={activeLink === '/contact' ? 'nav-link-active' : ''}
              onClick={handleLinkClick}
            >
              <FaPhone className="nav-icon" /> Contact
            </Link>
          </li>
          <li>
            <Link 
              to="/programs" 
              className={activeLink === '/programs' ? 'nav-link-active' : ''}
              onClick={handleLinkClick}
            >
              <FaList className="nav-icon" /> Programs
            </Link>
          </li>
          <li>
            <Link 
              to="/imagegallery" 
              className={activeLink === '/imagegallery' ? 'nav-link-active' : ''}
              onClick={handleLinkClick}
            >
              <FaImage className="nav-icon" /> Gallery
            </Link>
          </li>
          <li>
            <a 
              href="https://my.rotaract3292.org/software" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
              onClick={handleLinkClick}
            >
              <FaUser className="nav-icon" /> Login My Rotaract
            </a>
          </li>
          
          {/* Admin link – only visible if logged in and admin */}
          {isAdmin && (
            <li>
              <Link 
                to="/admin" 
                className={activeLink.startsWith('/admin') ? 'nav-link-active' : ''}
                onClick={handleLinkClick}
              >
                <FaUserCog className="nav-icon" /> Admin
              </Link>
            </li>
          )}

          {/* Logout – only visible if logged in */}
          {user && (
            <li>
              <button 
                className="nav-link nav-link-logout"
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '8px 12px',
                  width: '100%',
                  fontFamily: 'inherit',
                  fontSize: '0.8rem',
                }}
              >
                <FaSignOutAlt className="nav-icon" /> Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;  