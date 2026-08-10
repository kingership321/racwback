const express = require('express');
const { supabaseAdmin } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

const parseMissingColumn = (error) => {
  const message = error?.message || error?.details || '';
  const match = message.match(/column "([^"]+)" does not exist/i);
  return match ? match[1] : null;
};

const safeInsert = async (table, payload) => {
  let currentPayload = { ...payload };

  while (true) {
    const { data, error } = await supabaseAdmin.from(table).insert([currentPayload]).select();
    if (!error) return { data, error: null };
    const invalidColumn = parseMissingColumn(error);
    if (!invalidColumn || !(invalidColumn in currentPayload)) {
      return { data: null, error };
    }
    delete currentPayload[invalidColumn];
  }
};

const safeUpdate = async (table, id, payload) => {
  let currentPayload = { ...payload };

  while (true) {
    const { data, error } = await supabaseAdmin.from(table).update(currentPayload).eq('id', id).select();
    if (!error) return { data, error: null };
    const invalidColumn = parseMissingColumn(error);
    if (!invalidColumn || !(invalidColumn in currentPayload)) {
      return { data: null, error };
    }
    delete currentPayload[invalidColumn];
  }
};

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
  const allowedFields = ['name', 'position', 'role', 'committee', 'contribution', 'year', 'image_url', 'facebook_url', 'linkedin_url', 'email', 'display_order'];
  const safePayload = Object.fromEntries(
    Object.entries(payload).filter(([key]) => allowedFields.includes(key))
  );

  const { data, error } = await safeInsert('board_members', {
    ...safePayload,
    role: safePayload.role || 'member',
    year: safePayload.year || new Date().getFullYear(),
  });
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// Admin only: update
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const payload = { ...req.body };
  const allowedFields = ['name', 'position', 'role', 'committee', 'contribution', 'year', 'image_url', 'facebook_url', 'linkedin_url', 'email', 'display_order'];
  const updates = Object.fromEntries(
    Object.entries(payload).filter(([key]) => allowedFields.includes(key))
  );

  const { data, error } = await safeUpdate('board_members', id, updates);
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