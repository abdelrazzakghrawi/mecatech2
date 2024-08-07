const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Register new user with email and password
const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const user = new User({ username, email, password, role });
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ token, username: user.username, role: user.role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user with email and password
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ token, username: user.username, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Login user with Google
const googleLogin = async (req, res) => {
  const { token, role } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ googleId, email, username: name, role });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = googleId;
      if (!user.role) {
        user.role = role;
      }
      await user.save();
    }

    const jwtToken = generateToken(user);
    res.json({ token: jwtToken, username: user.username, role: user.role });
  } catch (error) {
    console.error('Google authentication failed:', error);
    res.status(400).json({ message: 'Google authentication failed' });
  }
};

module.exports = { register, login, googleLogin };