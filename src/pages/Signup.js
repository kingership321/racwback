import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css'; // shared auth styles with Login

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signup(email, password, fullName);
      if (user) {
        // If user is created and auto-logged in, redirect to admin
        navigate('/admin');
      } else {
        // If email confirmation is required
        alert('Signup successful! Please check your email to confirm.');
        navigate('/login');
      }
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h2 className="auth-card__title">Create Account</h2>
          <p className="auth-card__subtitle">Join the Rotaract Club of TU</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__group">
            <label className="auth-form__label">Full Name</label>
            <input
              type="text"
              className="auth-form__input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="auth-form__group">
            <label className="auth-form__label">Email</label>
            <input
              type="email"
              className="auth-form__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="auth-form__group">
            <label className="auth-form__label">Password</label>
            <input
              type="password"
              className="auth-form__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="auth-form__button">
            Sign Up
          </button>
        </form>

        <div className="auth-card__footer">
          <span className="text-gray">Already have an account?</span>{' '}
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;