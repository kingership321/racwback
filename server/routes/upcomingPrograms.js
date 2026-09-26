const express = require('express');
const { supabaseAdmin, canQuerySupabase, markSupabaseDown } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

const { getFallbackData, addItem, updateItem, deleteItem } = require('../utils/fallbackStore');

// GET all upcoming programs (public)
router.get('/', async (req, res) => {
  try {
    if (canQuerySupabase()) {
      const { data, error } = await supabaseAdmin
        .from('upcoming_programs')
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
  return res.json(getFallbackData('upcoming_programs'));
});

// POST create new upcoming program (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { title, description, display_order } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  
  if (canQuerySupabase()) {
    try {
      const { data, error } = await supabaseAdmin
        .from('upcoming_programs')
        .insert([{ title, description, display_order: display_order || 0 }])
        .select();
      if (!error && data?.length) return res.status(201).json(data[0]);
      if (error) {
        if (error.code === '23505') {
          return res.status(409).json({ error: 'Upcoming program with this title already exists' });
        }
        markSupabaseDown(error);
      }
    } catch (err) {
      markSupabaseDown(err);
    }
  }

  const created = addItem('upcoming_programs', { title, description, display_order: display_order || 0 });
  res.status(201).json(created);
});

// PUT update upcoming program (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  if (canQuerySupabase()) {
    try {
      const { data, error } = await supabaseAdmin
        .from('upcoming_programs')
        .update({ ...updates, updated_at: new Date() })
        .eq('id', id)
        .select();
      if (!error && data?.length) return res.json(data[0]);
      if (error) markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }

  const updated = updateItem('upcoming_programs', id, updates);
  if (!updated) {
    return res.status(404).json({ error: 'Upcoming program not found' });
  }
  res.json(updated);
});

// DELETE upcoming program (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  
  if (canQuerySupabase()) {
    try {
      const { error } = await supabaseAdmin
        .from('upcoming_programs')
        .delete()
        .eq('id', id);
      if (!error) return res.json({ message: 'Upcoming program deleted successfully' });
      markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }

  deleteItem('upcoming_programs', id);
  res.json({ message: 'Upcoming program deleted successfully' });
});

module.exports = router;
