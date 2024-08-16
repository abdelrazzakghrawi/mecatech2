import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'react-calendar/dist/Calendar.css';
import { faTimes, faCalendarAlt, faCheckCircle, faExclamationTriangle, faClock } from '@fortawesome/free-solid-svg-icons';

dayjs.extend(isBetween);

const ReservationModal = ({ mechanicId, clientId, handleClose }) => {
  const [planning, setPlanning] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState({ type: '', content: '' });

  useEffect(() => {
    axios.get(`http://localhost:3007/api/planning/${mechanicId}`)
      .then(response => setPlanning(response.data))
      .catch(() => setError('Failed to load planning data.'));
  }, [mechanicId]);

  const isUnavailableDate = (date) => {
    if (!planning) return false;
    return planning.indisponibilites.some(unavailability =>
      dayjs(date).isBetween(dayjs(unavailability.debut), dayjs(unavailability.fin), null, '[]')
    );
  };

  const handleReservation = () => {
    if (!selectedDate || !selectedTimeSlot) {
      setMessage({ type: 'error', content: 'Please select a date and time slot.' });
      return;
    }
  
    const reservationData = {
      mecanique_id: mechanicId,
      client_id: clientId,
      date: dayjs(selectedDate).format('YYYY-MM-DD'),
      time_slot: selectedTimeSlot,
    };
  
    axios.post('http://localhost:3007/api/reservations', reservationData)
      .then(() => {
        setMessage({ type: 'success', content: 'Reservation successful!' });
        setTimeout(() => {
          handleClose();
        }, 2000);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || 'Failed to make a reservation.';
        setMessage({ type: 'error', content: errorMessage });
        console.error('Reservation error:', error);
      });
  };

  const renderWorkingDays = () => {
    if (!planning) return null;
    const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    return (
      <div className="flex justify-between space-x-2 mb-4">
        {daysOfWeek.map(day => (
          <div
            key={day}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              planning.jours_travail.includes(day) 
                ? 'bg-green-500 text-white' 
                : 'bg-red-200 text-red-700'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderTimeSlots = () => {
    if (!planning || !selectedDate) return null;

    const renderTimeSlot = (slot, label) => (
      <button
        className={`p-4 border-2 rounded-lg transition-colors duration-300 flex items-center justify-center ${
          selectedTimeSlot === slot 
            ? 'border-green-500 bg-green-100 text-green-700' 
            : 'border-gray-300 hover:border-green-300'
        }`}
        onClick={() => setSelectedTimeSlot(slot)}
        disabled={isUnavailableDate(selectedDate)}
      >
        <FontAwesomeIcon icon={faClock} className="mr-2" />
        <span>{label}</span>
        <span className="text-xs ml-2">
          ({planning.horaires[slot].debut} - {planning.horaires[slot].fin})
        </span>
      </button>
    );

    return (
      <div className="grid grid-cols-2 gap-4 mt-4">
        {renderTimeSlot('matin', 'Matin')}
        {renderTimeSlot('apres_midi', 'Après-midi')}
      </div>
    );
  };

  if (!planning) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-[1000]">
        <div className="bg-white rounded-lg shadow-2xl p-6">
          <p className="text-gray-700">Chargement des données de planification...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto relative">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Réserver une place</h3>
          <div className="space-y-6">
            {renderWorkingDays()}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Sélectionnez une date:</label>
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                tileClassName={({ date, view }) => 
                  view === 'month' && isUnavailableDate(date) ? 'bg-red-200 text-red-700' : ''
                }
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Sélectionnez un créneau horaire:</label>
              {renderTimeSlots()}
            </div>
            {message.content && (
              <div className={`text-center p-3 rounded-lg ${
                message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                <FontAwesomeIcon icon={message.type === 'error' ? faExclamationTriangle : faCheckCircle} className="mr-2" />
                {message.content}
              </div>
            )}
            <button
              className="w-full bg-[#1FA9B6] text-white py-3 rounded-lg hover:bg-[#178e9a] transition-colors duration-300 flex items-center justify-center"
              onClick={handleReservation}
              disabled={!selectedDate || !selectedTimeSlot}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              Réserver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;