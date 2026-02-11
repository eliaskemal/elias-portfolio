const express = require('express');
const router = express.Router();
const { mockDB } = require('../mock-database');

// Get dashboard analytics
router.get('/dashboard', async (req, res) => {
  try {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Contact messages stats
    const contacts = await mockDB.contacts.find();
    const totalContacts = contacts.length;
    const recentContacts = contacts.filter(contact => 
      new Date(contact.createdAt) >= lastMonth
    ).length;
    const weeklyContacts = contacts.filter(contact => 
      new Date(contact.createdAt) >= lastWeek
    ).length;
    
    const contactsByStatus = contacts.reduce((acc, contact) => {
      acc[contact.status] = (acc[contact.status] || 0) + 1;
      return acc;
    }, {});
    
    // Projects stats
    const projects = await mockDB.projects.find();
    const totalProjects = projects.length;
    const featuredProjects = projects.filter(project => project.featured).length;
    const projectsByCategory = projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {});
    
    // Top viewed projects
    const topProjects = projects
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 5)
      .map(project => ({
        title: project.title,
        viewCount: project.viewCount || 0
      }));
    
    // Recent activity
    const recentContactsList = contacts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(contact => ({
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      }));
    
    res.json({
      success: true,
      data: {
        contacts: {
          total: totalContacts,
          recent: recentContactsList,
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
    const project = await mockDB.projects.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Calculate views over time (simplified)
    const viewsPerDay = Math.ceil((project.viewCount || 0) / 
      Math.max(1, Math.floor((Date.now() - new Date(project.createdAt)) / (1000 * 60 * 60 * 24)))
    );
    
    res.json({
      success: true,
      data: {
        totalViews: project.viewCount || 0,
        viewsPerDay,
        projectAge: Math.floor((Date.now() - new Date(project.createdAt)) / (1000 * 60 * 60 * 24))
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
    
    const contacts = await mockDB.contacts.find();
    const filteredContacts = contacts.filter(contact => 
      new Date(contact.createdAt) >= startDate
    );
    
    // Group by day for chart data
    const dailyStats = filteredContacts.reduce((acc, contact) => {
      const day = contact.createdAt.split('T')[0];
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
        totalContacts: filteredContacts.length,
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
