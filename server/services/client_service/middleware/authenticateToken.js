const jwt = require('jsonwebtoken');


const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Si aucun token, renvoyer une erreur 401

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Si le token n'est pas valide, renvoyer une erreur 403
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
