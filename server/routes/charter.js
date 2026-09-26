const express = require('express');
const { supabaseAdmin, canQuerySupabase, markSupabaseDown } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

const { getFallbackData, addItem, updateItem, deleteItem } = require('../utils/fallbackStore');

// Public: get all charter messages
router.get('/', async (req, res) => {
  try {
    if (canQuerySupabase()) {
      const { data, error } = await supabaseAdmin
        .from('charter_messages')
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
  return res.json(getFallbackData('charter_messages'));
});

// Admin: update a message by id
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const payload = { ...req.body };
  const allowedFields = ['name', 'position', 'organization', 'term', 'image_url', 'message'];
  const updates = Object.fromEntries(
    Object.entries(payload).filter(([key]) => allowedFields.includes(key))
  );

  if (canQuerySupabase()) {
    try {
      const { data, error } = await supabaseAdmin
        .from('charter_messages')
        .update(updates)
        .eq('id', id)
        .select();
      if (!error && data?.length) return res.json(data[0]);
      if (error) markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }

  const updated = updateItem('charter_messages', id, updates);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

// Admin: delete (optional)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  if (canQuerySupabase()) {
    try {
      const { error } = await supabaseAdmin
        .from('charter_messages')
        .delete()
        .eq('id', id);
      if (!error) return res.json({ message: 'Deleted' });
      markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }
  deleteItem('charter_messages', id);
  res.json({ message: 'Deleted' });
});

module.exports = router;