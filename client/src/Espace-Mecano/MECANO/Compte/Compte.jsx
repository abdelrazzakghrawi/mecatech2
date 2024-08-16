import { useState, useEffect } from 'react';
import "./Compte.css";
import { TextField, Box, InputAdornment } from '@mui/material';
import { CircleAlert, CircleCheck } from 'lucide-react';
import axios from 'axios';
import mecano from "../assets/mecano.png";
import Swal from 'sweetalert2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Importez les images directement
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Correction pour l'icône du marqueur Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Compte = ({ setGarageId, setImageURL }) => {
  const userId = localStorage.getItem('_id');

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [ipadresse, setIpadresse] = useState("");
  const [geoInfo, setGeoInfo] = useState({});
  const [image_path, setImage] = useState(null);
  const [imag, setimg] = useState(mecano);
  const [showMap, setShowMap] = useState(false);
  const [formData, setFormData] = useState({
    Ville: '',
    nomGarage: '',
    Telephone: '',
    Adresse: '',
  });

  const [errors, setErrors] = useState({
    nomGarage: false,
    Adresse: false,
    Ville: false,
    Telephone: false,
  });

  useEffect(() => {
    const fetchGarageInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/initial-info/${userId}`);
        const data = response.data;
        setFormData({
          Ville: data.Ville || '',
          nomGarage: data.nomGarage || '',
          Telephone: data.Telephone || '',
          Adresse: data.Adresse || '',
        });
        setLatitude(data.latitude || '');
        setLongitude(data.longitude || '');
        if (data.image_path) {
          setImage(data.image_path || '');
          setimg(data.image_path || '');
          setImageURL(data.image_path || '');
        }
        if (data.id) {
          setGarageId(data.id);
        }
        setErrors({
          nomGarage: !!data.nomGarage,
          Adresse: !!data.Adresse,
          Ville: !!data.Ville,
          Telephone: !!data.Telephone,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des informations du garage', error);
      }
    };

    if (userId) {
      fetchGarageInfo();
    }
  }, [userId, setImageURL, setGarageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !!value.trim(),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImageURL = event.target.result;
        setImage(file);
        setimg(newImageURL);
        setImageURL(newImageURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById('imageInput').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('Ville', formData.Ville);
    form.append('nomGarage', formData.nomGarage);
    form.append('Telephone', formData.Telephone);
    form.append('Adresse', formData.Adresse);
    form.append('latitude', latitude);
    form.append('longitude', longitude);
    if (image_path instanceof File) {
      form.append('image_path', image_path);
    }
    form.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:5001/api/initial-info', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setGarageId(response.data.id);
      if (response.data.image_path) {
        setImageURL(response.data.image_path);
      }
      Swal.fire({
        icon: "success",
        title: "Information de Ton Compte enregistrées avec succès👌",
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données', error);
    }
  };

  const handleGetGeoInfo = async () => {
    try {
      const response = await fetch(`http://ip-api.com/json/${ipadresse}`);
      const data = await response.json();
      setGeoInfo(data);
      setLatitude(data.lat);
      setLongitude(data.lon);
      setShowMap(true);
    } catch (error) {
      console.error('Erreur lors de la récupération des informations géographiques', error);
    }
  };

  return (
    <div>
      <div className="MyCompte__title">Mon compte</div>
      <form onSubmit={handleSubmit}>
        <div className="MyCompte">
          <Box component="form" className="form">
            <TextField
              label="Nom de Garage"
              name="nomGarage"
              required
              fullWidth
              margin="normal"
              value={formData.nomGarage}
              onChange={handleChange}
              InputProps={{
                sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
                endAdornment: (
                  <InputAdornment position="end">
                    {errors.nomGarage ? <CircleCheck color="green" /> : <CircleAlert color="red" />}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Adresse"
              name="Adresse"
              required
              fullWidth
              margin="normal"
              value={formData.Adresse}
              onChange={handleChange}
              InputProps={{
                sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
                endAdornment: (
                  <InputAdornment position="end">
                    {errors.Adresse ? <CircleCheck color="green" /> : <CircleAlert color="red" />}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Ville"
              name="Ville"
              required
              fullWidth
              margin="normal"
              value={formData.Ville}
              onChange={handleChange}
              InputProps={{
                sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
                endAdornment: (
                  <InputAdornment position="end">
                    {errors.Ville ? <CircleCheck color="green" /> : <CircleAlert color="red" />}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Téléphone"
              name="Telephone"
              type="tel"
              required
              fullWidth
              margin="normal"
              value={formData.Telephone}
              onChange={handleChange}
              InputProps={{
                sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
                endAdornment: (
                  <InputAdornment position="end">
                    {errors.Telephone ? <CircleCheck color="green" /> : <CircleAlert color="red" />}
                  </InputAdornment>
                ),
              }}
            />
          </Box>
     

          {showMap && latitude && longitude && (
            <div className="map-container">
              <MapContainer key={`${latitude}-${longitude}`} center={[latitude, longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitude, longitude]}>
                  <Popup>
                    Votre localisation
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
            
          <label className="mecanlabel" htmlFor="">Votre Image de profile</label>
          <img className="mecan" src={imag} alt="" onClick={handleImageClick} />
          <input
            id="imageInput"
            type="file"
            accept="image_path/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <button className="buttE" type="submit">Enregistrer</button>
          
          <div className="ipadress">
            <br />
            <TextField
              label="Latitude"
              name="latitude"
              value={latitude}
              required
              onChange={(e) => {
                setLatitude(e.target.value);
                validateField('latitude', e.target.value);
              }}
              fullWidth
              margin="normal"
              InputProps={{
                sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
                endAdornment: (
                  <InputAdornment position="end">
                    {latitude ? <CircleCheck color="green" /> : <CircleAlert color="red" />}
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              label="Longitude"
              name="longitude"
              value={longitude}
              required
              onChange={(e) => {
                setLongitude(e.target.value);
                validateField('longitude', e.target.value);
              }}
              fullWidth
              margin="normal"
              InputProps={{
                sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
                endAdornment: (
                  <InputAdornment position="end">
                    {longitude ? <CircleCheck color="green" /> : <CircleAlert color="red" />}
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <button className="buttadress" type="button" onClick={handleGetGeoInfo}>
            Obtenir les informations de Votre localisation
          </button>
          <button className="buttShowMap" type="button" onClick={() => setShowMap(!showMap)}>
            {showMap ? 'Masquer la carte' : 'Afficher la carte'}
          </button>
          
          
        </div>
      </form>
    </div>
  );
};

export default Compte;