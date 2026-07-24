const express = require('express');
const { supabaseAdmin } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

// Public: get all programs with their images (first image as thumbnail)
router.get('/', async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('programs')
    .select(`
      *,
      program_images ( id, image_url, display_order )
    `)
    .order('display_order', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  // Optionally, add a thumbnail field as first image
  const programs = data.map(p => ({
    ...p,
    thumbnail: p.program_images && p.program_images.length > 0 ? p.program_images[0].image_url : null,
    images: p.program_images || []
  }));
  res.json(programs);
});

// Admin: create program
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { title, date, place, coorganizer, display_order } = req.body;
  const { data, error } = await supabaseAdmin
    .from('programs')
    .insert([{ title, date, place, coorganizer, display_order }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// Admin: update program
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await supabaseAdmin
    .from('programs')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  if (!data.length) return res.status(404).json({ error: 'Not found' });
  res.json(data[0]);
});

// Admin: delete program (also deletes images via cascade)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabaseAdmin
    .from('programs')
    .delete()
    .eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
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