import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import MechanicModal from './MechanicModal';
import ReservationModal from './ReservationModal';
import LoginClient from '../../Auth/LoginClient'; // Import the LoginClient component
import { useAuth } from '../../Auth/AuthContext';

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    0.5 - Math.cos(dLat)/2 + 
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    (1 - Math.cos(dLon))/2;

  return R * 2 * Math.asin(Math.sqrt(a));
};

const MechanicCard = ({ mechanic, userLocation }) => {
  const [showModal, setShowModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [distance, setDistance] = useState(null);
  const [mechanicImage, setMechanicImage] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false); // State for login modal

  const { isAuthenticated } = useAuth(); // Access authentication status
  const clientId = localStorage.getItem('_id');
  console.log(clientId);

  useEffect(() => {
    if (userLocation) {
      const dist = calculateDistance(userLocation.lat, userLocation.lng, parseFloat(mechanic.latitude), parseFloat(mechanic.longitude));
      setDistance(dist ? dist.toFixed(2) : null);
    }
  }, [userLocation, mechanic.latitude, mechanic.longitude]);

  useEffect(() => {
    if (mechanic.image_path) {
      setMechanicImage(`http://localhost:3003/${mechanic.image_path}`);
    } else {
      const randomImageIndex = Math.floor(Math.random() * 20) + 1;
      setMechanicImage(`http://localhost:3003/meca_images/${randomImageIndex}.jpeg`);
    }
  }, [mechanic.image_path]);
  

  const handleShowModal = () => setShowModal(true);

  const handleShowReservationModal = () => {
    if (isAuthenticated) {
      setShowReservationModal(true);
    } else {
      setShowLoginModal(true); // Show login modal if not authenticated
    }
  };

   // Handle successful login
   const handleLoginSuccess = () => {
    setShowLoginModal(false); // Close the login modal
    setShowReservationModal(true); // Show reservation modal after login
  };
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={mechanicImage} alt={mechanic['Nom Garage']} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{mechanic['Nom Garage']}</h3>
        <p className="text-gray-500 mt-2">{mechanic['Téléphone']}</p>
        <div className="mt-4 flex justify-between">
          <button className="bg-[#1FA9B6] text-white px-4 py-2 rounded hover:bg-[#1c8a9b] transition-colors duration-300" onClick={handleShowModal}>
            Détails <FontAwesomeIcon icon={faInfoCircle} className="ml-2" />
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
            onClick={handleShowReservationModal}
          >
            Réservation <FontAwesomeIcon icon={faCalendarAlt} className="ml-2" />
          </button>
        </div>
        {distance && <p className="text-gray-700 mt-2">Distance: {distance} km</p>}
      </div>

      {showModal && (
        <MechanicModal mechanic={mechanic} mechanicImage={mechanicImage} distance={distance} handleClose={() => setShowModal(false)} />
      )}

      {showReservationModal && (
        <ReservationModal mechanicId={mechanic._id} clientId={clientId} handleClose={() => setShowReservationModal(false)} />
      )}

      {showLoginModal && (
        <LoginClient
          isOpen={showLoginModal}
          closeModal={() => setShowLoginModal(false)}
          openRegisterModal={() => {/* Handle open register modal */}}
          onLoginSuccess={handleLoginSuccess} // Handle login success
        />
      )}
    </div>
  );
};

export default MechanicCard;
