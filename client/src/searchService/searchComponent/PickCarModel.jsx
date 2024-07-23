// src/components/SearchBarModal.js

import React, { useState, useEffect } from 'react';
import { fetchMarques, fetchModels, fetchDetails } from '../hooks/autoApi';
const PickCarModel = ({ isOpen, onClose }) => {
    const [marques, setMarques] = useState([]);
    const [models, setModels] = useState([]);
    const [details, setDetails] = useState({});
    const [selectedMarque, setSelectedMarque] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedYears, setSelectedYears] = useState('');
  
    useEffect(() => {
      if (isOpen) {
        setSelectedMarque('');
        setSelectedModel('');
        setSelectedYears('');
        setDetails({});
      }
    }, [isOpen]);
  
    const handleMarqueClick = () => {
      if (marques.length === 0) {
        fetchMarques()
          .then(data => setMarques(data))
          .catch(error => console.error('Error fetching marques:', error));
      }
    };
  
    const handleMarqueChange = (e) => {
      const marque = e.target.value;
      setSelectedMarque(marque);
      setSelectedModel('');
      setSelectedYears('');
      setDetails({});
      if (marque) {
        fetchModels(marque)
          .then(data => setModels(data))
          .catch(error => console.error('Error fetching models:', error));
      } else {
        setModels([]);
      }
    };
  
    const handleModelChange = (e) => {
      const [model, years] = e.target.value.split(' / ');
      setSelectedModel(model);
      setSelectedYears(years);
      if (selectedMarque && model && years) {
        fetchDetails(selectedMarque, model, years)
          .then(data => setDetails(data))
          .catch(error => console.error('Error fetching details:', error));
      }
    };
  
    const handleModelClick = () => {
      if (selectedMarque && models.length === 0) {
        fetchModels(selectedMarque)
          .then(data => setModels(data))
          .catch(error => console.error('Error fetching models:', error));
      }
    };
  
 
const handleClose = () => {
    if (selectedModel && selectedYears && selectedMarque) {
      const selectedCar = { model: selectedModel, years: selectedYears , marques :selectedMarque };
      onClose(selectedCar); // Pass the selected car object
    } else {
      alert('Veuillez sélectionner un modèle et une année avant de valider'); // Display an alert
      onClose(null); // Pass null if no car is selected
    }
  };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white pb-8 pl- shadow-lg w-full max-w-md relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        &#x2715;
                    </button>
                    <div className="text-2xl font-semibold mb-6 text-center bg-teal-500 text-white py-4">
                        Sélectionnez le modèle de votre véhicule
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-medium">Choisissez un constructeur</label>
                        <select
                            value={selectedMarque}
                            onChange={handleMarqueChange}
                            onClick={handleMarqueClick}
                            className="w-full px-4 py-2 border rounded"
                        >
                            <option value="" className="text-gray-500">Marques les plus populaires</option>
                            {marques.map((marque, index) => (
                                <option key={marque + index} value={marque} className="text-gray-700">{marque}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-medium">Choisissez un modèle</label>
                        <select
                            value={`${selectedModel} / ${selectedYears}`}
                            onChange={handleModelChange}
                            onClick={handleModelClick}
                            className="w-full px-4 py-2 border rounded"
                            disabled={!selectedMarque}
                        >
                            <option value="" className="text-gray-500">Choisissez un modèle</option>
                            {models.map((model, index) => (
                                <option key={model.model + index} value={`${model.model} / ${model.years}`} className="text-gray-700">{model.model} / {model.years}</option>
                            ))}
                        </select>
                    </div>
                    {Object.keys(details).length > 0 && (
                        <div className="mb-6">
                            <label className="block mb-2 font-medium">Choisissez une motorisation</label>
                            <select className="w-full px-4 py-2 border rounded">
                                <option value="" className="text-gray-500">Sélectionnez une motorisation</option>
                                {Object.keys(details).map((detailKey, index) => (
                                    <option key={detailKey + index} value={details[detailKey]} className="text-gray-700">{detailKey}: {details[detailKey]}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="flex justify-center">
                        <button
                            onClick={handleClose}
                            className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600"
                        >
                            VALIDER
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default PickCarModel;
