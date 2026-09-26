const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const { getSyncStatus, syncAllToSupabase } = require('../utils/syncService');

// GET /api/sync/status - Returns health and sync status
router.get('/status', async (req, res) => {
  try {
    const status = await getSyncStatus();
    res.json(status);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve sync status', details: err.message });
  }
});

// POST /api/sync - Manually trigger sync of all local changes to Supabase
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await syncAllToSupabase();
    if (!result.success && result.errors?.length) {
      return res.status(503).json(result);
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Sync failed', details: err.message });
  }
});

module.exports = router;
