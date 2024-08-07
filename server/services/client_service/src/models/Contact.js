const mongoose = require('mongoose');

// Schéma pour le formulaire "Contactez-Nous"
const contactSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    telephone: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String }  // Champ pour le chemin de l'image
});

// Schéma pour le formulaire "Mon Compte"
const clientSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    telephone: { type: String, required: true },
    message: { type: String },  // Ajoutez des champs spécifiques au profil
    imageUrl: { type: String }  // Champ pour le chemin de l'image
});

const InfoContact = mongoose.model('InfoContact', contactSchema);
const InfoClient = mongoose.model('InfoClient', clientSchema);

module.exports = { InfoClient, InfoContact };
