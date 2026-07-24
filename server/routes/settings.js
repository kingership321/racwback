const express = require('express');
const { supabaseAdmin } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

// GET all settings
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single setting by key
router.get('/:key', async (req, res) => {
  const { key } = req.params;
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('*')
      .eq('key', key)
      .single();
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Setting not found' });
      }
      throw error;
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST (create new setting) - admin only
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { key, value } = req.body;
  if (!key) return res.status(400).json({ error: 'Key is required' });
  
  // Parse value as JSON if it's a string, else keep as is
  let parsedValue = value;
  try { parsedValue = JSON.parse(value); } catch (e) { /* keep as string */ }
  
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .insert([{ key, value: parsedValue }])
      .select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    // Check if it's a duplicate key error
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Setting with this key already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT (update a setting) - admin only
router.put('/:key', authMiddleware, adminMiddleware, async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  
  let parsedValue = value;
  try { parsedValue = JSON.parse(value); } catch (e) { /* keep as string */ }
  
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .update({ value: parsedValue, updated_at: new Date() })
      .eq('key', key)
      .select();
    if (error) throw error;
    if (!data.length) {
      return res.status(404).json({ error: 'Setting not found' });
    }
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - admin only
router.delete('/:key', authMiddleware, adminMiddleware, async (req, res) => {
  const { key } = req.params;
  try {
    const { error } = await supabaseAdmin
      .from('settings')
      .delete()
      .eq('key', key);
    if (error) throw error;
    res.json({ message: 'Setting deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;