const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// Get dashboard analytics
router.get('/dashboard', async (req, res) => {
  try {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Contact messages stats
    const totalContactsResult = await query('SELECT COUNT(*) FROM contacts');
    const totalContacts = parseInt(totalContactsResult.rows[0].count);
    
    const recentContactsResult = await query('SELECT COUNT(*) FROM contacts WHERE created_at >= $1', [lastMonth]);
    const recentContacts = parseInt(recentContactsResult.rows[0].count);
    
    const weeklyContactsResult = await query('SELECT COUNT(*) FROM contacts WHERE created_at >= $1', [lastWeek]);
    const weeklyContacts = parseInt(weeklyContactsResult.rows[0].count);
    
    const contactsByStatusResult = await query('SELECT status, COUNT(*) FROM contacts GROUP BY status');
    const contactsByStatus = contactsByStatusResult.rows;
    
    // Projects stats
    const totalProjectsResult = await query('SELECT COUNT(*) FROM projects');
    const totalProjects = parseInt(totalProjectsResult.rows[0].count);
    
    const featuredProjectsResult = await query('SELECT COUNT(*) FROM projects WHERE featured = true');
    const featuredProjects = parseInt(featuredProjectsResult.rows[0].count);
    
    const projectsByCategoryResult = await query('SELECT category, COUNT(*) FROM projects GROUP BY category');
    const projectsByCategory = projectsByCategoryResult.rows;
    
    // Top viewed projects
    const topProjectsResult = await query(
      'SELECT title, view_count FROM projects ORDER BY view_count DESC LIMIT 5'
    );
    const topProjects = topProjectsResult.rows;
    
    // Recent activity
    const recentContactsListResult = await query(
      'SELECT name, email, subject, created_at FROM contacts ORDER BY created_at DESC LIMIT 5'
    );
    const recentContactsList = recentContactsListResult.rows;
    
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
    const result = await query(
      'SELECT title, view_count, created_at FROM projects WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    const project = result.rows[0];
    
    // Calculate views over time (simplified - you could enhance with detailed tracking)
    const viewsPerDay = Math.ceil(project.view_count / 
      Math.max(1, Math.floor((Date.now() - new Date(project.created_at)) / (1000 * 60 * 60 * 24)))
    );
    
    res.json({
      success: true,
      data: {
        totalViews: project.view_count,
        viewsPerDay,
        projectAge: Math.floor((Date.now() - new Date(project.created_at)) / (1000 * 60 * 60 * 24))
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
    
    const contactsResult = await query(
      'SELECT * FROM contacts WHERE created_at >= $1 ORDER BY created_at ASC',
      [startDate]
    );
    const contacts = contactsResult.rows;
    
    // Group by day for chart data
    const dailyStats = contacts.reduce((acc, contact) => {
      const day = new Date(contact.created_at).toISOString().split('T')[0];
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
