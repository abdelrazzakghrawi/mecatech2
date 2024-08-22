import React, { useState, useEffect, useMemo } from 'react';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'react-calendar/dist/Calendar.css';
import { faTimes, faCalendarAlt, faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

const ReservationModal = ({ mechanicId, clientId, handleClose }) => {
  const [planning, setPlanning] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
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

  const frenchLocale = {
    name: 'fr',
    weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  };

  dayjs.locale(frenchLocale);

  const isWorkingDay = (date) => {
    if (!planning) return false;
    const dayOfWeek = dayjs(date).format('ddd');
    return planning.jours_travail.includes(dayOfWeek);
  };

  const parseTime = (timeString) => {
    const time = dayjs(timeString, 'HH:mm');
    if (!time.isValid()) {
      console.error(`Invalid time format detected: ${timeString}`);
      return null;
    }
    return time;
  };
  
  const generateTimeOptions = useMemo(() => {
    if (!planning || !selectedDate) return [];
  
    const times = [];
  
    const morningStart = parseTime(planning.horaires.matin.debut);
    const morningEnd = parseTime(planning.horaires.matin.fin);
    const afternoonStart = parseTime(planning.horaires.apres_midi.debut);
    const afternoonEnd = parseTime(planning.horaires.apres_midi.fin);
  
    if (!morningStart || !morningEnd || !afternoonStart || !afternoonEnd) {
      setError('Invalid time format in planning data.');
      return [];
    }
  
    let current = morningStart;
  
    while (current.isBefore(morningEnd) || current.isSame(morningEnd)) {
      times.push(current.format('HH:mm'));
      current = current.add(30, 'minute');
    }
  
    current = afternoonStart;
    while (current.isBefore(afternoonEnd) || current.isSame(afternoonEnd)) {
      times.push(current.format('HH:mm'));
      current = current.add(30, 'minute');
    }
  
    return times;
  }, [planning, selectedDate]);
  
  const isWithinWorkingHours = (time) => {
    if (!planning) return false;
    const timeObj = dayjs(time, 'HH:mm');
    const morningStart = dayjs(planning.horaires.matin.debut, 'HH:mm');
    const morningEnd = dayjs(planning.horaires.matin.fin, 'HH:mm');
    const afternoonStart = dayjs(planning.horaires.apres_midi.debut, 'HH:mm');
    const afternoonEnd = dayjs(planning.horaires.apres_midi.fin, 'HH:mm');

    return (
      (timeObj.isAfter(morningStart) || timeObj.isSame(morningStart)) &&
      (timeObj.isBefore(morningEnd) || timeObj.isSame(morningEnd)) ||
      (timeObj.isAfter(afternoonStart) || timeObj.isSame(afternoonStart)) &&
      (timeObj.isBefore(afternoonEnd) || timeObj.isSame(afternoonEnd))
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(''); // Reset selected time when date changes
  };

  const handleReservation = () => {
    if (!selectedDate || !selectedTime) {
      setMessage({ type: 'error', content: 'Please select a date and time.' });
      return;
    }

    // Combine selected date and time
    const combinedDateTime = dayjs(selectedDate)
      .hour(dayjs(selectedTime, 'HH:mm').hour())
      .minute(dayjs(selectedTime, 'HH:mm').minute())
      .second(0)
      .millisecond(0)
      .toISOString();  // Convert to the desired ISO format

    // Determine if the time is in the morning or afternoon
    const morningStart = dayjs(planning.horaires.matin.debut, 'HH:mm');
    const morningEnd = dayjs(planning.horaires.matin.fin, 'HH:mm');
    const timeSlot = dayjs(selectedTime, 'HH:mm').isBetween(morningStart, morningEnd, null, '[]') ? 'matin' : 'apres_midi';

    const reservationData = {
      mecanique_id: mechanicId,
      client_id: clientId,
      date: combinedDateTime,  // Use combined date and time
      time_slot: timeSlot,      // Add the time slot (morning or afternoon)
      status: 'Pending'
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
      <div className="bg-white rounded-lg shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto relative">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Réserver une place</h3>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">Sélectionnez une date:</label>
                            <Calendar
                value={selectedDate}
                onChange={handleDateChange}
                tileClassName={({ date, view }) => {
                  if (view === 'month') {
                    if (dayjs(date).isSame(selectedDate, 'day')) return 'bg-blue-200 text-blue-700'; // Highlight the selected date
                    if (isUnavailableDate(date)) return 'bg-red-200 text-red-700';
                    if (isWorkingDay(date)) return 'bg-green-200 text-green-700';
                  }
                  return '';
                }}
                className="w-full shadow-md rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">Sélectionnez une heure:</label>
              {selectedDate ? (
               <div className="grid grid-cols-4 gap-2">
                    {generateTimeOptions.map((time) => (
                      <button
                        key={time}
                        className={`p-2 rounded-lg transition-colors duration-300 ${
                          selectedTime === time
                            ? 'bg-[#1FA9B6] text-white' // Highlight the selected time
                            : isWithinWorkingHours(time)
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() => setSelectedTime(time)}
                        disabled={!isWithinWorkingHours(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
             
              ) : (
                <p className="text-gray-500">Please select a date first.</p>
              )}
            </div>
          </div>
          {message.content && (
            <div className={`text-center p-4 mt-6 rounded-lg text-white ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
              {message.content}
            </div>
          )}
          <div className="mt-6 text-right">
            <button
              className="px-6 py-3 bg-[#1FA9B6] text-white font-semibold rounded-lg shadow-md hover:bg-[#168D99] transition-colors duration-300"
              onClick={handleReservation}
            >
              Confirmer la réservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
