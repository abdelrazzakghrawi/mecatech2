import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isSameDay } from 'date-fns';
import { Hourglass, CircleX, CircleCheck } from 'lucide-react';
import "./Rendez.css";

const Rendezvous = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [rendezVous, setRendezVous] = useState([
    { id: 1, date: new Date(2024, 7, 1), status: 'confirmed', clientName: 'Fouad', clientNumber: '123-456-7890' },
    { id: 2, date: new Date(2024, 7, 2), status: 'cancelled', clientName: 'Hatim', clientNumber: '098-765-4321' },
    { id: 3, date: new Date(2024, 7, 3), status: 'pending', clientName: 'Kader', clientNumber: '456-789-0123' },
    { id: 4, date: new Date(2054, 7, 4), status: 'pending', clientName: 'Yassin', clientNumber: '456-789-0123' },
  ]);

  const updateRendezVousStatus = (id, newStatus) => {
    setRendezVous(rendezVous.map(rdv => rdv.id === id ? { ...rdv, status: newStatus } : rdv));
  };

  const handleConfirm = (id) => {
    updateRendezVousStatus(id, 'confirmed');
  };

  const handleCancel = (id) => {
    updateRendezVousStatus(id, 'cancelled');
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CircleCheck style={{ color: 'green', fontSize: '16px' }} />;
      case 'cancelled':
        return <CircleX style={{ color: 'red', fontSize: '16px' }} />;
      case 'pending':
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
                      <td>
                        {renderStatusIcon(rdv.status)}
                      </td>
                      <td>{rdv.clientName}</td>
                      <td>{rdv.clientNumber}</td>
                      <td>
                        {rdv.status === 'pending' && (
                          <>
                            <button className='confirmer' onClick={() => handleConfirm(rdv.id)} style={{ marginRight: '5px' }}>Confirmer</button>
                            <button className='annuler' onClick={() => handleCancel(rdv.id)}>Annuler</button>
                          </>
                        )}
                        {rdv.status !== 'pending' && rdv.status !== 'cancelled' && (
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
                    <td>
                      {renderStatusIcon(rdv.status)}
                    </td>
                    <td>{rdv.clientName}</td>
                    <td>{rdv.clientNumber}</td>
                    <td>
                      {rdv.status === 'pending' && (
                        <>
                          <button className='confirmer' onClick={() => handleConfirm(rdv.id)} style={{ marginRight: '5px' }}>Confirmer</button>
                          <button className='annuler' onClick={() => handleCancel(rdv.id)}>Annuler</button>
                        </>
                      )}
                      {rdv.status !== 'pending' && rdv.status !== 'cancelled' && (
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
