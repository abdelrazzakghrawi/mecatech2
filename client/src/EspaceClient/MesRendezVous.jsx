import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RatingForm from '../Rating/RatingForm';

const MesRendezVous = () => {
  const [filter, setFilter] = useState('tous');
  const [rendezVous, setRendezVous] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const clientId = localStorage.getItem('_id');

  const fetchRendezVous = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3007/api/reservations/client/${clientId}`);
      const fetchedRendezVous = Array.isArray(response.data.reservations) ? response.data.reservations : [];
      setRendezVous(fetchedRendezVous);
    } catch (error) {
      console.error('Erreur lors du chargement des rendez-vous', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (rdvId) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
      try {
        await axios.delete(`http://localhost:3007/api/reservations/${rdvId}`);
        setRendezVous(rendezVous.filter((rdv) => rdv._id !== rdvId));
        alert('Rendez-vous annulé avec succès.');
      } catch (error) {
        console.error('Erreur lors de l\'annulation du rendez-vous', error);
      }
    }
  };

  useEffect(() => {
    if (!clientId) {
      console.error('clientId is undefined');
      return;
    }

    fetchRendezVous();
    const intervalId = setInterval(fetchRendezVous, 30000);

    return () => clearInterval(intervalId);
  }, [clientId]);

  const filterRendezVous = (rdv) => {
    const statusLower = rdv.status.toLowerCase();
    const currentDate = new Date();

    if (filter === 'tous') return true;
    if (filter === 'passés') return new Date(rdv.date) < currentDate && statusLower === 'confirmed';
    if (filter === 'en attente') return statusLower === 'pending';
    if (filter === 'confirmés') return statusLower === 'confirmed';
    if (filter === 'annulés') return statusLower === 'cancelled';
    return false;
  };

  const handleRateClick = (rdv) => {
    setSelectedReservation(rdv);
    setShowRatingModal(true);
  };
  const handleCloseRatingModal = () => {
    setShowRatingModal(false);
    setSelectedReservation(null);
  };

  return (
    <div className="bg-[#E9EAEB] shadow-lg rounded-xl w-[800px] h-[540px] p-6 mx-auto my-10 animate-fadeIn">
      <h2 className="text-3xl font-bold text-[#00378A] mb-6 border-b-4 border-[#00378A] inline-block">
        Mes rendez-vous
      </h2>

      <div className="mb-6">
        <span className="block text-lg font-semibold mb-2 text-[#00378A]">Filtrer par</span>
        <div className="flex flex-wrap gap-2 mb-4">
          {['tous', 'en attente', 'confirmés', 'annulés', 'passés'].map((item) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === item.toLowerCase()
                  ? 'bg-[#00378A] text-white'
                  : 'bg-[#E0E3E8] text-[#00378A] hover:bg-[#00378A] hover:text-white'
              }`}
              onClick={() => setFilter(item.toLowerCase())}
            >
              {`Rendez-vous ${item}`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#00378A]"></div>
        </div>
      ) : (
        <ul className="space-y-4">
          {rendezVous.length === 0 ? (
            <li className="text-gray-600">Aucun rendez-vous disponible dans votre historique</li>
          ) : (
            rendezVous
              .filter(filterRendezVous)
              .map((rdv) => {
                const statusLower = rdv.status.toLowerCase();
                const isPast = new Date(rdv.date) < new Date();

                let statusLabel;
                switch (statusLower) {
                  case 'confirmed':
                    statusLabel = 'Rendez-vous confirmé';
                    break;
                  case 'pending':
                    statusLabel = 'Rendez-vous en attente de confirmation';
                    break;
                  case 'cancelled':
                    statusLabel = 'Rendez-vous annulé';
                    break;
                  default:
                    statusLabel = 'Statut inconnu';
                }

                return (
                  <li
                    key={rdv._id}
                    className="flex justify-between items-center p-4 border border-[#00378A] rounded-lg bg-white shadow-sm"
                  >
                    <span className="text-[#00378A] font-medium">{new Date(rdv.date).toLocaleDateString()}</span>
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        statusLower === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : statusLower === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {statusLabel}
                    </span>
                    {statusLower !== 'cancelled' && !isPast && (
                      <button
                        className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg"
                        onClick={() => handleCancel(rdv._id)}
                      >
                        Annuler
                      </button>
                    )}
                    {isPast && statusLower === 'confirmed' && (
                      <button
                        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                        onClick={() => handleRateClick(rdv)}
                      >
                        Rate this mecanique
                      </button>
                    )}
                  </li>
                );
              })
          )}
        </ul>
      )}

{showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg overflow-hidden">
            <RatingForm 
              reservationId={selectedReservation._id} 
              onClose={handleCloseRatingModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MesRendezVous;