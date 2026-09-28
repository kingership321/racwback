const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const boardRoutes = require('./routes/board');
const programRoutes = require('./routes/programs');
const charterRoutes = require('./routes/charter');
const statsRoutes = require('./routes/stats');
const valuesRoutes = require('./routes/values');
const themesRoutes = require('./routes/themes');
const previousBoardsRoutes = require('./routes/previousBoards');
const settingsRoutes = require('./routes/settings');
const upcomingProgramsRoutes = require('./routes/upcomingPrograms');
const uploadsRoutes = require('./routes/uploads');
const syncRoutes = require('./routes/sync');
const { checkSupabaseHealth, syncAllToSupabase } = require('./utils/syncService');

const app = express();
const PORT = process.env.PORT || 5000;

// ========== CORS Configuration ==========
// Read allowed origins from environment, with fallbacks
const envOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const defaultOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5000',
  'http://localhost:5050',
  'http://localhost:8080',
];

// Include your known production URL explicitly (change if different)
const productionOrigins = [
  'https://racwback.vercel.app',
  'https://rotaractcluboftu.com',
  'https://www.rotaractcluboftu.com',
  // Add other known production domains here
];

// Combine all origins, remove duplicates
const allowedOrigins = [...new Set([...envOrigins, ...defaultOrigins, ...productionOrigins])];

console.log('✅ Allowed CORS origins:', allowedOrigins);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps, curl)
    if (!origin) return callback(null, true);

    const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    if (isLocalhost || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`❌ CORS blocked origin: ${origin}`);
    return callback(new Error(`CORS policy: Origin "${origin}" not allowed`), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ========== Middleware ==========
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets')));
app.use('/assets', express.static(path.join(__dirname, '..', 'src', 'assets')));

// ========== Routes ==========
app.use('/api/auth', authRoutes);
app.use('/api/board', boardRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/upcoming-programs', upcomingProgramsRoutes);
app.use('/api/charter', charterRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/values', valuesRoutes);
app.use('/api/themes', themesRoutes);
app.use('/api/previousboards', previousBoardsRoutes);
app.use('/api/previous-boards', previousBoardsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/sync', syncRoutes);

// ========== Health Check ==========
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ========== Root Route ==========
app.get('/', (req, res) => {
  res.json({
    message: 'RCTU Backend API Server',
    status: 'running',
    version: '0.1.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      board: '/api/board',
      programs: '/api/programs',
      upcomingPrograms: '/api/upcoming-programs',
      charter: '/api/charter',
      stats: '/api/stats',
      values: '/api/values',
      themes: '/api/themes',
      previousBoards: '/api/previousboards',
      settings: '/api/settings',
      sync: '/api/sync',
    },
    timestamp: new Date().toISOString(),
  });
});

// ========== 404 Handler ==========
app.use((req, res) => {
  // Don't send 405 for OPTIONS, they should have been handled by CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  res.status(404).json({
    error: 'Not Found',
    message: `The endpoint ${req.method} ${req.path} does not exist`,
    availableEndpoints: 'GET /',
    timestamp: new Date().toISOString(),
  });
});

// ========== Start Server ==========
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 Allowed origins: ${allowedOrigins.join(', ')}`);
});

// ========== Auto-Sync Monitor ==========
// Detects when Supabase comes back online and automatically syncs all offline local changes!
let wasSupabaseOffline = true;
setInterval(async () => {
  try {
    const isOnline = await checkSupabaseHealth();
    if (isOnline && wasSupabaseOffline) {
      console.log('🔄 Supabase is back online! Automatically syncing offline local changes to Supabase...');
      const syncRes = await syncAllToSupabase();
      console.log('✅ Auto-sync completed:', syncRes.results);
      wasSupabaseOffline = false;
    } else if (!isOnline) {
      wasSupabaseOffline = true;
    }
  } catch (err) {
    // quiet background retry
  }
}, 30000); // Check every 30 seconds