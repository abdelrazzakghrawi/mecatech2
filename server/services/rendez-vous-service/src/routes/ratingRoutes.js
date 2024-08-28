const express = require('express');
const router = express.Router();
const {createRating} = require('../controllers/ratingController');

router.post('/ratings', createRating);

module.exports = router;
