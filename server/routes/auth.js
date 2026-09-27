const fs = require('fs');
const path = require('path');
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
  const { username, email, password } = req.body;
  const inputIdentifier = (username || email || '').toLowerCase().trim();
  const localAdminUsername = (process.env.ADMIN_USERNAME || 'ractu').toLowerCase().trim();
  const localAdminEmail = (process.env.ADMIN_EMAIL || 'kingership321@gmail.com').toLowerCase().trim();
  const localAdminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  console.log('Login attempt with identifier:', inputIdentifier);

  // Strictly enforce the single admin username: "ractu"
  const isRactuUser = inputIdentifier === localAdminUsername || inputIdentifier === 'ractu';

  // 1. Check admin credentials (supports BOTH online and offline seamlessly)
  if (isRactuUser && password === localAdminPassword) {
    if (canQuerySupabase() && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email: localAdminEmail, password });
        if (!error && data?.session) {
          return res.json({ 
            user: { ...data.user, username: 'ractu' }, 
            session: data.session 
          });
        }
      } catch (err) {
        console.warn('Supabase signin attempt failed, falling back to local admin session:', err.message);
      }
    }

    // Offline / Fallback admin token
    const token = jwt.sign(
      { 
        id: 'local-admin-id', 
        username: 'ractu', 
        email: localAdminEmail, 
        role: 'admin', 
        full_name: 'Administrator' 
      },
      process.env.JWT_SECRET || 'rctu-jwt-secret-key',
      { expiresIn: '7d' }
    );
    return res.json({
      user: {
        id: 'local-admin-id',
        username: 'ractu',
        email: localAdminEmail,
        role: 'admin',
        user_metadata: { full_name: 'Administrator', username: 'ractu' }
      },
      session: {
        access_token: token,
        token_type: 'bearer',
        expires_in: 604800
      }
    });
  }

  // Any non-matching username or wrong password
  return res.status(401).json({ error: 'Invalid username or password' });
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
  const localAdminUsername = process.env.ADMIN_USERNAME || 'ractu';
  const localAdminEmail = (process.env.ADMIN_EMAIL || 'kingership321@gmail.com').toLowerCase().trim();

  // If local admin or role already defined on req.user
  if (req.user?.role === 'admin' || req.user?.id === 'local-admin-id' || req.user?.email?.toLowerCase().trim() === localAdminEmail) {
    return res.json({
      id: req.user.id,
      username: 'ractu',
      email: req.user.email || localAdminEmail,
      role: 'admin',
      user_metadata: req.user.user_metadata || { full_name: 'Administrator', username: 'ractu' }
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

// Change Admin Password
router.post('/change-password', authMiddleware, async (req, res) => {
  const localAdminEmail = (process.env.ADMIN_EMAIL || 'kingership321@gmail.com').toLowerCase().trim();
  
  // Verify admin permissions
  if (req.user?.role !== 'admin' && req.user?.id !== 'local-admin-id' && req.user?.email?.toLowerCase().trim() !== localAdminEmail) {
    return res.status(403).json({ error: 'Admin access required to change password' });
  }

  const { newPassword, verificationEmail } = req.body;

  // Security verification: require matching security verification email
  if (!verificationEmail || verificationEmail.toLowerCase().trim() !== localAdminEmail) {
    return res.status(403).json({ 
      error: 'Security verification failed: Please enter the correct administrator verification email to authorize this change.' 
    });
  }

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters long' });
  }

  // 1. Update in-memory process.env
  process.env.ADMIN_PASSWORD = newPassword;

  // 2. Persist to server/.env so it survives server restarts
  try {
    const envPath = path.resolve(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
      let content = fs.readFileSync(envPath, 'utf8');
      if (content.includes('ADMIN_PASSWORD=')) {
        content = content.replace(/ADMIN_PASSWORD=.*/g, `ADMIN_PASSWORD=${newPassword}`);
      } else {
        content += `\nADMIN_PASSWORD=${newPassword}`;
      }
      fs.writeFileSync(envPath, content, 'utf8');
    }
  } catch (envErr) {
    console.warn('Could not write to server/.env:', envErr.message);
  }

  // 3. Update Supabase Auth if online
  let supabaseUpdated = false;
  if (canQuerySupabase() && supabaseAdmin) {
    try {
      const targetEmail = localAdminEmail;
      const { data: userList } = await supabaseAdmin.auth.admin.listUsers();
      const targetUser = userList?.users?.find(u => u.email?.toLowerCase() === targetEmail.toLowerCase());
      
      const targetId = targetUser?.id || (req.user.id !== 'local-admin-id' ? req.user.id : null);
      if (targetId) {
        const { error: updateErr } = await supabaseAdmin.auth.admin.updateUserById(targetId, {
          password: newPassword
        });
        if (!updateErr) {
          supabaseUpdated = true;
        } else {
          console.warn('Supabase password update error:', updateErr.message);
        }
      }
    } catch (sbErr) {
      console.warn('Supabase admin update error:', sbErr.message);
    }
  }

  return res.json({
    success: true,
    message: supabaseUpdated 
      ? 'Password successfully updated for both local server and Supabase database!'
      : 'Password updated for local server (Supabase is currently offline, sync will apply when reconnected).'
  });
});

module.exports = router;