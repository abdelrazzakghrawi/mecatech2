const express = require('express');
const router = express.Router();
const { getAllMarques, getModelsByMarque, getEngineDetails } = require('../controllers/autoController');

router.get('/marques',getAllMarques); // This line is correct
router.get('/:marque/models', getModelsByMarque);
router.get('/:marque/:model/:years/details', getEngineDetails);





module.exports = router;
