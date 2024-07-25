const mongoose = require('mongoose');

const prestationsSchema = new mongoose.Schema({
  Vidange: String,
  "Révision Intermédiaire - Vidange": String,
  "Distribution (Kit de distribution)": String,
  Embrayage: String,
  Climatisation: String,
  "Filtre d’habitacle": String,
  Freinage: String,
  Amortisseurs: String,
  Pneumatique: String,
  Échappement: String,
  "Liquide de refroidissement": String,
  "Vanne EGR": String,
  "Filtre à particules": String,
  Décalaminage: String,
  Carrosserie: String,
  Phares: String,
  Rétroviseurs: String,
  Batteries: String,
  Injecteurs: String,
  "Diagnostic Électronique": String
});

module.exports = mongoose.model('Prestations', prestationsSchema , 'Prestations');
