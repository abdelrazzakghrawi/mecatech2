const mongoose = require('mongoose');

const MechanicSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    compétance: String,
    Ville: String,
    "Nom Garage": String,
    Spécialités: String,
    Téléphone: String,
    Adresse: String,
    latitude: String,
    longitude: String,
    image_path: String,
});

module.exports = mongoose.model('Mechanic', MechanicSchema, 'mecanique_details');
