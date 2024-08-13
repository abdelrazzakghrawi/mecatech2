const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const ReservationSchema = new Schema({
  mecanique_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garage',
    required: true
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  },
  time_slot: {
    type: String, // "matin" or "apres_midi"
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create the model
const Reservation = mongoose.model('Reservation', ReservationSchema ,'Reservation') ;

module.exports = Reservation;
