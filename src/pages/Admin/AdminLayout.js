import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaHome, 
  FaUsers, 
  FaCalendarAlt, 
  FaComment, 
  FaChartBar, 
  FaGem, 
  FaBullseye, 
  FaImages, 
  FaCog, 
  FaSignOutAlt 
} from 'react-icons/fa';
import './AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="logo-icon">⚙️</span>
          <h2>Admin Panel</h2>
          <small>RACTU Dashboard</small>
        </div>

        <nav>
          <Link to="/admin/dashboard" className={isActive('/admin/dashboard') ? 'active' : ''}>
            <span className="nav-icon"><FaHome /></span> Dashboard
          </Link>
          <Link to="/admin/board" className={isActive('/admin/board') ? 'active' : ''}>
            <span className="nav-icon"><FaUsers /></span> Board Members
          </Link>
          <Link to="/admin/programs" className={isActive('/admin/programs') ? 'active' : ''}>
            <span className="nav-icon"><FaCalendarAlt /></span> Programs
          </Link>
          <Link to="/admin/upcoming-programs" className={isActive('/admin/upcoming-programs') ? 'active' : ''}>
            <span className="nav-icon"><FaCalendarAlt /></span> Upcoming Programs
          </Link>
          <Link to="/admin/charter" className={isActive('/admin/charter') ? 'active' : ''}>
            <span className="nav-icon"><FaComment /></span> Charter Messages
          </Link>
          <Link to="/admin/stats" className={isActive('/admin/stats') ? 'active' : ''}>
            <span className="nav-icon"><FaChartBar /></span> Statistics
          </Link>
          <Link to="/admin/values" className={isActive('/admin/values') ? 'active' : ''}>
            <span className="nav-icon"><FaGem /></span> Core Values
          </Link>
          <Link to="/admin/themes" className={isActive('/admin/themes') ? 'active' : ''}>
            <span className="nav-icon"><FaBullseye /></span> Themes
          </Link>
          <Link to="/admin/previousboards" className={isActive('/admin/previousboards') ? 'active' : ''}>
            <span className="nav-icon"><FaImages /></span> Previous Boards
          </Link>
          <Link to="/admin/settings" className={isActive('/admin/settings') ? 'active' : ''}>
            <span className="nav-icon"><FaCog /></span> Settings
          </Link>
        </nav>

        <button className="admin-sidebar__logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;