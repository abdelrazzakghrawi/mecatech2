// MonCompte.jsx
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
    adresse: '', // Ajout du champ adresse
  });

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
          const response = await axios.get('http://localhost:5000/api/auth/me', config); // Assurez-vous que l'URL correspond à celle du backend
          const userData = response.data;
          setFormData({
            civilite: userData.civilite || '',
            name: userData.name || '',
            username: userData.username || '',
            email: userData.email || '',
            telephone: userData.telephone || '',
            adresse: userData.adresse || '', // Charger l'adresse de l'utilisateur
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
      await axios.put('http://localhost:5000/api/auth/me', formData, config); // Assurez-vous que l'URL correspond à celle du backend
      console.log('Informations mises à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations:', error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-teal-600 mb-6">Mes informations personnelles</h2>
      <form onSubmit={handleSubmit}>
        {/* Ligne pour le champ civilité */}
        <div className="mb-6">
          <select
            name="civilite"
            value={formData.civilite}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Civilité</option>
            <option value="Mr">Mr</option>
            <option value="Mme">Mme</option>
          </select>
        </div>
        {/* Autres champs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Prénom"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="telephone"
              placeholder="Téléphone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="md:col-span-2">
            <input
              type="text"
              name="adresse" // Champ adresse
              placeholder="Adresse"
              value={formData.adresse}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 bg-[#1fa9b6] text-white py-3 px-6 rounded-lg shadow hover:bg-[#1a8d9a] focus:outline-none focus:ring-2 focus:ring-[#1fa9b6]"
        >
          VALIDER MES INFORMATIONS
        </button>
      </form>
    </div>
  );
};

export default MonCompte;
