const express = require('express');
const router = express.Router();
const { getAllVilles, getQuartiersByVille } = require('../controllers/villeQuartierController');

router.get('/villes', getAllVilles);
router.get('/:ville/quartiers', getQuartiersByVille);

module.exports = router;
