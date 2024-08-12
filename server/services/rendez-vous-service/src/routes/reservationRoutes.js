const express = require('express');
const router = express.Router();
const { createReservation, updateReservation, deleteReservation } = require('../controllers/reservationController');

// Route to create a reservation
router.post('/reservations', createReservation);

// Route to update a reservation
router.put('/reservations/:id', updateReservation);

// Route to delete a reservation
router.delete('/reservations/:id', deleteReservation);

module.exports = router;
