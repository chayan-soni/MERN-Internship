const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET || 'day15-dev-secret';

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401);
    next(new Error('Not authorized, token missing'));
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecret);
    req.user = await User.findById(decoded.userId).select('-password');

    if (!req.user) {
      res.status(401);
      next(new Error('User not found'));
      return;
    }

    next();
  } catch (error) {
    res.status(401);
    next(new Error('Not authorized, token invalid'));
  }
};

module.exports = { protect };
