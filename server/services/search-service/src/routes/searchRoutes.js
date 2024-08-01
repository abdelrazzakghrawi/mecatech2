const express = require('express');
const router = express.Router();
const { searchMecanique } = require('../controllers/searchController'); // Make sure this matches the export name

router.get('/', searchMecanique);

module.exports = router;
