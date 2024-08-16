const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  modele: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  plaque: {
    type: String,
    required: true,
  },
  dateMiseEnCirculation: {
    type: Date,
    required: true,
  },
  photo: {
    type: String, // Stockage du chemin de la photo
  },
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;
