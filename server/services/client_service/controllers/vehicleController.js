const axios = require('axios');
const Vehicle = require('../models/Vehicle');
const Contact = require('../models/Contact');

// Middleware d'authentification
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const response = await axios.get(process.env.AUTH_SERVICE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    req.user = response.data;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Soumettre le formulaire de contact
const submitContactForm = async (req, res) => {
  try {
    const { sujet, message } = req.body;

    // Créer un nouveau document de contact
    const contact = new Contact({
      sujet,
      message,
    });

    // Sauvegarder dans la base de données
    await contact.save();

    res.status(201).json({ message: 'Message reçu avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    res.status(400).json({ error: 'Erreur lors de l\'envoi du message.' });
  }
};

// Ajouter un véhicule
// Ajouter un véhicule
const addVehicle = async (req, res) => {
  try {
    const { modele, nom, plaque, dateMiseEnCirculation } = req.body;

    // Vérification que req.user existe bien et contient l'_id
    if (!req.user || !req.user._id) {
      return res.status(400).json({ error: 'User information is missing or invalid.' });
    }

    const vehicle = new Vehicle({
      modele,
      nom,
      plaque,
      dateMiseEnCirculation,
      photo: req.file ? req.file.path : '',
      user: req.user._id, // Associe le véhicule à l'utilisateur connecté
    });

    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Récupérer les véhicules de l'utilisateur
const getUserVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ user: req.user._id }); // Filtrer par `userId`
    res.json(vehicles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addVehicle, getUserVehicles, submitContactForm, auth };
