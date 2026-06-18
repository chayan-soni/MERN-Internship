const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'day15-dev-secret';

const generateToken = (userId) =>
  jwt.sign({ userId }, jwtSecret, { expiresIn: '7d' });

module.exports = generateToken;
