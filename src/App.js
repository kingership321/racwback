import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Notice from './components/Notice';
import Home from './pages/Home1';
import About from './pages/About';
import Contact from './pages/Contact';
import Programs from './pages/Programs';
import Footer from './components/Footer';
import ImageGallery from './pages/ImageGallery';
import Login from './pages/Login';
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import BoardList from './pages/Admin/BoardList';
import ProgramList from './pages/Admin/ProgramList';
import UpcomingProgramsList from './pages/Admin/UpcomingProgramsList';
import CharterList from './pages/Admin/CharterList';
import StatsList from './pages/Admin/StatsList';
import ValuesList from './pages/Admin/ValuesList';
import ThemesList from './pages/Admin/ThemesList';
import PreviousBoardsList from './pages/Admin/PreviousBoardsList';
import Settings from './pages/Admin/Settings';
import Teams from './pages/Teams';
import api from './services/api';
import { defaultStartupBanner } from './data/defaultData';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [bannerConfig, setBannerConfig] = useState(defaultStartupBanner);

  useEffect(() => {
    const fetchBannerSetting = async () => {
      try {
        const res = await api.get('/settings/startup_banner');
        if (res.data && res.data.value) {
          const val = typeof res.data.value === 'string' ? JSON.parse(res.data.value) : res.data.value;
          setBannerConfig(prev => ({ ...prev, ...val }));
          if (val.enabled === false) {
            setShowPopup(false);
          }
        }
      } catch (err) {
        // Fallback to default banner
      }
    };
    fetchBannerSetting();
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowPopup(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          {showPopup && bannerConfig.enabled !== false && (
            <div className="startup-banner-overlay" onClick={handleClosePopup}>
              <div className="startup-banner-card" onClick={(e) => e.stopPropagation()}>
                <button
                  className="startup-banner-close"
                  onClick={handleClosePopup}
                  aria-label="Close banner"
                >
                  ×
                </button>
                <a
                  href={bannerConfig.link_url || 'https://rotaractcluboftu.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="startup-banner-link"
                >
                  <img
                    src={bannerConfig.image_url || bannerConfig.image}
                    alt={bannerConfig.title || 'Rotaract Club Announcement'}
                    className="startup-banner-image"
                    onError={(e) => {
                      e.target.src = defaultStartupBanner.image_url;
                    }}
                  />
                </a>
              </div>
            </div>
          )}
          <Navbar />
          <Notice />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/imagegallery" element={<ImageGallery />} />
            <Route path="/gallery" element={<ImageGallery />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Navigate to="/login" replace />} />

            <Route path="/admin" element={
              <PrivateRoute adminOnly>
                <AdminLayout />
              </PrivateRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="board" element={<BoardList />} />
              <Route path="programs" element={<ProgramList />} />
              <Route path="upcoming-programs" element={<UpcomingProgramsList />} />
              <Route path="charter" element={<CharterList />} />
              <Route path="stats" element={<StatsList />} />
              <Route path="values" element={<ValuesList />} />
              <Route path="themes" element={<ThemesList />} />
              <Route path="previousboards" element={<PreviousBoardsList />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;