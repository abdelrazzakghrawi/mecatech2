import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Sidebar = ({ selectedSection, setSelectedSection, profileImage, onUpdateProfileImage }) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProfileImage(reader.result);  // Mise à jour de l'image de profil
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="bg-[#E9EAEB] shadow-lg rounded-2xl p-6 flex flex-col items-center w-[280px] h-[500px] mt-[18%] ml-[90px] text-[#00959d] font-sans">
      <div className="relative mb-4">
        <img
          src={profileImage || "/path-to-default-image.png"}
          alt="Profile"
          className="rounded-full w-16 h-16 bg-gray-200"
        />
        {selectedSection === 'monCompte' && (
          <div className="absolute bottom-0 right-0 bg-[#1FA9B6] p-1 rounded-full cursor-pointer">
            <svg
              className="text-white w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              onClick={() => document.getElementById('fileInput').click()}
            >
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </div>
        )}
      </div>
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleImageChange}
      />
      <h2 className="text-lg font-semibold mb-4 text-[#00959d]">Particulier</h2>
      <nav className="flex flex-col text-sm space-y-2 w-full">
        <a
          href="#"
          onClick={() => setSelectedSection('monCompte')}
          className={`py-2 px-4 flex items-center rounded-lg ${
            selectedSection === 'monCompte' ? 'bg-[#00378A] text-white' : 'text-[#00959d] hover:text-[#00378A]'
          }`}
        >
          <span className="mr-2">🏠</span> MON COMPTE
        </a>
        <a
          href="#"
          onClick={() => setSelectedSection('rendezVous')}
          className={`py-2 px-4 flex items-center rounded-lg ${
            selectedSection === 'rendezVous' ? 'bg-[#00378A] text-white' : 'text-[#00959d] hover:text-[#00378A]'
          }`}
        >
          <span className="mr-2">📅</span> MES RENDEZ-VOUS
        </a>
        <a
          href="#"
          onClick={() => setSelectedSection('vehicules')}
          className={`py-2 px-4 flex items-center rounded-lg ${
            selectedSection === 'vehicules' ? 'bg-[#00378A] text-white' : 'text-[#00959d] hover:text-[#00378A]'
          }`}
        >
          <span className="mr-2">🚗</span> MES VÉHICULES
        </a>
        <Link
          to="/"
          className={`py-2 px-4 flex items-center rounded-lg ${
            selectedSection === 'prestation' ? 'bg-[#00378A] text-white' : 'text-[#00959d] hover:text-[#00378A]'
          }`}
        >
          <span className="mr-2">➕</span> CHOISIR UNE PRESTATION
        </Link>
        <a
          href="#"
          onClick={() => setSelectedSection('contact')}
          className={`py-2 px-4 flex items-center rounded-lg ${
            selectedSection === 'contact' ? 'bg-[#00378A] text-white' : 'text-[#00959d] hover:text-[#00378A]'
          }`}
        >
          <span className="mr-2">📞</span> CONTACTEZ-NOUS
        </a>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  selectedSection: PropTypes.string.isRequired,
  setSelectedSection: PropTypes.func.isRequired,
  profileImage: PropTypes.string,
  onUpdateProfileImage: PropTypes.func.isRequired,  // Nouvelle prop pour la mise à jour de l'image
};

export default Sidebar;
