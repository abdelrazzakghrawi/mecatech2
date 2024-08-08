import { useState } from 'react';
import "./Compte.css";
import { TextField, Box, InputAdornment } from '@mui/material';
import { CircleAlert, CircleCheck } from 'lucide-react';
import axios from 'axios';
import mecano from "../assets/mecano.png";
import Swal from 'sweetalert2';

const Compte = ({ setGarageId, setImageURL }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [ipadresse, setIpadresse] = useState("");
  const [geoInfo, setGeoInfo] = useState({});
  const [image_path, setImage] = useState(null);
  const [imag, setimg] = useState(mecano); // Initialiser avec l'image par défaut
  const [formData, setFormData] = useState({
    Ville: '',
    nomGarage: '',
    Telephone: '',
    Adresse: '',
  });

  const [errors, setErrors] = useState({
    nomGarage: true,
    Adresse: true,
    Ville: true,
    Telephone: true,
  });

  const handleIpChange = (event) => {
    setIpadresse(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setImage(file);
    reader.onload = () => {
      setimg(reader.result);
      setImageURL(reader.result); // Passer l'URL de l'image à Linkk
    };

    if (file) {
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
    form.append('image_path', image_path);

    try {
      const response = await axios.post('http://localhost:5001/api/initial-info', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setGarageId(response.data.id);
      Swal.fire({
        icon: "success",
        title: "Information de Ton Compte enregistrées avec succès",
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données', error);
    }
  };

  const handleGetGeoInfo = async () => {
    try {
      const response = await axios.get(`http://ip-api.com/json/${ipadresse}`);
      setGeoInfo({
        Ville: response.data.Ville,
        lat: response.data.lat,
        lon: response.data.lon
      });
      setLatitude(response.data.lat);
      setLongitude(response.data.lon);
    } catch (error) {
      console.error(error);
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
                    {errors.nomGarage ? <CircleAlert color="red" /> : <CircleCheck color="green" />}
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
                    {errors.Adresse ? <CircleAlert color="red" /> : <CircleCheck color="green" />}
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
                    {errors.Ville ? <CircleAlert color="red" /> : <CircleCheck color="green" />}
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
                    {errors.Telephone ? <CircleAlert color="red" /> : <CircleCheck color="green" />}
                  </InputAdornment>
                ),
              }}
            />
          </Box>
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
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
              }}
            />
            <TextField
              label="Longitude"
              name="longitude"
              value={longitude}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              InputProps={{
                sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
              }}
            />
          </div>
          <button className="buttadress" type="button" onClick={handleGetGeoInfo}>Obtenir les informations de Votre localisation</button>
        </div>
      </form>
    </div>
  );
};

export default Compte;
