const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const buildAuthResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin,
  token: generateToken(user._id)
});

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Name, email, and password are required');
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password });
    res.status(201).json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Email and password are required');
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    res.json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  getProfile
};
