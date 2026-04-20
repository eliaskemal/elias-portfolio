const express = require('express');
const router = express.Router();
const { mockDB } = require('../mock-database');

// Simple test endpoint
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Admin routes are working!',
    timestamp: new Date().toISOString()
  });
});

// Get table schema info
router.get('/tables', async (req, res) => {
  try {
    const tables = [
      { table_name: 'contacts', row_count: mockDB.contacts.length, column_count: 5 },
      { table_name: 'projects', row_count: mockDB.projects.length, column_count: 8 },
      { table_name: 'skills', row_count: mockDB.skills.length, column_count: 4 },
      { table_name: 'analytics', row_count: mockDB.analytics.length, column_count: 5 }
    ];
    
    res.json({
      success: true,
      data: tables
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching table info',
      error: error.message
    });
  }
});

// Get contacts data for admin portal
router.get('/tables/contacts', async (req, res) => {
  try {
    const contacts = await mockDB.contacts.find();
    console.log('Admin portal requesting contacts:', contacts.length);
    
    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    console.error('Error getting contacts for admin portal:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
});

// Get table data
router.get('/tables/:tableName', async (req, res) => {
  try {
    const { tableName } = req.params;
    const { page = 1, limit = 50, search } = req.query;
    const offset = (page - 1) * limit;
    
    // Validate table name
    const validTables = ['contacts', 'projects', 'skills', 'analytics'];
    if (!validTables.includes(tableName)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid table name'
      });
    }
    
    let data = mockDB[tableName] || [];
    
    // Apply search filter
    if (search) {
      data = data.filter(item => {
        const searchLower = search.toLowerCase();
        return Object.values(item).some(value => 
          value && value.toString().toLowerCase().includes(searchLower)
        );
      });
    }
    
    // Apply pagination
    const total = data.length;
    const paginatedData = data.slice(offset, offset + parseInt(limit));
    
    // Get table schema
    const schemas = {
      contacts: [
        { column_name: 'id', data_type: 'integer', is_nullable: 'NO' },
        { column_name: 'name', data_type: 'character varying', is_nullable: 'NO' },
        { column_name: 'email', data_type: 'character varying', is_nullable: 'NO' },
        { column_name: 'subject', data_type: 'character varying', is_nullable: 'NO' },
        { column_name: 'message', data_type: 'text', is_nullable: 'NO' },
        { column_name: 'created_at', data_type: 'timestamp without time zone', is_nullable: 'NO' }
      ],
      projects: [
        { column_name: 'id', data_type: 'integer', is_nullable: 'NO' },
        { column_name: 'title', data_type: 'character varying', is_nullable: 'NO' },
        { column_name: 'description', data_type: 'text', is_nullable: 'YES' },
        { column_name: 'technologies', data_type: 'ARRAY', is_nullable: 'YES' },
        { column_name: 'github_url', data_type: 'character varying', is_nullable: 'YES' },
        { column_name: 'live_url', data_type: 'character varying', is_nullable: 'YES' },
        { column_name: 'image_url', data_type: 'character varying', is_nullable: 'NO' },
        { column_name: 'featured', data_type: 'boolean', is_nullable: 'NO' },
        { column_name: 'view_count', data_type: 'integer', is_nullable: 'YES' },
        { column_name: 'created_at', data_type: 'timestamp without time zone', is_nullable: 'NO' }
      ],
      skills: [
        { column_name: 'id', data_type: 'integer', is_nullable: 'NO' },
        { column_name: 'name', data_type: 'character varying', is_nullable: 'NO' },
        { column_name: 'category', data_type: 'character varying', is_nullable: 'NO' },
        { column_name: 'proficiency', data_type: 'integer', is_nullable: 'NO' },
        { column_name: 'created_at', data_type: 'timestamp without time zone', is_nullable: 'NO' }
      ],
      analytics: [
        { column_name: 'id', data_type: 'integer', is_nullable: 'NO' },
        { column_name: 'event_type', data_type: 'character varying', is_nullable: 'NO' },
        { column_name: 'page_url', data_type: 'character varying', is_nullable: 'YES' },
        { column_name: 'user_agent', data_type: 'text', is_nullable: 'YES' },
        { column_name: 'created_at', data_type: 'timestamp without time zone', is_nullable: 'NO' }
      ]
    };
    
    res.json({
      success: true,
      data: {
        table: tableName,
        columns: schemas[tableName] || [],
        rows: paginatedData,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching table data',
      error: error.message
    });
  }
});

// Get database statistics
router.get('/stats', async (req, res) => {
  try {
    // Simple working stats - get contact count directly
    let contactsCount = 0;
    try {
      const contacts = await mockDB.contacts.find();
      contactsCount = contacts.length;
      console.log('Contacts found:', contactsCount, contacts);
    } catch (err) {
      console.log('Error getting contacts:', err.message);
      contactsCount = 0;
    }
    
    const stats = {
      contacts: contactsCount,
      projects: 3,
      skills: 5,
      analytics: 0,
      recentContacts: contactsCount,
      featuredProjects: 1
    };
    
    console.log('Final stats returned:', stats);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error in stats endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching database stats',
      error: error.message
    });
  }
});

// Execute custom SQL query (mock implementation)
router.post('/query', async (req, res) => {
  try {
    const { sql } = req.body;
    
    if (!sql) {
      return res.status(400).json({
        success: false,
        message: 'SQL query is required'
      });
    }
    
    // Basic query simulation for SELECT statements
    let data = [];
    let rowCount = 0;
    
    if (sql.toLowerCase().includes('contacts')) {
      data = mockDB.contacts;
    } else if (sql.toLowerCase().includes('projects')) {
      data = mockDB.projects;
    } else if (sql.toLowerCase().includes('skills')) {
      data = mockDB.skills;
    } else if (sql.toLowerCase().includes('analytics')) {
      data = mockDB.analytics;
    }
    
    rowCount = data.length;
    
    res.json({
      success: true,
      data: {
        rows: data,
        rowCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error executing query',
      error: error.message
    });
  }
});

module.exports = router;
