const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const PlanningSchema = new Schema({
  mecanique_id: {
    type: String, // Changed from ObjectId to String
    required: true
  },
  jours_travail: {
    type: [String],
    enum: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'], // Enum to restrict to valid days
    required: true
  },
  horaires: {
    matin: {
      debut: { type: String, required: true }, // HH:MM format, you can add regex validation if needed
      fin: { type: String, required: true }
    },
    apres_midi: {
      debut: { type: String, required: true },
      fin: { type: String, required: true }
    }
  },
  max_clients_par_jour: {
    type: Number,
    min: 1 // Minimum number of clients
  },
  indisponibilites: [
    {
      debut: { type: Date, required: false },
      fin: { type: Date, required: false }
    }
  ]
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create the model
const Planning = mongoose.model('planning', PlanningSchema , 'planning');

module.exports = Planning;
