const express = require('express');
const router = express.Router();
const { createReservation, updateReservation, deleteReservation,  getReservationByMecaniqueId , updateReservationStatus,getReservationsByClientId  } = require('../controllers/reservationController');

// Route to create a reservation
router.post('/reservations', createReservation);

// Route to update a reservation
router.put('/reservations/:id', updateReservation);

router.put('/reservations/:id/status', updateReservationStatus);

// Route to delete a reservation
router.delete('/reservations/:id', deleteReservation);
// GET request to get a reservation by mecanique_id
router.get('/:mecanique_id', getReservationByMecaniqueId);
// Route pour récupérer les réservations par client_id
router.get('/reservations/client/:client_id', getReservationsByClientId);



module.exports = router;
