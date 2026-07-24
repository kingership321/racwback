const express = require('express');
const { supabaseAdmin } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

// Public: get all board members
router.get('/', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('board_members')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Admin only: create
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const payload = { ...req.body };
  const allowedFields = ['name', 'position', 'image_url', 'facebook_url', 'linkedin_url', 'email'];
  const safePayload = Object.fromEntries(
    Object.entries(payload).filter(([key]) => allowedFields.includes(key))
  );

  const { data, error } = await supabaseAdmin
    .from('board_members')
    .insert([{ ...safePayload, role: 'member', year: new Date().getFullYear() }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// Admin only: update
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const payload = { ...req.body };
  const allowedFields = ['name', 'position', 'image_url', 'facebook_url', 'linkedin_url', 'email'];
  const updates = Object.fromEntries(
    Object.entries(payload).filter(([key]) => allowedFields.includes(key))
  );

  const { data, error } = await supabaseAdmin
    .from('board_members')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  if (!data.length) return res.status(404).json({ error: 'Not found' });
  res.json(data[0]);
});

// Admin only: delete
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabaseAdmin
    .from('board_members')
    .delete()
    .eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Deleted' });
});

module.exports = router;