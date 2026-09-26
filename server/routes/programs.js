const express = require('express');
const { supabaseAdmin, canQuerySupabase, markSupabaseDown } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

const { getFallbackData, addItem, updateItem, deleteItem } = require('../utils/fallbackStore');

// Public: get all programs with their images (first image as thumbnail)
router.get('/', async (req, res) => {
  try {
    if (canQuerySupabase()) {
      const { data, error } = await supabaseAdmin
        .from('programs')
        .select(`
          *,
          program_images ( id, image_url, display_order )
        `)
        .order('display_order', { ascending: true });
      if (error) {
        markSupabaseDown(error);
      } else if (Array.isArray(data) && data.length > 0) {
        const programs = data.map(p => ({
          ...p,
          thumbnail: p.program_images && p.program_images.length > 0 ? p.program_images[0].image_url : null,
          images: p.program_images || []
        }));
        return res.json(programs);
      }
    }
  } catch (err) {
    markSupabaseDown(err);
  }
  const fallbackList = getFallbackData('programs').map(p => {
    const pImages = p.program_images || p.images || [];
    return {
      ...p,
      program_images: pImages,
      images: pImages,
      thumbnail: pImages.length > 0 ? (typeof pImages[0] === 'string' ? pImages[0] : pImages[0].image_url) : null
    };
  });
  return res.json(fallbackList);
});

// Admin: create program
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { title, date, place, coorganizer, display_order } = req.body;
  if (canQuerySupabase()) {
    try {
      const { data, error } = await supabaseAdmin
        .from('programs')
        .insert([{ title, date, place, coorganizer, display_order }])
        .select();
      if (!error && data?.length) return res.status(201).json(data[0]);
      if (error) markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }
  const created = addItem('programs', { title, date, place, coorganizer, display_order, program_images: [] });
  res.status(201).json(created);
});

// Admin: update program
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (canQuerySupabase()) {
    try {
      const { data, error } = await supabaseAdmin
        .from('programs')
        .update(updates)
        .eq('id', id)
        .select();
      if (!error && data?.length) return res.json(data[0]);
      if (error) markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }
  const updated = updateItem('programs', id, updates);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

// Admin: delete program (also deletes images via cascade)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  if (canQuerySupabase()) {
    try {
      const { error } = await supabaseAdmin
        .from('programs')
        .delete()
        .eq('id', id);
      if (!error) return res.json({ message: 'Deleted' });
      markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }
  deleteItem('programs', id);
  res.json({ message: 'Deleted' });
});

// --- Program Images endpoints ---

// Admin: add image to program
router.post('/:programId/images', authMiddleware, adminMiddleware, async (req, res) => {
  const { programId } = req.params;
  const { image_url, display_order } = req.body;
  const { data, error } = await supabaseAdmin
    .from('program_images')
    .insert([{ program_id: programId, image_url, display_order: display_order || 0 }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// Admin: delete image
router.delete('/images/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabaseAdmin
    .from('program_images')
    .delete()
    .eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Deleted' });
});

module.exports = router;