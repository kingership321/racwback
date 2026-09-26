import React from 'react';
import { Navigate } from 'react-router-dom';

// Public registration is disabled; redirect directly to Login
const Signup = () => {
  return <Navigate to="/login" replace />;
};

export default Signup;