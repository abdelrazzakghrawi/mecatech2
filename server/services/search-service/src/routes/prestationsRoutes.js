const express = require('express');
const router = express.Router();
const { getAllCategoriesAndPrestations } = require('../controllers/prestationsController');

router.get('/categories', getAllCategoriesAndPrestations);

module.exports = router;
