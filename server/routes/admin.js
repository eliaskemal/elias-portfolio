const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// Get all table data
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
    
    let whereClause = '';
    let queryParams = [];
    let paramCount = 0;
    
    if (search) {
      paramCount++;
      whereClause = `WHERE name ILIKE $${paramCount} OR title ILIKE $${paramCount} OR email ILIKE $${paramCount} OR message ILIKE $${paramCount}`;
      queryParams.push(`%${search}%`);
    }
    
    // Get table data
    const dataQuery = `SELECT * FROM ${tableName} ${whereClause} ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    queryParams.push(parseInt(limit), parseInt(offset));
    
    const dataResult = await query(dataQuery, queryParams);
    
    // Get total count
    const countQuery = `SELECT COUNT(*) FROM ${tableName} ${whereClause}`;
    const countResult = await query(countQuery, search ? [queryParams[0]] : []);
    const total = parseInt(countResult.rows[0].count);
    
    // Get table schema
    const schemaQuery = `
      SELECT column_name, data_type, is_nullable, column_default 
      FROM information_schema.columns 
      WHERE table_name = $1 
      ORDER BY ordinal_position
    `;
    const schemaResult = await query(schemaQuery, [tableName]);
    
    res.json({
      success: true,
      data: {
        table: tableName,
        columns: schemaResult.rows,
        rows: dataResult.rows,
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

// Get all tables info
router.get('/tables', async (req, res) => {
  try {
    const tablesQuery = `
      SELECT table_name, 
             (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
      FROM information_schema.tables t 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;
    
    const tablesResult = await query(tablesQuery);
    
    // Get row counts for each table
    const tablesWithCounts = await Promise.all(
      tablesResult.rows.map(async (table) => {
        const countQuery = `SELECT COUNT(*) as row_count FROM ${table.table_name}`;
        const countResult = await query(countQuery);
        return {
          ...table,
          row_count: parseInt(countResult.rows[0].row_count)
        };
      })
    );
    
    res.json({
      success: true,
      data: tablesWithCounts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tables',
      error: error.message
    });
  }
});

// Execute custom SQL query (for admin use only)
router.post('/query', async (req, res) => {
  try {
    const { sql, params = [] } = req.body;
    
    if (!sql) {
      return res.status(400).json({
        success: false,
        message: 'SQL query is required'
      });
    }
    
    // Basic security check - prevent dangerous operations
    const dangerousKeywords = ['DROP', 'DELETE', 'TRUNCATE', 'ALTER', 'CREATE'];
    const upperSql = sql.toUpperCase();
    
    if (dangerousKeywords.some(keyword => upperSql.includes(keyword))) {
      return res.status(400).json({
        success: false,
        message: 'Dangerous SQL operations are not allowed'
      });
    }
    
    const result = await query(sql, params);
    
    res.json({
      success: true,
      data: {
        rows: result.rows,
        rowCount: result.rowCount
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

// Get database statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = {};
    
    // Get table statistics
    const tables = ['contacts', 'projects', 'skills', 'analytics'];
    
    for (const table of tables) {
      const countQuery = `SELECT COUNT(*) as count FROM ${table}`;
      const result = await query(countQuery);
      stats[table] = parseInt(result.rows[0].count);
    }
    
    // Get recent activity
    const recentContactsQuery = `
      SELECT COUNT(*) as count 
      FROM contacts 
      WHERE created_at >= NOW() - INTERVAL '7 days'
    `;
    const recentContactsResult = await query(recentContactsQuery);
    stats.recentContacts = parseInt(recentContactsResult.rows[0].count);
    
    // Get featured projects count
    const featuredProjectsQuery = `SELECT COUNT(*) as count FROM projects WHERE featured = true`;
    const featuredProjectsResult = await query(featuredProjectsQuery);
    stats.featuredProjects = parseInt(featuredProjectsResult.rows[0].count);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching database stats',
      error: error.message
    });
  }
});

module.exports = router;
