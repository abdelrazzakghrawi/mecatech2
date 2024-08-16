// routes/contactRoutes.js
const express = require('express');
const { submitContactForm } = require('../controllers/contacteznousController');

const router = express.Router();

router.post('/contact', submitContactForm);

module.exports = router;