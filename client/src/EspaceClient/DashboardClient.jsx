import { useState,useEffect  } from 'react';
import Sidebar from '../EspaceClient/Sidebar ';
import MonCompte from './MonCompte';
import MesRendezVous from './MesRendezVous';
import MesVehicules from './MesVehicules';
import ChoisirPrestation from './ChoisirPrestation';
import ContactezNous from './ContactezNous';
import axios from 'axios';
import Navbar from '../Espace-Mecano/Navbar/Navbar';
import Footer from "../Espace-Mecano/Footer/Footer"

const DashboardClient = () => {
  const [selectedSection, setSelectedSection] = useState('monCompte');
  const [profileImage, setProfileImage] = useState('/path-to-default-image.png');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Profile image fetched:', response.data.profileImage); // Debug log
        setProfileImage(response.data.profileImage || '/path-to-default-image.png');
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const renderContent = () => {
    switch (selectedSection) {
      case 'monCompte':
        return <MonCompte />;
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
    <div className="flex flex-col min-h-screen bg-[#F1F1F1]">
      <Navbar/>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 ml-4 mt-4">
          <Sidebar
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
        </div>
        <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
      </div>
      <Footer/>
    </div>
  );
};

export default DashboardClient;