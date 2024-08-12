import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ReservationModal = ({ mechanicId, clientId, handleClose }) => {
  const [planning, setPlanning] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3007/api/planning/${mechanicId}`)
      .then(response => setPlanning(response.data))
      .catch(() => setError('Failed to load planning data.'));
  }, [mechanicId]);

  const handleReservation = () => {
    if (!selectedDate || !selectedTimeSlot) {
      setError('Please select a date and time slot.');
      return;
    }

    const reservationData = {
      mecanique_id: mechanicId,
      client_id: clientId,
      date: selectedDate,
      time_slot: selectedTimeSlot,
    };

    axios.post('http://localhost:3007/api/reservations', reservationData)
      .then(() => {
        alert('Reservation successful!');
        handleClose();
      })
      .catch(() => setError('Failed to make a reservation. Please try again.'));
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 overflow-hidden relative">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-6">Réserver une place</h3>
          {planning ? (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-[#1FA9B6] transition duration-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Heure:</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className={`p-4 border-2 rounded-lg transition-colors duration-300 ${selectedTimeSlot === 'matin' ? 'border-green-500 bg-green-100' : 'border-gray-300'}`}
                    onClick={() => setSelectedTimeSlot('matin')}
                  >
                    Matin ({planning.horaires.matin.debut} - {planning.horaires.matin.fin})
                  </button>
                  <button
                    className={`p-4 border-2 rounded-lg transition-colors duration-300 ${selectedTimeSlot === 'apres_midi' ? 'border-green-500 bg-green-100' : 'border-gray-300'}`}
                    onClick={() => setSelectedTimeSlot('apres_midi')}
                  >
                    Après-midi ({planning.horaires.apres_midi.debut} - {planning.horaires.apres_midi.fin})
                  </button>
                </div>
              </div>
              <button
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
                onClick={handleReservation}
              >
                Réserver <FontAwesomeIcon icon={faCalendarAlt} className="ml-2" />
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          ) : (
            <p className="text-gray-500">Chargement des données de planification...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
