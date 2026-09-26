const jwt = require('jsonwebtoken');
const { supabase, canQuerySupabase, markSupabaseDown } = require('../utils/supabaseClient');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  // 1. Check if token is local JWT
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'rctu-jwt-secret-key');
    if (decoded && decoded.id) {
      req.user = decoded;
      return next();
    }
  } catch (jwtErr) {
    // Not local JWT, proceed to Supabase
  }

  // 2. Try Supabase
  if (canQuerySupabase() && supabase) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error) throw error;
      req.user = user;
      return next();
    } catch (err) {
      if (err.message?.includes('fetch failed')) {
        markSupabaseDown(err);
      }
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  res.status(401).json({ error: 'Invalid token' });
};

module.exports = authMiddleware;