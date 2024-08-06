const mongoose = require('mongoose');

const AutoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Marque: String,
    "Nom du modèle": String,
    "Années du modèle": String,
    "Type moteur": String,
    Carburant: String,
    Puissance_moteur: String,
    "Année_moteur": String,
});

module.exports = mongoose.model('Auto', AutoSchema, 'Auto');
