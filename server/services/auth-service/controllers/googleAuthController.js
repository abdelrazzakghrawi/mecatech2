const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/User');

// Générer un token JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Connexion avec Google
exports.googleLogin = async (req, res) => {
  const { token, role } = req.body; // Récupérer le rôle du corps de la requête

  if (!role) {
    return res.status(400).json({ message: "Le rôle est requis." });
  }

  try {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
    const { email, sub: googleId } = response.data;

    if (!email || !googleId) {
      return res.status(400).json({ message: "Erreur de validation du token Google." });
    }

    let user = await User.findOne({ email });

    if (user) {
      if (user.googleId && user.googleId !== googleId) {
        return res.status(400).json({ message: 'Cet email est déjà enregistré via Google. Veuillez vous connecter via Google.' });
      } else if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }

      return res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    }

    const newUser = await User.create({
      username: email.split('@')[0],
      email,
      googleId,
      role, // Utiliser le rôle transmis
    });

    res.json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      token: generateToken(newUser._id, newUser.role),
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'authentification avec Google. Veuillez réessayer." });
  }
};
