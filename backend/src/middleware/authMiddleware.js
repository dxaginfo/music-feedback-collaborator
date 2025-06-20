const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * Middleware to protect routes by verifying JWT token
 */
exports.protect = async (req, res, next) => {
  let token;
  
  // Get token from authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  // Check if token exists
  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'You are not logged in. Please log in to access this resource.'
    });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token no longer exists.'
      });
    }
    
    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token. Please log in again.'
    });
  }
};

/**
 * Middleware to restrict access to certain user roles
 */
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // Roles is an array of allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

/**
 * Middleware to check project permissions
 */
exports.checkProjectPermissions = async (req, res, next) => {
  try {
    const projectId = req.params.id || req.params.projectId || req.body.projectId;
    if (!projectId) {
      return res.status(400).json({
        status: 'fail',
        message: 'Project ID is required'
      });
    }
    
    const userId = req.user._id;
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({
        status: 'fail',
        message: 'Project not found'
      });
    }
    
    // Check if user is the owner or a collaborator
    const isOwner = project.ownerId.toString() === userId.toString();
    const isCollaborator = project.collaborators.some(c => 
      c.userId.toString() === userId.toString() && 
      ['admin', 'editor'].includes(c.role)
    );
    
    if (!isOwner && !isCollaborator) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action on this project'
      });
    }
    
    // Add project to request for potential use in the controller
    req.project = project;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error checking project permissions'
    });
  }
};