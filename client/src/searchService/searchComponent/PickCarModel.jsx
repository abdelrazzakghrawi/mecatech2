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
      fetchMarques()
        .then(data => setMarques(data))
        .catch(error => console.error('Error fetching marques:', error));
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedMarque) {
      fetchModels(selectedMarque)
        .then(data => setModels(data))
        .catch(error => console.error('Error fetching models:', error));
    } else {
      setModels([]);
    }
  }, [selectedMarque]);

  useEffect(() => {
    if (selectedMarque && selectedModel && selectedYears) {
      fetchDetails(selectedMarque, selectedModel, selectedYears)
        .then(data => setDetails(data))
        .catch(error => console.error('Error fetching details:', error));
    } else {
      setDetails({});
    }
  }, [selectedModel, selectedYears]);

  const handleMarqueChange = (e) => {
    setSelectedMarque(e.target.value);
    setSelectedModel('');
    setSelectedYears('');
  };

  const handleModelChange = (e) => {
    const [model, years] = e.target.value.split(' / ');
    setSelectedModel(model);
    setSelectedYears(years);
  };

  const handleCloseModal = () => {
    setDetails({});
    onClose(null);
  };

  const handleClose = () => {
    if (selectedModel && selectedYears && selectedMarque) {
      const selectedCar = { model: selectedModel, years: selectedYears, marques: selectedMarque };
      onClose(selectedCar);
    } else {
      alert('Veuillez sélectionner un modèle et une année avant de valider');
      onClose(null);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
        <div className="bg-white pb-8 shadow-lg w-full max-w-md relative">
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            &#x2715;
          </button>
          <div className="text-2xl font-semibold mb-6 text-center bg-teal-500 text-white py-4">
            Sélectionnez le modèle de votre véhicule
          </div>
          <div className="mb-6 mx-2">
            <label className="block mb-2 font-medium">Choisissez un constructeur</label>
            <select
              value={selectedMarque}
              onChange={handleMarqueChange}
              className="w-full px-4 py-2 border"
            >
              <option value="" className="text-gray-500">Marques les plus populaires</option>
              {marques.map((marque, index) => (
                <option key={marque + index} value={marque} className="text-gray-700">{marque}</option>
              ))}
            </select>
          </div>
          <div className="mb-6 mx-2">
            <label className="block mb-2 font-medium">Choisissez un modèle</label>
            <select
              value={`${selectedModel} / ${selectedYears}`}
              onChange={handleModelChange}
              className="w-full px-4 py-2 border"
              disabled={!selectedMarque}
            >
              <option value="" className="text-gray-500">Choisissez un modèle</option>
              {models.map((model, index) => (
                <option key={model.model + index} value={`${model.model} / ${model.years}`} className="text-gray-700">{model.model} / {model.years}</option>
              ))}
            </select>
          </div>
          {Object.keys(details).length > 0 && (
            <div className="mb-6 mx-2">
              <label className="block mb-2 font-medium">Choisissez une motorisation</label>
              <select className="w-full px-4 py-2 border">
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