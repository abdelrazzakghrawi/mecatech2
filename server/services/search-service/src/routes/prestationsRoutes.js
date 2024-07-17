const express = require('express');
const router = express.Router();
const { getAllCategories, getPrestationsByCategorie } = require('../controllers/prestationsController');

router.get('/categories', getAllCategories);
router.get('/:categorie/prestations', getPrestationsByCategorie);

module.exports = router;
