import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';

const MesVehicules = () => {
  const { userId } = useAuth();  // Récupération de l'userId à partir du contexte
  const [formData, setFormData] = useState({
    modele: '',
    nom: '',
    plaque: '',
    dateMiseEnCirculation: '',
  });
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');
  const [vehicules, setVehicules] = useState([]); // Pour stocker les véhicules de l'utilisateur
  const [showVehicules, setShowVehicules] = useState(false); // Pour gérer l'affichage des véhicules

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

    const token = localStorage.getItem('authToken');
    if (!token) {
      setMessage('Vous devez être connecté pour ajouter un véhicule.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('modele', formData.modele);
    formDataToSend.append('nom', formData.nom);
    formDataToSend.append('plaque', formData.plaque);
    formDataToSend.append('dateMiseEnCirculation', formData.dateMiseEnCirculation);
    formDataToSend.append('userId', userId); // Ajouter l'userId à la requête
    if (photo) {
      formDataToSend.append('photo', photo);
    }

    try {
      await axios.post('http://localhost:5007/api/vehicles', formDataToSend, {
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
      fetchVehicules();  // Rafraîchir la liste des véhicules après l'ajout
    } catch (error) {
      if (error.response) {
        setMessage(`Erreur: ${error.response.data.error || 'Veuillez vérifier les détails et réessayer.'}`);
      } else if (error.request) {
        setMessage('Aucune réponse du serveur. Veuillez réessayer plus tard.');
      } else {
        setMessage('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  const fetchVehicules = async () => {
    try {
      const response = await axios.get('http://localhost:5007/api/vehicles', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setVehicules(response.data); // Les véhicules devraient déjà être filtrés par userId côté serveur
    } catch (error) {
      console.error('Erreur lors de la récupération des véhicules:', error);
      setMessage('Impossible de récupérer les véhicules. Veuillez réessayer plus tard.');
    }
  };
  

  useEffect(() => {
    if (showVehicules) {
      fetchVehicules();
    }
  }, [showVehicules]);

  return (
    <div className="bg-[#E9EAEB] shadow-lg rounded-xl w-[850px] h-auto p-10 mx-auto my-10 relative">
      <h2 className="text-3xl font-semibold text-[#00378A] mb-8 border-b-4 border-[#00378A] inline-block pb-1">
        Ajouter un véhicule
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Les champs du formulaire */}
        <div className="relative">
          <label className="block text-[#00378A] text-sm font-semibold mb-2">Photo du véhicule</label>
          <input
            type="file"
            onChange={handlePhotoChange}
            className="block w-full text-[#00378A] border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[#00378A] file:bg-[#E9EAEB] hover:file:bg-[#D3E1E6]"
          />
          <span className="text-gray-500 text-sm">{photo ? photo.name : 'Aucun fichier choisi'}</span>
        </div>

        <div>
          <label className="block text-[#00378A] text-sm font-semibold mb-2">Modèle du véhicule *</label>
          <input
            type="text"
            name="modele"
            value={formData.modele}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA9B6]"
            required
          />
        </div>

        <div>
          <label className="block text-[#00378A] text-sm font-semibold mb-2">Nom du véhicule *</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA9B6]"
            required
          />
        </div>

        <div>
          <label className="block text-[#00378A] text-sm font-semibold mb-2">Plaque d'immatriculation *</label>
          <input
            type="text"
            name="plaque"
            value={formData.plaque}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA9B6]"
            required
          />
        </div>

        <div>
          <label className="block text-[#00378A] text-sm font-semibold mb-2">Date de mise en circulation *</label>
          <input
            type="date"
            name="dateMiseEnCirculation"
            value={formData.dateMiseEnCirculation}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA9B6]"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-[#00378A] text-white py-3 px-6 rounded-full shadow-md hover:bg-[#002c6d] focus:outline-none focus:ring-2 focus:ring-[#00378A]"
        >
          Ajouter
        </button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}

      {/* Bouton pour afficher les véhicules enregistrés */}
      <button
        onClick={() => setShowVehicules(!showVehicules)}
        className="mt-6 w-full bg-[#1FA9B6] text-white py-3 px-6 rounded-full shadow-md hover:bg-[#17a0aa] focus:outline-none focus:ring-2 focus:ring-[#1FA9B6]"
      >
        {showVehicules ? 'Cacher les véhicules enregistrés' : 'Voir les véhicules enregistrés'}
      </button>

      {/* Afficher les véhicules si le bouton est cliqué */}
      {showVehicules && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#00378A] mb-4">Véhicules enregistrés :</h3>
          {vehicules.length > 0 ? (
            <ul className="space-y-4">
              {vehicules.map((vehicule) => (
                <li key={vehicule._id} className="bg-white p-4 rounded-lg shadow">
                  <p><strong>Modèle :</strong> {vehicule.modele}</p>
                  <p><strong>Nom :</strong> {vehicule.nom}</p>
                  <p><strong>Plaque d'immatriculation :</strong> {vehicule.plaque}</p>
                  <p><strong>Date de mise en circulation :</strong> {new Date(vehicule.dateMiseEnCirculation).toLocaleDateString()}</p>
                  {vehicule.photo && (
                    <img src={`http://localhost:5007/${vehicule.photo}`} alt="Photo du véhicule" className="mt-2 w-full max-w-xs" />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Aucun véhicule enregistré pour l'instant.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MesVehicules;
