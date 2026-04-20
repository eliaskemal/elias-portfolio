const express = require('express');
const router = express.Router();
const { mockDB } = require('../mock-database');

// Get all contact messages (for admin)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const contacts = await mockDB.contacts.find();
    const total = contacts.length;
    
    // Simple pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedContacts = contacts.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedContacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact messages',
      error: error.message
    });
  }
});

// Create new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    console.log('Received contact form data:', { name, email, subject, message });
    
    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    
    const contact = await mockDB.contacts.create({
      name,
      email,
      subject,
      message
    });
    
    console.log('Contact created successfully:', contact);
    
    console.log('✅ Contact created:', name);
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
});

// Update contact status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const contacts = await mockDB.contacts.find();
    const contactIndex = contacts.findIndex(c => c._id === req.params.id);
    
    if (contactIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    // Update status
    contacts[contactIndex].status = status;
    contacts[contactIndex].updatedAt = new Date().toISOString();
    
    console.log('✅ Contact status updated:', status);
    
    res.json({
      success: true,
      message: 'Status updated successfully',
      data: contacts[contactIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating status',
      error: error.message
    });
  }
});

// Delete contact message
router.delete('/:id', async (req, res) => {
  try {
    const contacts = await mockDB.contacts.find();
    const contactIndex = contacts.findIndex(c => c._id === req.params.id);
    
    if (contactIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    // Remove contact
    contacts.splice(contactIndex, 1);
    
    console.log('✅ Contact deleted:', req.params.id);
    
    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting message',
      error: error.message
    });
  }
});

module.exports = router;
