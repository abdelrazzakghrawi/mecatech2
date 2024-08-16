import { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import axios from 'axios';

const MonCompte = () => {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    civilite: '',
    name: '',
    username: '',
    email: '',
    telephone: '',
    adresse: '',
  });
  const [message, setMessage] = useState(''); // Pour gérer le message de succès ou d'erreur
  const [messageType, setMessageType] = useState(''); // Pour déterminer le type de message (succès ou erreur)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const response = await axios.get('http://localhost:5000/api/auth/me', config);
          const userData = response.data;
          setFormData({
            civilite: userData.civilite || '',
            name: userData.name || '',
            username: userData.username || '',
            email: userData.email || '',
            telephone: userData.telephone || '',
            adresse: userData.adresse || '',
          });
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur:', error);
        }
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.put('http://localhost:5000/api/auth/me', formData, config);
      setMessage('Vos informations ont été mises à jour avec succès.');
      setMessageType('success'); // Définir le type de message à succès
    } catch (error) {
      setMessage('Erreur lors de la mise à jour des informations.');
      setMessageType('error'); // Définir le type de message à erreur
      console.error('Erreur lors de la mise à jour des informations:', error);
    }

    // Réinitialiser le message après 5 secondes
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  return (
    <div className="bg-[#E9EAEB] shadow-lg rounded-2xl w-[850px] h-auto p-10 mx-auto my-10 relative">
      <h2 className="text-3xl font-semibold text-[#00378A] mb-8 border-b-4 border-[#00378A] inline-block pb-1">
        Mon compte
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Civilité */}
          <div className="relative">
            <label className="block text-[#00378A] text-sm font-semibold mb-2">Civilité</label>
            <select
              name="civilite"
              value={formData.civilite}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA9B6]"
            >
              <option value="">Choisir</option>
              <option value="Mr">Mr</option>
              <option value="Mme">Mme</option>
            </select>
            <div className="absolute top-2 right-2 text-red-500">*</div>
          </div>

          {/* Prénom */}
          <div className="relative">
            <label className="block text-[#00378A] text-sm font-semibold mb-2">Prénom</label>
            <input
              type="text"
              name="username"
              placeholder="Prénom"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA9B6]"
            />
            <div className="absolute top-2 right-2 text-red-500">*</div>
          </div>

          {/* Nom */}
          <div className="relative">
            <label className="block text-[#00378A] text-sm font-semibold mb-2">Nom</label>
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA9B6]"
            />
            <div className="absolute top-2 right-2 text-red-500">*</div>
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-[#00378A] text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA9B6]"
            />
            <div className="absolute top-2 right-2 text-red-500">*</div>
          </div>

          {/* Téléphone */}
          <div className="relative">
            <label className="block text-[#00378A] text-sm font-semibold mb-2">Téléphone</label>
            <input
              type="text"
              name="telephone"
              placeholder="Téléphone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA9B6]"
            />
            <div className="absolute top-2 right-2 text-red-500">*</div>
          </div>

          {/* Adresse */}
          <div className="relative md:col-span-2">
            <label className="block text-[#00378A] text-sm font-semibold mb-2">Adresse</label>
            <input
              type="text"
              name="adresse"
              placeholder="Adresse"
              value={formData.adresse}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FA9B6]"
            />
            <div className="absolute top-2 right-2 text-red-500">*</div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-[#00378A] text-white py-3 px-6 rounded-full shadow-md hover:bg-[#002c6d] focus:outline-none focus:ring-2 focus:ring-[#00378A]"
        >
          Enregistrer
        </button>
      </form>

      {/* Affichage du message de succès ou d'erreur */}
      {message && (
        <div
          className={`mt-6 p-4 text-center font-semibold ${
            messageType === 'success' ? 'text-green-700 bg-green-200' : 'text-red-700 bg-red-200'
          } rounded-lg`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default MonCompte;
