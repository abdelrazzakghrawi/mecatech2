const Planning = require('../models/planingModel');
const Reservation = require('../models/reservationModel');
const axios = require('axios');

// Create a new reservation
const createReservation = async (req, res) => {
  try {
    const { mecanique_id, client_id, date, time_slot } = req.body;

    // Fetch the mechanic's planning
    const planning = await Planning.findOne({ mecanique_id });

    if (!planning) {
      return res.status(404).json({ message: 'Planning not found for this mechanic.' });
    }

    const reservationDate = new Date(date);
    const dayOfWeek = reservationDate.toLocaleString('fr-FR', { weekday: 'short' });
    const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    const finalDayOfWeek = capitalizedDayOfWeek.replace('.', '');
    console.log(finalDayOfWeek);
    // Check if the day is within the mechanic's working days
    if (!planning.jours_travail.includes(finalDayOfWeek)) {
        console.log(planning.jours_travail)
      return res.status(400).json({ message: `The mechanic does not work on ${finalDayOfWeek}.` });
    }

    // Check if the date falls within any of the mechanic's unavailable periods
    const isUnavailable = planning.indisponibilites.some(unavailability => {
      return reservationDate >= new Date(unavailability.debut) && reservationDate <= new Date(unavailability.fin);
    });

    if (isUnavailable) {
      return res.status(400).json({ message: 'The mechanic is unavailable on this date.' });
    }

    // Check if the time slot is valid
    if (!['matin', 'apres_midi'].includes(time_slot)) {
      return res.status(400).json({ message: 'Invalid time slot.' });
    }

    // Check if the mechanic has reached the maximum number of clients for the day
    const reservationsCount = await Reservation.countDocuments({ mecanique_id, date: reservationDate });
    if (reservationsCount >= planning.max_clients_par_jour) {
      return res.status(400).json({ message: 'The mechanic is fully booked on this date.' });
    }

    // Create the reservation
    const reservation = new Reservation({
      mecanique_id,
      client_id,
      date: reservationDate,
      time_slot,
      status: 'Pending'
    });

    await reservation.save();
    res.status(201).json({ message: 'Reservation created successfully.', reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing reservation
const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time_slot, status , mecanique_id } = req.body;

    // Fetch the reservation
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    // Fetch the mechanic's planning for validation
    const planning = await Planning.findOne({ mecanique_id: reservation.mecanique_id });

    const reservationDate = new Date(date);
    const dayOfWeek = reservationDate.toLocaleString('fr-FR', { weekday: 'short' });
    const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    const finalDayOfWeek = capitalizedDayOfWeek.replace('.', '');
    console.log(finalDayOfWeek);
    // Check if the day is within the mechanic's working days
    if (!planning.jours_travail.includes(finalDayOfWeek)) {
        console.log(planning.jours_travail)
      return res.status(400).json({ message: `The mechanic does not work on ${finalDayOfWeek}.` });
    }

    // Check if the date falls within any of the mechanic's unavailable periods
    const isUnavailable = planning.indisponibilites.some(unavailability => {
      return reservationDate >= new Date(unavailability.debut) && reservationDate <= new Date(unavailability.fin);
    });

    if (isUnavailable) {
      return res.status(400).json({ message: 'The mechanic is unavailable on this date.' });
    }

    // Check if the time slot is valid
    if (!['matin', 'apres_midi'].includes(time_slot)) {
      return res.status(400).json({ message: 'Invalid time slot.' });
    }

    // Check if the mechanic has reached the maximum number of clients for the day
    const reservationsCount = await Reservation.countDocuments({ mecanique_id, date: reservationDate });
    if (reservationsCount >= planning.max_clients_par_jour) {
      return res.status(400).json({ message: 'The mechanic is fully booked on this date.' });
    }
    reservation.date = date || reservation.date;
    reservation.time_slot = time_slot || reservation.time_slot;
    reservation.status = status || reservation.status;

    await reservation.save();
    res.status(200).json({ message: 'Reservation updated successfully.', reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a reservation
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    res.status(200).json({ message: 'Reservation deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReservationByMecaniqueId = async (req, res) => {
    try {
        const { mecanique_id } = req.params;

        // Fetch reservations by mecanique_id
        const reservations = await Reservation.find({ mecanique_id });

        // If no reservations found, return an empty array
        if (reservations.length === 0) {
            return res.json({ message: 'No reservations found', reservations: [] });
        }

        // Map through reservations and fetch client details for each reservation
        const reservationsWithClientDetails = await Promise.all(
            reservations.map(async (reservation) => {
                const clientDetails = await axios.get(`http://auth-service:5000/api/auth/details/${reservation.client_id}`);
                return {
                    reservation,
                    clientDetails: clientDetails.data
                };
            })
        );

        // Return the combined results
        res.json(reservationsWithClientDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching reservations', error: error.message });
    }
};
const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Fetch the reservation by ID
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    // Update the status of the reservation
    reservation.status = status || reservation.status;

    await reservation.save();
    res.status(200).json({ message: 'Reservation status updated successfully.', reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getReservationsByClientId = async (req, res) => {
  try {
    const { client_id } = req.params;

    // Récupérer toutes les réservations par client_id
    const reservations = await Reservation.find({ client_id });

    if (reservations.length === 0) {
      return res.status(404).json({ message: 'Aucune réservation trouvée pour ce client.' });
    }

    res.status(200).json({ reservations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createReservation,
  updateReservation,
  deleteReservation, 
  getReservationByMecaniqueId,
  updateReservationStatus,
  getReservationsByClientId
   // Export the new function
};

