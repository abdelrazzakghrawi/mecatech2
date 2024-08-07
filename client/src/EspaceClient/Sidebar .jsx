import PropTypes from 'prop-types';

const Sidebar = ({ selectedSection, setSelectedSection, profileImage, setProfileImage }) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
      <div className="relative mb-6">
        <img
          src={profileImage || "/path-to-default-image.png"}
          alt="Profile"
          className="rounded-full w-24 h-24 bg-gray-200"
        />
        {selectedSection === 'monCompte' && (
          <div className="absolute bottom-0 right-0 bg-teal-500 p-1 rounded-full cursor-pointer">
            <svg
              className="text-white w-6 h-6"
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
      <h2 className="text-xl font-semibold mb-4">Particulier</h2>
      <nav className="flex flex-col text-sm space-y-3 w-full">
        <a
          href="#"
          onClick={() => setSelectedSection('monCompte')}
          className={`py-2 px-4 rounded-lg ${
            selectedSection === 'monCompte' ? 'bg-teal-500 text-white' : 'text-gray-600 hover:text-teal-500'
          }`}
        >
          MON COMPTE
        </a>
        <a
          href="#"
          onClick={() => setSelectedSection('rendezVous')}
          className={`py-2 px-4 rounded-lg ${
            selectedSection === 'rendezVous' ? 'bg-teal-500 text-white' : 'text-gray-600 hover:text-teal-500'
          }`}
        >
          MES RENDEZ-VOUS
        </a>
        <a
          href="#"
          onClick={() => setSelectedSection('vehicules')}
          className={`py-2 px-4 rounded-lg ${
            selectedSection === 'vehicules' ? 'bg-teal-500 text-white' : 'text-gray-600 hover:text-teal-500'
          }`}
        >
          MES VÉHICULES
        </a>
        <a
          href="#"
          onClick={() => setSelectedSection('prestation')}
          className={`py-2 px-4 rounded-lg ${
            selectedSection === 'prestation' ? 'bg-teal-500 text-white' : 'text-gray-600 hover:text-teal-500'
          }`}
        >
          CHOISIR UNE PRESTATION
        </a>
        <a
          href="#"
          onClick={() => setSelectedSection('contact')}
          className={`py-2 px-4 rounded-lg ${
            selectedSection === 'contact' ? 'bg-teal-500 text-white' : 'text-gray-600 hover:text-teal-500'
          }`}
        >
          CONTACTEZ-NOUS
        </a>
      
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  selectedSection: PropTypes.string.isRequired,
  setSelectedSection: PropTypes.func.isRequired,
  profileImage: PropTypes.string,
  setProfileImage: PropTypes.func.isRequired,
};

export default Sidebar;
