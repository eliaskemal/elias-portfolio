const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// Get all projects with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      featured, 
      search 
    } = req.query;
    
    const offset = (page - 1) * limit;
    
    // Build query conditions
    let whereConditions = [];
    let queryParams = [];
    let paramCount = 0;
    
    if (category) {
      paramCount++;
      whereConditions.push(`category = $${paramCount}`);
      queryParams.push(category);
    }
    
    if (featured === 'true') {
      paramCount++;
      whereConditions.push(`featured = $${paramCount}`);
      queryParams.push(true);
    }
    
    if (search) {
      paramCount++;
      whereConditions.push(`(title ILIKE $${paramCount} OR description ILIKE $${paramCount} OR $${paramCount} = ANY(technologies))`);
      queryParams.push(`%${search}%`);
    }
    
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
    
    // Get projects
    const projectsQuery = `
      SELECT * FROM projects 
      ${whereClause}
      ORDER BY featured DESC, created_at DESC 
      LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
    `;
    
    queryParams.push(parseInt(limit), parseInt(offset));
    
    const projects = await query(projectsQuery, queryParams);
    
    // Get total count
    const countQuery = `SELECT COUNT(*) FROM projects ${whereClause}`;
    const totalResult = await query(countQuery, queryParams.slice(0, -2));
    const total = parseInt(totalResult.rows[0].count);
    
    res.json({
      success: true,
      data: projects.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        categories: ['web', 'mobile', 'ai', 'cybersecurity', 'other']
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
});

// Get single project by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Increment view count
    await query('UPDATE projects SET view_count = view_count + 1 WHERE id = $1', [req.params.id]);
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
});

// Create new project
router.post('/', async (req, res) => {
  try {
    const { title, description, technologies, github_url, live_url, image_url, featured = false } = req.body;
    
    // Validation
    if (!title || !description || !image_url) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and image are required'
      });
    }
    
    const result = await query(
      'INSERT INTO projects (title, description, technologies, github_url, live_url, image_url, featured) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, technologies, github_url, live_url, image_url, featured]
    );
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    const { title, description, technologies, github_url, live_url, image_url, featured } = req.body;
    
    const result = await query(
      'UPDATE projects SET title = $1, description = $2, technologies = $3, github_url = $4, live_url = $5, image_url = $6, featured = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *',
      [title, description, technologies, github_url, live_url, image_url, featured, req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Project updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM projects WHERE id = $1 RETURNING *', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
});

// Get featured projects
router.get('/featured/list', async (req, res) => {
  try {
    const projects = await query(
      'SELECT * FROM projects WHERE featured = true ORDER BY created_at DESC LIMIT 6'
    );
      
    res.json({
      success: true,
      data: projects.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured projects',
      error: error.message
    });
  }
});

module.exports = router;
