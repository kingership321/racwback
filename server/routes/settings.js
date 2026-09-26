const express = require('express');
const { supabaseAdmin, canQuerySupabase, markSupabaseDown } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

const { getFallbackData, getSetting, addItem, updateItem, deleteItem } = require('../utils/fallbackStore');

// GET all settings
router.get('/', async (req, res) => {
  try {
    if (canQuerySupabase()) {
      const { data, error } = await supabaseAdmin
        .from('settings')
        .select('*');
      if (error) {
        markSupabaseDown(error);
      } else if (Array.isArray(data) && data.length > 0) {
        return res.json(data);
      }
    }
  } catch (err) {
    markSupabaseDown(err);
  }
  return res.json(getFallbackData('settings'));
});

// GET a single setting by key
router.get('/:key', async (req, res) => {
  const { key } = req.params;
  try {
    if (canQuerySupabase()) {
      const { data, error } = await supabaseAdmin
        .from('settings')
        .select('*')
        .eq('key', key)
        .single();
      if (error) {
        if (error.code !== 'PGRST116') {
          markSupabaseDown(error);
        }
      } else if (data) {
        return res.json(data);
      }
    }
  } catch (err) {
    markSupabaseDown(err);
  }
  const fallback = getSetting(key);
  if (fallback) {
    return res.json(fallback);
  }
  return res.status(404).json({ error: 'Setting not found' });
});

// POST (create new setting) - admin only
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { key, value } = req.body;
  if (!key) return res.status(400).json({ error: 'Key is required' });
  
  let parsedValue = value;
  try { parsedValue = JSON.parse(value); } catch (e) { /* keep as string */ }
  
  if (canQuerySupabase()) {
    try {
      const { data, error } = await supabaseAdmin
        .from('settings')
        .insert([{ key, value: parsedValue }])
        .select();
      if (!error && data?.length) return res.status(201).json(data[0]);
      if (error) {
        if (error.code === '23505') {
          return res.status(409).json({ error: 'Setting with this key already exists' });
        }
        markSupabaseDown(error);
      }
    } catch (err) {
      markSupabaseDown(err);
    }
  }

  const existing = getSetting(key);
  if (existing) {
    return res.status(409).json({ error: 'Setting with this key already exists' });
  }
  const created = addItem('settings', { key, value: parsedValue });
  res.status(201).json(created);
});

// PUT (update a setting) - admin only
router.put('/:key', authMiddleware, adminMiddleware, async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  
  let parsedValue = value;
  try { parsedValue = JSON.parse(value); } catch (e) { /* keep as string */ }
  
  if (canQuerySupabase()) {
    try {
      const { data, error } = await supabaseAdmin
        .from('settings')
        .update({ value: parsedValue, updated_at: new Date() })
        .eq('key', key)
        .select();
      if (!error && data?.length) return res.json(data[0]);
      if (error) markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }

  const updated = updateItem('settings', key, { value: parsedValue });
  if (!updated) {
    return res.status(404).json({ error: 'Setting not found' });
  }
  res.json(updated);
});

// DELETE - admin only
router.delete('/:key', authMiddleware, adminMiddleware, async (req, res) => {
  const { key } = req.params;
  if (canQuerySupabase()) {
    try {
      const { error } = await supabaseAdmin
        .from('settings')
        .delete()
        .eq('key', key);
      if (!error) return res.json({ message: 'Setting deleted successfully' });
      markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }
  deleteItem('settings', key);
  res.json({ message: 'Setting deleted successfully' });
});

module.exports = router;