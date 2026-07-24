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

const app = express();
const PORT = process.env.PORT || 5000;

// ========== CORS Configuration ==========
// Read allowed origins from environment, with fallbacks
const envOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// Always include localhost for development
const defaultOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
];

// Include your known production URL explicitly (change if different)
const productionOrigins = [
  'https://racwback.vercel.app',
  // Add other known production domains here
];

// Combine all origins, remove duplicates
const allowedOrigins = [...new Set([...envOrigins, ...defaultOrigins, ...productionOrigins])];

console.log('✅ Allowed CORS origins:', allowedOrigins);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps, curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
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
app.use('/api/settings', settingsRoutes);

// ========== Health Check ==========
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ========== Start Server ==========
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 Allowed origins: ${allowedOrigins.join(', ')}`);
});