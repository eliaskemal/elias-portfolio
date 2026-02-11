const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// Get all skills with filtering
router.get('/', async (req, res) => {
  try {
    const { category, level, featured } = req.query;
    
    // Build query
    let query = {};
    
    if (category) query.category = category;
    if (level) query.level = level;
    if (featured === 'true') query.featured = true;
    
    const skills = await Skill.find(query)
      .sort({ featured: -1, name: 1 });
      
    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
    
    res.json({
      success: true,
      data: groupedSkills,
      categories: ['Frontend', 'Backend', 'Cybersecurity', 'Tools & Others'],
      levels: ['beginner', 'intermediate', 'advanced', 'expert']
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
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    res.json({
      success: true,
      data: skill
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
    const skillData = req.body;
    
    // Validation
    if (!skillData.name || !skillData.category) {
      return res.status(400).json({
        success: false,
        message: 'Skill name and category are required'
      });
    }
    
    const skill = new Skill(skillData);
    await skill.save();
    
    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: skill
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
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Skill updated successfully',
      data: skill
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
    const skill = await Skill.findByIdAndDelete(req.params.id);
    
    if (!skill) {
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
    const skills = await Skill.find({ 
      category: req.params.categoryName 
    }).sort({ name: 1 });
    
    res.json({
      success: true,
      data: skills
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
