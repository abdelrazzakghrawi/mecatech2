const axios = require('axios');

// Middleware d'authentification
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No token provided.' });
    }

    const response = await axios.get(process.env.AUTH_SERVICE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('Auth Response:', response.data); // Log pour vérifier la réponse
    req.user = response.data;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Invalid user data.' });
    }

    next();
  } catch (error) {
    console.error('Auth Error:', error.message || error.response?.data || error); // Log détaillé
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = auth;
