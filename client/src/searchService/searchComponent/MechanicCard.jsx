import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

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
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (userLocation) {
      const dist = calculateDistance(userLocation.lat, userLocation.lng, parseFloat(mechanic.latitude), parseFloat(mechanic.longitude));
      setDistance(dist ? dist.toFixed(2) : null);
    }
  }, [userLocation, mechanic.latitude, mechanic.longitude]);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={`http://localhost:3003/${mechanic.image_path}`} alt={mechanic['Nom Garage']} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{mechanic['Nom Garage']}</h3>
        <p className="text-gray-500 mt-2">{mechanic['Téléphone']}</p>
        <div className="mt-4 flex justify-between">
          <button className="bg-[#1FA9B6] text-white px-4 py-2 rounded hover:bg-[#1c8a9b] transition-colors duration-300" onClick={handleShowModal}>
            Détails <FontAwesomeIcon icon={faInfoCircle} className="ml-2" />
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
            Réservation <FontAwesomeIcon icon={faCalendarAlt} className="ml-2" />
          </button>
        </div>
        {distance && <p className="text-gray-700 mt-2">Distance: {distance} km</p>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg overflow-hidden w-11/12 md:w-2/3 lg:w-1/2 shadow-2xl flex flex-col md:flex-row">
            <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900" onClick={handleCloseModal}>
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            <img src={`http://localhost:3003/${mechanic.image_path}`} alt={mechanic['Nom Garage']} className="w-full md:w-1/3 h-64 object-cover" />
            <div className="p-6 flex flex-col justify-center">
              <h3 className="text-2xl font-bold">{mechanic['Nom Garage']}</h3>
              <div className="border-l-4 border-[#1FA9B6] pl-4 mt-4 space-y-2">
                <p className="text-gray-700"><strong>Ville:</strong> {mechanic['Ville']}</p>
                <p className="text-gray-700"><strong>Téléphone:</strong> {mechanic['Téléphone']}</p>
                <p className="text-gray-700"><strong>Adresse:</strong> {mechanic['Adresse']}</p>
                <p className="text-gray-700"><strong>Spécialités:</strong> {mechanic['Spécialités']}</p>
              </div>
              {distance && <p className="text-gray-700 mt-2">Distance: {distance} km</p>}
              <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300" onClick={handleCloseModal}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MechanicCard;
