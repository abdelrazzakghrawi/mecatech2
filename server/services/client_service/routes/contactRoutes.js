// routes/contactRoutes.js
const express = require('express');
const { submitContactForm } = require('../controllers/vehicleController');

const router = express.Router();

router.post('/contact', submitContactForm);

module.exports = router;
