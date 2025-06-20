const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * Generate JWT token
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  });
};

/**
 * Send JWT token response
 */
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  
  // Remove password from output
  user.password = undefined;
  
  res.status(statusCode).json({
    status: 'success',
    token,
    user
  });
};

/**
 * Register a new user
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email already in use'
      });
    }
    
    // Create new user
    const newUser = await User.create({
      name,
      email,
      password
    });
    
    // Generate and send token
    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

/**
 * Login user
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      });
    }
    
    // Find user by email and check password
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }
    
    // Generate and send token
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

/**
 * Get current user profile
 */
exports.getMe = async (req, res) => {
  try {
    // User is already available in req.user from the protect middleware
    res.status(200).json({
      status: 'success',
      data: {
        user: req.user
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * Update password
 */
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Get user from database with password
    const user = await User.findById(req.user._id).select('+password');
    
    // Check if current password is correct
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Your current password is incorrect'
      });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    // Generate and send new token
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

/**
 * Logout (client-side)
 */
exports.logout = (req, res) => {
  res.status(200).json({ status: 'success' });
};