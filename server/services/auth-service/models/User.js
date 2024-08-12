// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
  },
  name: {
    type: String,
    required: [false, 'Name is required'],
    trim: true,
  },
  telephone: {
    type: String,
    trim: true,
  },
  civilite: {
    type: String,
    enum: ['Mr', 'Mme'],
    trim: true,
  },
  adresse: {  // Ajout du champ adresse
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Email format is invalid'],
  },  profileImage: {
    type: String, // Utilisez String pour stocker l'image en base64 ou l'URL
    trim: true,
  },
  profileImage: {
    type: String, // Storing the image URL
    trim: true,
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId;
    },
    minlength: [6, 'Password must be at least 6 characters'],
  },
  googleId: {
    type: String,
  },
  role: {
    type: String,
    enum: ['client', 'mecano'],
    required: false, // Rendre le champ facultatif
  },
  

  emailVerificationToken: String,
  emailVerified: {
    type: Boolean,
    default: false,
  },
  profileImage: { type: String },
}, {
  timestamps: true
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);
