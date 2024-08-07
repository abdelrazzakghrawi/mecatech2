const jwt = require('jsonwebtoken');
const axios = require('axios');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Vérifiez le token en utilisant la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Optionnel : vous pouvez également vérifier le token avec un service externe
    // const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/verify`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error.message);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = auth;
