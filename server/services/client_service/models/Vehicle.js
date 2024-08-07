const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  modele: { type: String, required: true },
  nom: { type: String, required: true },
  plaque: { type: String, required: true, unique: true },
  dateMiseEnCirculation: { type: Date, required: true },
  photo: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, required: false },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
