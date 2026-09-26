const express = require('express');
const { supabaseAdmin, canQuerySupabase, markSupabaseDown } = require('../utils/supabaseClient');
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

const { getFallbackData, addItem, updateItem, deleteItem } = require('../utils/fallbackStore');

// Public: get all board members
router.get('/', async (req, res) => {
  try {
    if (canQuerySupabase()) {
      const { data, error } = await supabaseAdmin
        .from('board_members')
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
  return res.json(getFallbackData('board_members'));
});

// Admin only: create
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const payload = { ...req.body };
  const allowedFields = ['name', 'position', 'role', 'committee', 'contribution', 'year', 'image_url', 'facebook_url', 'linkedin_url', 'email', 'display_order'];
  const safePayload = Object.fromEntries(
    Object.entries(payload).filter(([key]) => allowedFields.includes(key))
  );

  const fullPayload = {
    ...safePayload,
    role: safePayload.role || 'member',
    year: safePayload.year || new Date().getFullYear(),
  };

  if (canQuerySupabase()) {
    try {
      const { data, error } = await safeInsert('board_members', fullPayload);
      if (!error && data?.length) return res.status(201).json(data[0]);
      if (error) markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }

  const created = addItem('board_members', fullPayload);
  res.status(201).json(created);
});

// Admin only: update
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const payload = { ...req.body };
  const allowedFields = ['name', 'position', 'role', 'committee', 'contribution', 'year', 'image_url', 'facebook_url', 'linkedin_url', 'email', 'display_order'];
  const updates = Object.fromEntries(
    Object.entries(payload).filter(([key]) => allowedFields.includes(key))
  );

  if (canQuerySupabase()) {
    try {
      const { data, error } = await safeUpdate('board_members', id, updates);
      if (!error && data?.length) return res.json(data[0]);
      if (error) markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }

  const updated = updateItem('board_members', id, updates);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

// Admin only: delete
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  if (canQuerySupabase()) {
    try {
      const { error } = await supabaseAdmin
        .from('board_members')
        .delete()
        .eq('id', id);
      if (!error) return res.json({ message: 'Deleted' });
      markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }

  deleteItem('board_members', id);
  res.json({ message: 'Deleted' });
});

module.exports = router;