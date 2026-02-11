const express = require('express');
const router = express.Router();
const { mockDB } = require('../mock-database');

// Get all skills with filtering
router.get('/', async (req, res) => {
  try {
    const { category, level, featured } = req.query;
    
    const skills = await mockDB.skills.find({ category, level, featured });
    
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
    const skill = await mockDB.skills.findById(req.params.id);
    
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
    
    const skills = await mockDB.skills.find();
    const newSkill = {
      _id: Date.now().toString(),
      ...skillData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    skills.push(newSkill);
    
    console.log('✅ Skill created (Mock Database)');
    
    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: newSkill
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
    const skills = await mockDB.skills.find();
    const skillIndex = skills.findIndex(s => s._id === req.params.id);
    
    if (skillIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    // Update skill
    skills[skillIndex] = {
      ...skills[skillIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    console.log('✅ Skill updated (Mock Database)');
    
    res.json({
      success: true,
      message: 'Skill updated successfully',
      data: skills[skillIndex]
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
    const skills = await mockDB.skills.find();
    const skillIndex = skills.findIndex(s => s._id === req.params.id);
    
    if (skillIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    // Remove skill
    skills.splice(skillIndex, 1);
    
    console.log('✅ Skill deleted (Mock Database)');
    
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
    const skills = await mockDB.skills.find({ 
      category: req.params.categoryName 
    });
    
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
