import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isSameDay } from 'date-fns';
import { Hourglass, CircleX, CircleCheck } from 'lucide-react';
import axios from 'axios';
import "./Rendez.css";
import Swal from 'sweetalert2';

const Rendezvous = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [rendezVous, setRendezVous] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mecaniqueId = localStorage.getItem('_id');

  useEffect(() => {
    if (mecaniqueId) {
      fetchReservations();
    } else {
      setError("Mechanic ID not found. Please log in.");
      setLoading(false);
    }
  }, [mecaniqueId]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3007/api/reservations/${mecaniqueId}`);
      const formattedReservations = response.data.map(item => ({
        id: item.reservation._id,
        date: new Date(item.reservation.date),
        status: item.reservation.status,
        clientName: item.clientDetails.username,
        clientNumber: item.clientDetails.telephone || 'Non spécifié',
        timeSlot: item.reservation.time_slot === 'matin' ? 'Matin' : 'Après-midi'
      }));
      setRendezVous(formattedReservations);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setError("Failed to fetch reservations. Please try again.");
      setLoading(false);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await axios.put(`http://localhost:3007/api/reservations/${id}/status`, { status: 'Confirmed' });
      fetchReservations();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "le reservation est Confirmer 👌",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error confirming reservation:', error);
      setError("Failed to confirm reservation. Please try again.");
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:3007/api/reservations/${id}/status`, { status: 'Cancelled' });
      fetchReservations();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "le reservation est Annuler ✖",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      setError("Failed to cancel reservation. Please try again.");
    }
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'Confirmed':
        return <CircleCheck style={{ color: 'green', fontSize: '16px' }} />;
      case 'Cancelled':
        return <CircleX style={{ color: 'red', fontSize: '16px' }} />;
      case 'Pending':
        return <Hourglass style={{ color: 'orange', fontSize: '16px' }} />;
      default:
        return null;
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const rdv = rendezVous.find(rdv => isSameDay(date, rdv.date));
      if (rdv) {
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {renderStatusIcon(rdv.status)}
          </div>
        );
      }
    }
    return null;
  };

  const handleDayClick = (value) => {
    setSelectedDate(value);
  };

  const handleRendezvousClick = (date) => {
    setDate(date);
    setSelectedDate(date);
    setActiveStartDate(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  const filteredRendezVous = rendezVous.filter(rdv => isSameDay(rdv.date, selectedDate));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Rendez-container">
      <div className='resultat'>
        {selectedDate ? (
          <div className='table'>
            <h3 className='pourendez'>Rendez-vous pour le {format(selectedDate, 'dd/MM/yyyy')}</h3>
            <button className='rende' onClick={() => setSelectedDate(null)}>Retour aux rendez-vous</button>
            {filteredRendezVous.length > 0 ? (
              <table className="Rendez-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Horaire</th>
                    <th>Status</th>
                    <th>Nom du client</th>
                    <th>Numéro du client</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRendezVous.map(rdv => (
                    <tr key={rdv.id}>
                      <td>{format(rdv.date, 'dd/MM/yyyy')}</td>
                      <td>{rdv.timeSlot}</td>
                      <td>
                        {renderStatusIcon(rdv.status)}
                        {rdv.status}
                      </td>
                      <td>{rdv.clientName}</td>
                      <td>{rdv.clientNumber}</td>
                      <td>
                        {rdv.status === 'Pending' && (
                          <>
                            <button className='confirmer' onClick={() => handleConfirm(rdv.id)}>Confirmer</button>
                            <button className='annuler' onClick={() => handleCancel(rdv.id)}>Annuler</button>
                          </>
                        )}
                        {rdv.status !== 'Pending' && rdv.status !== 'Cancelled' && (
                          <button className='annuler' onClick={() => handleCancel(rdv.id)}>Annuler</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h2 className='aucun'>Aucun rendez-vous pour cette date.</h2>
            )}
          </div>
        ) : (
          <div>
            <h3 className='vue'>Vue d'ensemble des rendez-vous</h3>
            <table className="Rendez-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Horaire</th>
                  <th>Status</th>
                  <th>Nom du client</th>
                  <th>Numéro du client</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rendezVous.map(rdv => (
                  <tr key={rdv.id} onClick={() => handleRendezvousClick(rdv.date)}>
                    <td>{format(rdv.date, 'dd/MM/yyyy')}</td>
                    <td>{rdv.timeSlot}</td>
                    <td>
                      {renderStatusIcon(rdv.status)}
                      {rdv.status}
                    </td>
                    <td>{rdv.clientName}</td>
                    <td>{rdv.clientNumber}</td>
                    <td>
                      {rdv.status === 'Pending' && (
                        <>
                          <button className='confirmer' onClick={() => handleConfirm(rdv.id)}>Confirmer</button>
                          <button className='annuler' onClick={() => handleCancel(rdv.id)}>Annuler</button>
                        </>
                      )}
                      {rdv.status !== 'Pending' && rdv.status !== 'Cancelled' && (
                        <button className='annuler' onClick={() => handleCancel(rdv.id)}>Annuler</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div>
        <Calendar
          className="calendrier"
          onChange={(value) => {
            setDate(value);
            handleDayClick(value);
          }}
          value={date}
          activeStartDate={activeStartDate}
          onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
          tileContent={tileContent}
        />
      </div>
    </div>
  );
};

export default Rendezvous;