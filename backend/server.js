import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import businessRoutes from './routes/businessRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import taxonomyRoutes from './routes/taxonomyRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import pool from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root welcome & status
const rootStatus = (req, res) => {
  res.json({
    status: 'online',
    message: '123 Yercaud Backend API is active',
    database: 'xiadot.com (123yercaud_db)',
    availableEndpoints: [
      '/api/health',
      '/api/events',
      '/api/businesses',
      '/api/inquiries',
      '/api/taxonomy',
      '/api/settings'
    ]
  });
};

app.get('/', rootStatus);
app.get('/123yercaud', rootStatus);

// Friendly redirect if someone accesses route filenames directly in browser
app.get(['/eventRoutes.js', '/123yercaud/eventRoutes.js'], (req, res) => {
  res.redirect('/api/events');
});

// Setup API Router
const apiRouter = express.Router();

// Health check endpoint
apiRouter.get('/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 as healthy');
    res.json({
      status: 'online',
      database: 'connected (xiadot.com: 123yercaud_db)',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: err.message
    });
  }
});

// API Routes
apiRouter.use('/auth', authRoutes);
apiRouter.use('/businesses', businessRoutes);
apiRouter.use('/inquiries', inquiryRoutes);
apiRouter.use('/events', eventRoutes);
apiRouter.use('/taxonomy', taxonomyRoutes);
apiRouter.use('/settings', settingsRoutes);

// Mount API router for standard /api and sub-path /123yercaud/api (cPanel passenger compatibility)
app.use('/api', apiRouter);
app.use('/123yercaud/api', apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✓ 123 Yercaud Backend Server running on http://localhost:${PORT}`);
  console.log(`✓ Connected to MySQL database 123yercaud_db on xiadot.com`);
});

export default app;
