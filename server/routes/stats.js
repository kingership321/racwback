const express = require('express');
const { supabaseAdmin, canQuerySupabase, markSupabaseDown } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

const { getFallbackData, addItem, updateItem, deleteItem } = require('../utils/fallbackStore');

// GET all stats
router.get('/', async (req, res) => {
  try {
    if (canQuerySupabase()) {
      const { data, error } = await supabaseAdmin
        .from('stats')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        markSupabaseDown(error);
      } else if (Array.isArray(data) && data.length > 0) {
        return res.json(data);
      }
    }
  } catch (err) {
    markSupabaseDown(err);
  }
  return res.json(getFallbackData('stats'));
});

// POST (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { title, target, suffix, display_order } = req.body;
  if (canQuerySupabase()) {
    try {
      const { data, error } = await supabaseAdmin
        .from('stats')
        .insert([{ title, target, suffix, display_order }])
        .select();

      if (!error && data?.length) return res.status(201).json(data[0]);
      if (error) markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }
  const created = addItem('stats', { title, target, suffix, display_order });
  res.status(201).json(created);
});

// PUT (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (canQuerySupabase()) {
    try {
      const { data, error } = await supabaseAdmin
        .from('stats')
        .update(updates)
        .eq('id', id)
        .select();

      if (!error && data?.length) return res.json(data[0]);
      if (error) markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }
  const updated = updateItem('stats', id, updates);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

// DELETE (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  if (canQuerySupabase()) {
    try {
      const { error } = await supabaseAdmin
        .from('stats')
        .delete()
        .eq('id', id);

      if (!error) return res.json({ message: 'Deleted' });
      markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }
  deleteItem('stats', id);
  res.json({ message: 'Deleted' });
});

module.exports = router;