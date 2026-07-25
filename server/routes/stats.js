const express = require('express');
const { supabaseAdmin } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

// GET all stats
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('stats')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Supabase fetch error:', error.message);
      // Return 500 error object, but handle this safely in the frontend
      return res.status(500).json({ error: error.message });
    }

    // Always ensure an array is returned even if data is null/undefined
    res.json(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error('Server error in GET /stats:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, target, suffix, display_order } = req.body;
    const { data, error } = await supabaseAdmin
      .from('stats')
      .insert([{ title, target, suffix, display_order }])
      .select();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data?.[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const { data, error } = await supabaseAdmin
      .from('stats')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) return res.status(500).json({ error: error.message });
    if (!data || !data.length) return res.status(404).json({ error: 'Not found' });

    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabaseAdmin
      .from('stats')
      .delete()
      .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;