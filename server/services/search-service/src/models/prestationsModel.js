const mongoose = require('mongoose');

const PrestationsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Categorie: String,
    Prestations: String,
});

module.exports = mongoose.model('Prestations', PrestationsSchema , 'Prestations');
