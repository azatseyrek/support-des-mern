const asyncHandler = require('express-async-handler'); //async handler is a middleware that we can use to handle errors inside of our async express routes
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../modals/userModal');

// @desc Register a new user
// @route /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill all fields');
  }
  // Find if user Already exists
  const userExists = await User.findOne({email});
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // New user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Loginuser
// @route /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  // Check user and Password match
  if (user && isPasswordMatch) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc get current user
// @route /api/users/me
// @access Private

const getMe = asyncHandler(async (req, res) => {
  
});

// Gnerate Token
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
