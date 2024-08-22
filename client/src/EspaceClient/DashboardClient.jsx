import { useState } from 'react';
import Sidebar from '../EspaceClient/Sidebar ';
import MonCompte from './MonCompte';
import MesRendezVous from './MesRendezVous';
import MesVehicules from './MesVehicules';
import ChoisirPrestation from './ChoisirPrestation';
import ContactezNous from './ContactezNous';
import Navbar from '../Espace-Mecano/Navbar/Navbar';
import Footer from "../Espace-Mecano/Footer/Footer";

const DashboardClient = () => {
  const [selectedSection, setSelectedSection] = useState('monCompte');
  const [profileImage, setProfileImage] = useState(null);  // State pour l'image de profil

  const handleUpdateProfileImage = (newImage) => {
    setProfileImage(newImage);  // Mise à jour de l'image de profil
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'monCompte':
        return <MonCompte onUpdateProfileImage={handleUpdateProfileImage} />;
      case 'rendezVous':
        return <MesRendezVous />;
      case 'vehicules':
        return <MesVehicules />;
      case 'prestation':
        return <ChoisirPrestation />;
      case 'contact':
        return <ContactezNous />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFF]">
      <Navbar/>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 ml-4 mt-4">
          <Sidebar
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            profileImage={profileImage}  // Passer l'image de profil à la Sidebar
            onUpdateProfileImage={handleUpdateProfileImage}  // Passer la fonction de mise à jour de l'image
          />
        </div>
        <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
      </div>
      <Footer/>
    </div>
  );
};

export default DashboardClient;