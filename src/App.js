import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Signup from './pages/Signup';
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
import './App.css';

function App() {
  // popup banner logic (keep as is)
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          {/* popup component */}
          <Navbar />
          <Notice />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/imagegallery" element={<ImageGallery />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

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