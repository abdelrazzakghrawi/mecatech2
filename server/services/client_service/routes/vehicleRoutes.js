const express = require('express');
const multer = require('multer');
const { addVehicle, getUserVehicles } = require('../controllers/vehicleController');
const auth = require('../middleware/authenticateToken');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/vehicles', auth, upload.single('photo'), addVehicle);
router.get('/vehicles', auth, getUserVehicles);

module.exports = router;
