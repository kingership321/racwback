const express = require('express');
const { supabaseAdmin } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

// GET all upcoming programs (public)
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('upcoming_programs')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new upcoming program (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { title, description, display_order } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  
  try {
    const { data, error } = await supabaseAdmin
      .from('upcoming_programs')
      .insert([{ title, description, display_order: display_order || 0 }])
      .select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Upcoming program with this title already exists' });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT update upcoming program (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, display_order } = req.body;
  
  try {
    const { data, error } = await supabaseAdmin
      .from('upcoming_programs')
      .update({ title, description, display_order, updated_at: new Date() })
      .eq('id', id)
      .select();
    if (error) throw error;
    if (!data.length) {
      return res.status(404).json({ error: 'Upcoming program not found' });
    }
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE upcoming program (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  
  try {
    const { error } = await supabaseAdmin
      .from('upcoming_programs')
      .delete()
      .eq('id', id);
    if (error) throw error;
    res.json({ message: 'Upcoming program deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
