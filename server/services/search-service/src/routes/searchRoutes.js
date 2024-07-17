const express = require('express');
const router = express.Router();
const { searchMechanics } = require('../controllers/searchController');

router.get('/', searchMechanics);

module.exports = router;
