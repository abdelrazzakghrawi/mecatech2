import { useAuth } from './AuthContext';

const DashboardMecano = () => {
  const { user } = useAuth();

  // Exemple : affichage des informations du mécano connecté
  return (
    <div>
      <h2>Bienvenue, {user.username}!</h2>
      <p>Contenu spécifique au mécano...</p>
    </div>
  );
};

export default DashboardMecano;
