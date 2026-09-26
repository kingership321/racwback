const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { supabaseAdmin, canQuerySupabase, markSupabaseDown } = require('../utils/supabaseClient');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'images';

const normalizePath = (value) => {
  if (!value) return '';
  return value.toString().replace(/^\/+|\/+$/g, '').replace(/\\/g, '/');
};

router.post('/', authMiddleware, adminMiddleware, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const folder = normalizePath(req.body.path || '');
  const fileName = `${Date.now()}-${req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const storagePath = folder ? `${folder}/${fileName}` : fileName;

  if (canQuerySupabase() && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin.storage
        .from(bucketName)
        .upload(storagePath, req.file.buffer, {
          cacheControl: '3600',
          upsert: false,
          contentType: req.file.mimetype,
        });

      if (!error) {
        const { data: publicUrlData } = supabaseAdmin.storage.from(bucketName).getPublicUrl(storagePath);
        return res.status(201).json({
          url: publicUrlData?.publicUrl || null,
          path: storagePath,
          name: req.file.originalname,
          bucket: bucketName,
          key: data?.path || storagePath,
        });
      }
      markSupabaseDown(error);
    } catch (err) {
      markSupabaseDown(err);
    }
  }

  // Fallback to local static storage
  try {
    const localDir = path.resolve(__dirname, '..', '..', 'public', 'assets', 'uploads');
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const localFilePath = path.join(localDir, fileName);
    fs.writeFileSync(localFilePath, req.file.buffer);

    // Also copy to src/assets/uploads if it exists
    const srcDir = path.resolve(__dirname, '..', '..', 'src', 'assets', 'uploads');
    if (fs.existsSync(path.dirname(srcDir))) {
      if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });
      fs.writeFileSync(path.join(srcDir, fileName), req.file.buffer);
    }

    return res.status(201).json({
      url: `/assets/uploads/${fileName}`,
      path: `uploads/${fileName}`,
      name: req.file.originalname,
      bucket: 'local',
      key: fileName
    });
  } catch (fsErr) {
    return res.status(500).json({ error: 'Failed to store uploaded file: ' + fsErr.message });
  }
});

router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  const folder = normalizePath(req.query.path || '');
  const { data, error } = await supabaseAdmin.storage.from(bucketName).list(folder, {
    limit: 200,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const items = await Promise.all(
    (data || []).map(async (item) => {
      const filePath = folder ? `${folder}/${item.name}` : item.name;
      const { data: publicUrlData } = supabaseAdmin.storage.from(bucketName).getPublicUrl(filePath);
      return {
        name: item.name,
        path: filePath,
        url: publicUrlData?.publicUrl || null,
        type: item.metadata?.mimetype || item.type,
      };
    })
  );

  res.json(items);
});

module.exports = router;
