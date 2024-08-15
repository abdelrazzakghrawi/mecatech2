const Vehicle = require('../models/Vehicle');

const addVehicle = async (req, res) => {
  const { modele, nom, plaque, dateMiseEnCirculation, userId } = req.body;
  const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const vehicle = new Vehicle({ userId, modele, nom, plaque, dateMiseEnCirculation, photo: photoPath });
    await vehicle.save();
    res.status(201).json({ message: 'Véhicule ajouté avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout du véhicule.' });
  }
};

const getVehicles = async (req, res) => {
  const userId = req.user.id;

  try {
    const vehicles = await Vehicle.find({ userId });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des véhicules.' });
  }
};
const updateVehicle = async (req, res) => {
  const { id } = req.params; // Récupère l'ID du véhicule depuis les paramètres de la requête
  const { modele, nom, plaque, dateMiseEnCirculation } = req.body;
  const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ error: 'Véhicule non trouvé.' });
    }

    // Mise à jour des champs
    vehicle.modele = modele || vehicle.modele;
    vehicle.nom = nom || vehicle.nom;
    vehicle.plaque = plaque || vehicle.plaque;
    vehicle.dateMiseEnCirculation = dateMiseEnCirculation || vehicle.dateMiseEnCirculation;
    if (photoPath) {
      vehicle.photo = photoPath; // Mettre à jour la photo si une nouvelle a été envoyée
    }

    await vehicle.save();

    res.status(200).json({ message: 'Véhicule mis à jour avec succès.', vehicle });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du véhicule.' });
  }
};
const deleteVehicle = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehicle.findByIdAndDelete(id);

    if (!vehicle) {
      return res.status(404).json({ error: 'Véhicule non trouvé.' });
    }

    res.status(200).json({ message: 'Véhicule supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du véhicule.' });
  }
};



module.exports = { addVehicle, getVehicles,updateVehicle,deleteVehicle };
