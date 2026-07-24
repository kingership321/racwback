const express = require('express');
const { supabaseAdmin } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('themes')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { title, description, image_url, display_order } = req.body;
  const { data, error } = await supabaseAdmin
    .from('themes')
    .insert([{ title, description, image_url, display_order }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await supabaseAdmin
    .from('themes')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  if (!data.length) return res.status(404).json({ error: 'Not found' });
  res.json(data[0]);
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabaseAdmin
    .from('themes')
    .delete()
    .eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Deleted' });
});

module.exports = router;