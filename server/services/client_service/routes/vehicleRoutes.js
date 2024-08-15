const express = require('express');
const multer = require('multer');
const Vehicle = require('../models/Vehicle');
const { addVehicle, getVehicles } = require('../controllers/vehicleController'); // Assurez-vous que ce chemin est correct
const { authenticateToken } = require('../middleware/authenticateToken'); // Assurez-vous que ce chemin est correct

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Route pour ajouter un véhicule
router.post('/vehicles', authenticateToken, upload.single('photo'), addVehicle);

// Route pour récupérer les véhicules de l'utilisateur
router.get('/vehicles', authenticateToken, getVehicles);

// Update a vehicle
router.put('/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) {
      return res.status(404).json({ error: 'Véhicule non trouvé' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du véhicule' });
  }
});

router.delete('/vehicles/:id', async (req, res) => {
    try {
      const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ error: 'Véhicule non trouvé' });
      }
      res.json({ message: 'Véhicule supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression du véhicule' });
    }
  });


module.exports = router;
