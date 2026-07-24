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

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});