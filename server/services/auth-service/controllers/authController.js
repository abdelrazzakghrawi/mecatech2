const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const sendVerificationEmail = require('../utils/email');

const crypto = require('crypto');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

};
const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    if (!role || !['client', 'mecano'].includes(role)) {
      return res.status(400).json({ message: "Rôle invalide ou non spécifié" });
    }

    const user = new User({
      username,
      email,
      password,
      role,
      emailVerified: false,
    });

    await user.save();

    res.status(201).json({
      message: 'Utilisateur créé avec succès. Veuillez vérifier votre email pour valider votre compte.',
      userId: user._id,  
    });

    // Essayer d'envoyer l'email, mais ne pas casser la réponse en cas d'erreur
    try {
      await sendVerificationEmail(user.email, user._id);
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError);
    }

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
    res.json({ token, username: user.username, role: user.role, _id: user._id });
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
    res.json({ token: jwtToken, username: user.username, role: user.role, _id: user._id });
  } catch (error) {
    console.error('Google authentication failed:', error);
    res.status(400).json({ message: 'Google authentication failed' });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des informations utilisateur' });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des informations utilisateur' });
  }
};

// Mettre à jour les informations de l'utilisateur connecté
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.civilite = req.body.civilite || user.civilite;
      user.nom = req.body.nom || user.nom;
      user.username = req.body.username || user.username;
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.telephone = req.body.telephone || user.telephone;
      user.adresse = req.body.adresse || user.adresse;

      // Ajout de la gestion de l'image de profil
      if (req.body.profileImage) {
        user.profileImage = req.body.profileImage;
      }

      if (req.body.motDePasse) {
        user.password = req.body.motDePasse;
      }

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour des informations utilisateur' });
  }
};


const verifyEmail = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    user.emailVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { register, login, googleLogin, getUserProfile, updateUserProfile, verifyEmail , getUserById };