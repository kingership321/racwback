const express = require('express');
const { supabase, supabaseAdmin } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Middleware to check if Supabase is initialized
const checkSupabaseConfig = (req, res, next) => {
  if (!supabase) {
    return res.status(503).json({ 
      error: 'Service Unavailable',
      message: 'Authentication service is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.'
    });
  }
  next();
};

// Apply config check to all auth routes
router.use(checkSupabaseConfig);

// Sign up
router.post('/signup', async (req, res) => {
  const { email, password, full_name } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (data.user) {
      const baseUsername = (full_name || email || 'user')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9._-]/g, '_')
        .replace(/_+/g, '_')
        .slice(0, 24) || 'user';
      const username = `${baseUsername}_${data.user.id.slice(0, 8)}`;

      // Create a matching public user row so the profiles foreign key can succeed.
      const { error: userRowError } = await supabaseAdmin
        .from('users')
        .upsert([{ id: data.user.id, username }], { onConflict: 'id' });

      if (userRowError) {
        console.error('User row create error:', userRowError);
        return res.status(500).json({ error: 'Failed to initialize user record' });
      }

      // Use admin client to insert profile (bypass RLS)
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .upsert([{ id: data.user.id, full_name, role: 'user' }], { onConflict: 'id' });

      if (profileError) {
        console.error('Profile insert error:', profileError);
        return res.status(500).json({ error: 'Failed to create profile' });
      }
    }
    res.status(201).json({ user: data.user, session: data.session });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Sign in
router.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.log('Signin error:', error);
      throw error;
    }
    res.json({ user: data.user, session: data.session });
  } catch (err) {
    console.error('Signin catch:', err);
    res.status(401).json({ error: err.message });
  }
});

// Get current user (with role)
router.get('/me', authMiddleware, async (req, res) => {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', req.user.id)
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ ...req.user, role: profile?.role || 'user' });
});

module.exports = router;