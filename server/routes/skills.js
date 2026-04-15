const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// Get all skills with filtering
router.get('/', async (req, res) => {
  try {
    const { category, proficiency } = req.query;
    
    // Build query conditions
    let whereConditions = [];
    let queryParams = [];
    let paramCount = 0;
    
    if (category) {
      paramCount++;
      whereConditions.push(`category = $${paramCount}`);
      queryParams.push(category);
    }
    
    if (proficiency) {
      paramCount++;
      whereConditions.push(`proficiency = $${paramCount}`);
      queryParams.push(parseInt(proficiency));
    }
    
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
    
    const skills = await query(
      `SELECT * FROM skills ${whereClause} ORDER BY name ASC`,
      queryParams
    );
      
    // Group skills by category
    const groupedSkills = skills.rows.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
    
    res.json({
      success: true,
      data: groupedSkills,
      categories: ['Frontend', 'Backend', 'Cybersecurity', 'Tools & Others']
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skills',
      error: error.message
    });
  }
});

// Get single skill by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM skills WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skill',
      error: error.message
    });
  }
});

// Create new skill
router.post('/', async (req, res) => {
  try {
    const { name, category, proficiency } = req.body;
    
    // Validation
    if (!name || !category || !proficiency) {
      return res.status(400).json({
        success: false,
        message: 'Skill name, category, and proficiency are required'
      });
    }
    
    const result = await query(
      'INSERT INTO skills (name, category, proficiency) VALUES ($1, $2, $3) RETURNING *',
      [name, category, parseInt(proficiency)]
    );
    
    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating skill',
      error: error.message
    });
  }
});

// Update skill
router.put('/:id', async (req, res) => {
  try {
    const { name, category, proficiency } = req.body;
    
    const result = await query(
      'UPDATE skills SET name = $1, category = $2, proficiency = $3 WHERE id = $4 RETURNING *',
      [name, category, parseInt(proficiency), req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Skill updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating skill',
      error: error.message
    });
  }
});

// Delete skill
router.delete('/:id', async (req, res) => {
  try {
    const result = await query('DELETE FROM skills WHERE id = $1 RETURNING *', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting skill',
      error: error.message
    });
  }
});

// Get skills by category
router.get('/category/:categoryName', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM skills WHERE category = $1 ORDER BY name ASC',
      [req.params.categoryName]
    );
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skills by category',
      error: error.message
    });
  }
});

module.exports = router;
