// /routes/planningRoutes.js
const express = require('express');
const router = express.Router();
const {getAllPlannings, getPlanningByMecaniqueId , createPlanning ,updatePlanning} = require('../controllers/planningController');

// Route to get planning by mecanique_id
router.get('/:mecanique_id', getPlanningByMecaniqueId);
router.get('/', getAllPlannings);

// Route to create a new planning
router.post('/planning', createPlanning);
router.put('/planning/:mecanique_id', updatePlanning);




module.exports = router;
