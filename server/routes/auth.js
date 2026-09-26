const express = require('express');
const jwt = require('jsonwebtoken');
const { supabase, supabaseAdmin, canQuerySupabase, markSupabaseDown } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

const isNetworkError = (err) => {
  if (!err) return false;
  const msg = (err.message || '').toLowerCase();
  const code = (err.code || '').toLowerCase();
  return msg.includes('fetch failed') || msg.includes('enotfound') || msg.includes('econnrefused') || code === 'enotfound' || code === 'econnrefused';
};

// Sign in
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = (email || '').toLowerCase().trim();
  const localAdminEmail = (process.env.ADMIN_EMAIL || 'kingership321@gmail.com').toLowerCase().trim();
  const localAdminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  console.log('Login attempt:', normalizedEmail);

  // 1. Check admin credentials (supports BOTH online and offline seamlessly)
  if (normalizedEmail === localAdminEmail && password === localAdminPassword) {
    if (canQuerySupabase() && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
        if (!error && data?.session) {
          return res.json({ user: data.user, session: data.session });
        }
      } catch (err) {
        console.warn('Supabase signin attempt failed, falling back to local admin session:', err.message);
      }
    }

    // Offline / Fallback admin token
    const token = jwt.sign(
      { id: 'local-admin-id', email: localAdminEmail, role: 'admin', full_name: 'Administrator' },
      process.env.JWT_SECRET || 'rctu-jwt-secret-key',
      { expiresIn: '7d' }
    );
    return res.json({
      user: {
        id: 'local-admin-id',
        email: localAdminEmail,
        role: 'admin',
        user_metadata: { full_name: 'Administrator' }
      },
      session: {
        access_token: token,
        token_type: 'bearer',
        expires_in: 604800
      }
    });
  }

  // 2. Try Supabase for other users if available
  if (canQuerySupabase() && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
      if (error) {
        if (isNetworkError(error)) {
          markSupabaseDown(error);
          return res.status(503).json({
            error: `Database connection failed: Unable to connect to Supabase at ${process.env.SUPABASE_URL || 'configured URL'} (the project may be paused in your Supabase dashboard). For admin login, use ${localAdminEmail} / ${localAdminPassword}`
          });
        }
        return res.status(401).json({ error: error.message });
      }
      return res.json({ user: data.user, session: data.session });
    } catch (err) {
      if (isNetworkError(err)) {
        markSupabaseDown(err);
        return res.status(503).json({
          error: `Database connection failed: Unable to connect to Supabase at ${process.env.SUPABASE_URL || 'configured URL'} (the project may be paused in your Supabase dashboard). For admin login, use ${localAdminEmail} / ${localAdminPassword}`
        });
      }
      console.error('Signin catch error:', err);
      return res.status(401).json({ error: err.message || 'Authentication failed' });
    }
  }

  // 3. Supabase offline and non-matching credentials
  return res.status(503).json({
    error: `Database connection failed: Unable to reach Supabase. For admin login, use ${localAdminEmail} / ${localAdminPassword}`
  });
});

// Alias /login -> /signin
router.post('/login', (req, res, next) => {
  req.url = '/signin';
  router.handle(req, res, next);
});

// Sign up - Disabled for single-admin system
router.post('/signup', (req, res) => {
  return res.status(403).json({
    error: 'Registration is disabled. This website is managed by a single administrator account.'
  });
});

// Get current user (with role)
router.get('/me', authMiddleware, async (req, res) => {
  // If local admin or role already defined on req.user
  if (req.user?.role === 'admin' || req.user?.id === 'local-admin-id' || req.user?.email === 'kingership321@gmail.com') {
    return res.json({
      id: req.user.id,
      email: req.user.email,
      role: 'admin',
      user_metadata: req.user.user_metadata || { full_name: 'Administrator' }
    });
  }

  if (canQuerySupabase() && supabase) {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', req.user.id)
        .single();

      if (!error && profile) {
        return res.json({ ...req.user, role: profile.role || 'user' });
      }
    } catch (err) {
      if (isNetworkError(err)) {
        markSupabaseDown(err);
      }
    }
  }

  res.json({ ...req.user, role: req.user?.role || 'user' });
});

module.exports = router;