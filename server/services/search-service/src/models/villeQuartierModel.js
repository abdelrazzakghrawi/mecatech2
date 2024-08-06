const mongoose = require('mongoose');

const VilleQuartierSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    VILLE: String,
    QUARTIER: String,
    "NOUVEAU CODE POSTAL": String,
    latitude: String,
    longitude: String,
});

module.exports = mongoose.model('VilleQuartier', VilleQuartierSchema , 'Ville_quartier');
