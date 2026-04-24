const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

let dbConfig;
let initDatabase;

// Force use of mock database since PostgreSQL is not configured
console.log('Using mock database (PostgreSQL not configured)');
dbConfig = require('./config/database-fallback');
initDatabase = dbConfig.initDatabase;

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'https://*.netlify.app',
    'https://*.onrender.com',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Import routes - use mock routes when database fallback is active
const useMockRoutes = dbConfig.pool === null; // Check if we're using fallback (pool is null in mock mode)
console.log('Using mock routes:', useMockRoutes);

// Initialize database
initDatabase().catch((err) => {
  console.error('Database initialization failed:', err.message);
  console.log('Server continuing with fallback database...');
});
const contactRoutes = useMockRoutes ? require('./routes/contact-mock') : require('./routes/contact');
const projectRoutes = useMockRoutes ? require('./routes/projects-mock') : require('./routes/projects');
const skillRoutes = useMockRoutes ? require('./routes/skills-mock') : require('./routes/skills');
const analyticsRoutes = useMockRoutes ? require('./routes/analytics-mock') : require('./routes/analytics');
const adminRoutes = useMockRoutes ? require('./routes/admin-mock') : require('./routes/admin');

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
