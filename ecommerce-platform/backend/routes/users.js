const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access   Private
router.put('/profile', [
  protect,
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('phone').optional().matches(/^\+?[1-9]\d{1,14}$/, 'Please add a valid phone number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const fieldsToUpdate = {};
    const allowedFields = ['name', 'email', 'phone', 'avatar'];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        fieldsToUpdate[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   POST /api/users/addresses
// @desc    Add address to user profile
// @access   Private
router.post('/addresses', [
  protect,
  body('street').notEmpty().withMessage('Street is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('zipCode').notEmpty().withMessage('Zip code is required'),
  body('country').notEmpty().withMessage('Country is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id);

    const newAddress = {
      ...req.body,
      isDefault: user.addresses.length === 0 // First address is default
    };

    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json({
      success: true,
      data: user.addresses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PUT /api/users/addresses/:id
// @desc    Update user address
// @access   Private
router.put('/addresses/:id', [
  protect,
  body('street').optional().notEmpty().withMessage('Street is required'),
  body('city').optional().notEmpty().withMessage('City is required'),
  body('state').optional().notEmpty().withMessage('State is required'),
  body('zipCode').optional().notEmpty().withMessage('Zip code is required'),
  body('country').optional().notEmpty().withMessage('Country is required')
], async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const addressIndex = user.addresses.findIndex(
      addr => addr._id.toString() === req.params.id
    );

    if (addressIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Address not found' 
      });
    }

    // Update address
    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex],
      ...req.body
    };

    await user.save();

    res.json({
      success: true,
      data: user.addresses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   DELETE /api/users/addresses/:id
// @desc    Delete user address
// @access   Private
router.delete('/addresses/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.addresses = user.addresses.filter(
      addr => addr._id.toString() !== req.params.id
    );

    await user.save();

    res.json({
      success: true,
      data: user.addresses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PUT /api/users/password
// @desc    Update user password
// @access   Private
router.put('/password', [
  protect,
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.matchPassword(req.body.currentPassword);

    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current password is incorrect' 
      });
    }

    // Update password
    user.password = req.body.newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

module.exports = router;
