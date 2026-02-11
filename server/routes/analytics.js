const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const Project = require('../models/Project');

// Get dashboard analytics
router.get('/dashboard', async (req, res) => {
  try {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Contact messages stats
    const totalContacts = await Contact.countDocuments();
    const recentContacts = await Contact.countDocuments({ 
      createdAt: { $gte: lastMonth } 
    });
    const weeklyContacts = await Contact.countDocuments({ 
      createdAt: { $gte: lastWeek } 
    });
    
    const contactsByStatus = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    // Projects stats
    const totalProjects = await Project.countDocuments();
    const featuredProjects = await Project.countDocuments({ featured: true });
    const projectsByCategory = await Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    // Top viewed projects
    const topProjects = await Project.find()
      .sort({ viewCount: -1 })
      .limit(5)
      .select('title viewCount');
    
    // Recent activity
    const recentContactsList = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject createdAt');
    
    res.json({
      success: true,
      data: {
        contacts: {
          total: totalContacts,
          recent: recentContacts,
          weekly: weeklyContacts,
          byStatus: contactsByStatus
        },
        projects: {
          total: totalProjects,
          featured: featuredProjects,
          byCategory: projectsByCategory
        },
        topProjects,
        recentActivity: recentContactsList,
        lastUpdated: now
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics',
      error: error.message
    });
  }
});

// Get project views analytics
router.get('/projects/:id/views', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .select('title viewCount createdAt');
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Calculate views over time (simplified - you could enhance with detailed tracking)
    const viewsPerDay = Math.ceil(project.viewCount / 
      Math.max(1, Math.floor((Date.now() - project.createdAt) / (1000 * 60 * 60 * 24))
    );
    
    res.json({
      success: true,
      data: {
        totalViews: project.viewCount,
        viewsPerDay,
        projectAge: Math.floor((Date.now() - project.createdAt) / (1000 * 60 * 60 * 24))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project analytics',
      error: error.message
    });
  }
});

// Get contact form analytics
router.get('/contacts/stats', async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let startDate;
    const now = new Date();
    
    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    
    const contacts = await Contact.find({
      createdAt: { $gte: startDate }
    }).sort({ createdAt: 1 });
    
    // Group by day for chart data
    const dailyStats = contacts.reduce((acc, contact) => {
      const day = contact.createdAt.toISOString().split('T')[0];
      if (!acc[day]) {
        acc[day] = 0;
      }
      acc[day]++;
      return acc;
    }, {});
    
    res.json({
      success: true,
      data: {
        period,
        totalContacts: contacts.length,
        dailyStats,
        startDate,
        endDate: now
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact stats',
      error: error.message
    });
  }
});

module.exports = router;
