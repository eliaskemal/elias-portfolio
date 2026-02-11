const express = require('express');
const router = express.Router();
const { mockDB } = require('../mock-database');

// Get all projects with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      featured, 
      difficulty,
      search 
    } = req.query;
    
    const projects = await mockDB.projects.find({ category, featured, difficulty, search });
    const total = await mockDB.projects.countDocuments();
    
    // Simple pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProjects = projects.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedProjects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        categories: ['web', 'mobile', 'ai', 'cybersecurity', 'other'],
        difficulties: ['beginner', 'intermediate', 'advanced']
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
    const project = await mockDB.projects.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      data: project
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
    const projectData = req.body;
    
    // Validation
    if (!projectData.title || !projectData.description || !projectData.image) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and image are required'
      });
    }
    
    const projects = await mockDB.projects.find();
    const newProject = {
      _id: Date.now().toString(),
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    projects.push(newProject);
    
    console.log('✅ Project created (Mock Database)');
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject
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
    const projects = await mockDB.projects.find();
    const projectIndex = projects.findIndex(p => p._id === req.params.id);
    
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Update project
    projects[projectIndex] = {
      ...projects[projectIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    console.log('✅ Project updated (Mock Database)');
    
    res.json({
      success: true,
      message: 'Project updated successfully',
      data: projects[projectIndex]
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
    const projects = await mockDB.projects.find();
    const projectIndex = projects.findIndex(p => p._id === req.params.id);
    
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Remove project
    projects.splice(projectIndex, 1);
    
    console.log('✅ Project deleted (Mock Database)');
    
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
    const projects = await mockDB.projects.find({ featured: true });
    
    res.json({
      success: true,
      data: projects.slice(0, 6) // Limit to 6 featured projects
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
