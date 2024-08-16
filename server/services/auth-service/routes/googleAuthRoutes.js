const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ username: name, email, googleId, role: 'client' });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the JWT token to the client
    res.json({ token: jwtToken, username: user.username, role: user.role });
  } catch (error) {
    console.error('Google authentication failed', error);
    res.status(401).json({ message: 'Google authentication failed' });
  }
});


module.exports = router;