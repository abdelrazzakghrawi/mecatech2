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
    <div className="bg-[#E9EAEB] shadow-lg rounded-xl w-[800px] h-[520px] p-6 mx-auto my-10 animate-fadeIn">
      <h2 className="text-3xl font-bold text-[#00378A] mb-6 border-b-4 border-[#00378A] inline-block">
        Mes rendez-vous
      </h2>

      <div className="mb-6">
        <span className="block text-lg font-semibold mb-2 text-[#00378A]">Filtrer par</span>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'tous'
                ? 'bg-[#00378A] text-white'
                : 'bg-[#E0E3E8] text-[#00378A] hover:bg-[#00378A] hover:text-white'
            }`}
            onClick={() => handleFilterChange('tous')}
          >
            Tous les rendez-vous
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'en attente'
                ? 'bg-[#00378A] text-white'
                : 'bg-[#E0E3E8] text-[#00378A] hover:bg-[#00378A] hover:text-white'
            }`}
            onClick={() => handleFilterChange('en attente')}
          >
            Rendez-vous en attente
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'confirmés'
                ? 'bg-[#00378A] text-white'
                : 'bg-[#E0E3E8] text-[#00378A] hover:bg-[#00378A] hover:text-white'
            }`}
            onClick={() => handleFilterChange('confirmés')}
          >
            Rendez-vous confirmés
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'annulés'
                ? 'bg-[#00378A] text-white'
                : 'bg-[#E0E3E8] text-[#00378A] hover:bg-[#00378A] hover:text-white'
            }`}
            onClick={() => handleFilterChange('annulés')}
          >
            Rendez-vous annulés
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'passés'
                ? 'bg-[#00378A] text-white'
                : 'bg-[#E0E3E8] text-[#00378A] hover:bg-[#00378A] hover:text-white'
            }`}
            onClick={() => handleFilterChange('passés')}
          >
            Rendez-vous passés
          </button>
        </div>
      </div>

      <ul className="space-y-4">
        {rendezVous.length === 0 ? (
          <li className="text-gray-600">Aucun rendez-vous disponible dans votre historique</li>
        ) : (
          rendezVous
            .filter((rdv) => filter === 'tous' || rdv.statut === filter)
            .map((rdv) => (
              <li
                key={rdv.id}
                className="flex justify-between items-center p-4 border border-[#00378A] rounded-lg bg-white shadow-sm"
              >
                <span className="text-[#00378A] font-medium">{rdv.date}</span>
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    rdv.statut === 'confirmé'
                      ? 'bg-green-100 text-green-800'
                      : rdv.statut === 'en attente'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {rdv.statut === 'confirmé'
                    ? 'Rendez-vous confirmé'
                    : rdv.statut === 'en attente'
                    ? 'Rendez-vous en attente de confirmation'
                    : 'Rendez-vous annulé'}
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
