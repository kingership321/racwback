import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
        .then(res => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/signin', { email, password });
      console.debug('signin response', res?.data);
      const { session } = res.data || {};
      if (!session || !session.access_token) {
        // If response shape is different, throw a descriptive error
        throw new Error('Signin did not return a session with access_token: ' + JSON.stringify(res?.data));
      }
      localStorage.setItem('token', session.access_token);
      // Fetch user profile with role
      const meRes = await api.get('/auth/me');
      console.debug('/auth/me response', meRes?.data);
      setUser(meRes.data);
      return meRes.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const signup = async (email, password, full_name) => {
    try {
      const res = await api.post('/auth/signup', { email, password, full_name });
      const { session } = res.data;
      if (session) {
        localStorage.setItem('token', session.access_token);
        const meRes = await api.get('/auth/me');
        setUser(meRes.data);
        return meRes.data;
      } else {
        // If no session (e.g., email confirmation required), still return user
        return res.data.user;
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);