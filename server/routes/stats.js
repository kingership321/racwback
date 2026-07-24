const express = require('express');
const { supabaseAdmin } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

// GET all stats
router.get('/', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('stats')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { title, target, suffix, display_order } = req.body;
  const { data, error } = await supabaseAdmin
    .from('stats')
    .insert([{ title, target, suffix, display_order }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// PUT (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await supabaseAdmin
    .from('stats')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  if (!data.length) return res.status(404).json({ error: 'Not found' });
  res.json(data[0]);
});

// DELETE (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabaseAdmin
    .from('stats')
    .delete()
    .eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Deleted' });
});

module.exports = router;