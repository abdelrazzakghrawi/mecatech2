const mongoose = require('mongoose');

const GoogleUserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String },
  role: { type: String, enum: ['client', 'mecano'], required: true },
});

module.exports = mongoose.model('GoogleUser', GoogleUserSchema);
