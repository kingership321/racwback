import axios from 'axios';

// Use relative `/api` by default so the frontend talks to the same origin when
// the backend is hosted alongside the frontend. For separated backends set
// `REACT_APP_API_URL` in your deployment environment (e.g. Vercel).
const API_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API request failed:', error?.response?.status, error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
