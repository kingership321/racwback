import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      const message = err.response?.data?.error || err.response?.data?.message || err.message;
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h2 className="auth-card__title">Login</h2>
          <p className="auth-card__subtitle">Welcome back to RACTU Admin</p>
        </div>

        {errorMsg && (
          <div className="auth-alert auth-alert--error" style={{
            padding: '12px 16px',
            marginBottom: '16px',
            borderRadius: '8px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#b91c1c',
            fontSize: '14px',
            lineHeight: 1.5
          }}>
            {errorMsg}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__group">
            <label className="auth-form__label">Username</label>
            <input
              type="text"
              className="auth-form__input"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              required
            />
          </div>
          <div className="auth-form__group">
            <label className="auth-form__label">Password</label>
            <input
              type="password"
              className="auth-form__input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="auth-form__button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;