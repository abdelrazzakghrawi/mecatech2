import { useState } from 'react';

const MesRendezVous = () => {
  const [filter, setFilter] = useState('tous');
  const rendezVous = [
    { id: 1, date: '2024-04-15', statut: 'confirmé' },
    { id: 2, date: '2024-04-20', statut: 'en attente' },
    // Ajoutez plus de rendez-vous ici
  ];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-teal-600 mb-6">Mes rendez-vous</h2>

      <div className="mb-6">
        <span className="block text-lg font-semibold mb-2">FILTRER PAR</span>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'tous' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => handleFilterChange('tous')}
          >
            TOUS LES RENDEZ-VOUS
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'en attente' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => handleFilterChange('en attente')}
          >
            RENDEZ-VOUS EN ATTENTE
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'confirmés' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => handleFilterChange('confirmés')}
          >
            RENDEZ-VOUS CONFIRMÉS
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'annulés' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => handleFilterChange('annulés')}
          >
            RENDEZ-VOUS ANNULÉS
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'passés' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => handleFilterChange('passés')}
          >
            RENDEZ-VOUS PASSÉS
          </button>
        </div>
      </div>

      <ul className="space-y-4">
        {rendezVous.length === 0 ? (
          <li className="text-gray-600">Aucune intervention disponible dans votre historique</li>
        ) : (
          rendezVous
            .filter((rdv) => filter === 'tous' || rdv.statut === filter)
            .map((rdv) => (
              <li key={rdv.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm">
                <span className="text-gray-700">{rdv.date}</span>
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${rdv.statut === 'confirmé' ? 'bg-green-100 text-green-800' : rdv.statut === 'en attente' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
                >
                  {rdv.statut === 'confirmé' ? 'Rendez-vous confirmé' : rdv.statut === 'en attente' ? 'Rendez-vous en attente de confirmation' : 'Rendez-vous annulé'}
                </span>
                <div className="flex space-x-2">
                  <button
                    className="px-3 py-1 border border-red-500 text-red-500 rounded-lg hover:bg-red-100 transition"
                    onClick={() => alert('Annuler un rendez-vous')}
                  >
                    Annuler
                  </button>
                  <button
                    className="px-3 py-1 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100 transition"
                    onClick={() => alert('Modifier un rendez-vous')}
                  >
                    Modifier
                  </button>
                </div>
              </li>
            ))
        )}
      </ul>
    </div>
  );
};

export default MesRendezVous;
