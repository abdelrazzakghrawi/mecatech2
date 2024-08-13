import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const MechanicModal = ({ mechanic, mechanicImage, distance, handleClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg overflow-hidden w-11/12 md:w-2/3 lg:w-1/2 shadow-2xl flex flex-col md:flex-row">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <img src={mechanicImage} alt={mechanic['Nom Garage']} className="w-full md:w-1/3 h-64 object-cover" />
        <div className="p-6 flex flex-col justify-center">
          <h3 className="text-2xl font-bold">{mechanic['Nom Garage']}</h3>
          <div className="border-l-4 border-[#1FA9B6] pl-4 mt-4 space-y-2">
            <p className="text-gray-700"><strong>Ville:</strong> {mechanic['Ville']}</p>
            <p className="text-gray-700"><strong>Téléphone:</strong> {mechanic['Téléphone']}</p>
            <p className="text-gray-700"><strong>Adresse:</strong> {mechanic['Adresse']}</p>
            <p className="text-gray-700"><strong>Spécialités:</strong> {mechanic['Spécialités']}</p>
            {distance && <p className="text-gray-700 mt-2">Distance: {distance} km</p>}
          </div>
          <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300" onClick={handleClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MechanicModal;