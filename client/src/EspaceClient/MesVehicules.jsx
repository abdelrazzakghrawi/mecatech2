import { useState } from 'react';
import axios from 'axios';


const MesVehicules = () => {
  const [formData, setFormData] = useState({
    modele: '',
    nom: '',
    plaque: '',
    dateMiseEnCirculation: '',
  });
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    console.log('Token récupéré:', token); // Ajoutez ce log pour vérifier la présence du token
  
    if (!token) {
      setMessage('Vous devez être connecté pour ajouter un véhicule.');
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append('modele', formData.modele);
    formDataToSend.append('nom', formData.nom);
    formDataToSend.append('plaque', formData.plaque);
    formDataToSend.append('dateMiseEnCirculation', formData.dateMiseEnCirculation);
    if (photo) {
      formDataToSend.append('photo', photo);
    }
  
    try {
      const response = await axios.post('http://localhost:5007/api/vehicles', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  
      setMessage('Véhicule ajouté avec succès.');
      setFormData({
        modele: '',
        nom: '',
        plaque: '',
        dateMiseEnCirculation: '',
      });
      setPhoto(null);
    } catch (error) {
      if (error.response) {
        console.error('Erreur lors de l\'ajout du véhicule:', error.response.data);
        setMessage(`Erreur: ${error.response.data.error || 'Veuillez vérifier les détails et réessayer.'}`);
      } else if (error.request) {
        console.error('Aucune réponse reçue:', error.request);
        setMessage('Aucune réponse du serveur. Veuillez réessayer plus tard.');
      } else {
        console.error('Erreur:', error.message);
        setMessage('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };
   
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-teal-600 mb-6">Ajouter un véhicule</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <label className="block text-gray-600 mb-2">Photo du véhicule</label>
            <input
              type="file"
              onChange={handlePhotoChange}
              className="block text-gray-700 border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-teal-600 file:bg-teal-50 hover:file:bg-teal-100"
            />
            <span className="text-gray-500 text-sm">{photo ? photo.name : 'No file chosen'}</span>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Modèle du véhicule *</label>
          <input
            type="text"
            name="modele"
            value={formData.modele}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Nom du véhicule *</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Plaque d'immatriculation *</label>
          <input
            type="text"
            name="plaque"
            value={formData.plaque}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Date de mise en circulation *</label>
          <input
            type="date"
            name="dateMiseEnCirculation"
            value={formData.dateMiseEnCirculation}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-teal-500 text-white py-3 px-6 rounded-lg shadow hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          Ajouter
        </button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
};

export default MesVehicules;
