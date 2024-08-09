// /routes/planningRoutes.js
const express = require('express');
const router = express.Router();
const {getAllPlannings, getPlanningByMecaniqueId } = require('../controllers/planningController');

// Route to get planning by mecanique_id
router.get('/:mecanique_id', getPlanningByMecaniqueId);
router.get('/', getAllPlannings);

module.exports = router;
