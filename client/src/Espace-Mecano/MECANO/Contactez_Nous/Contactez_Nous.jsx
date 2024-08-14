import  { useState } from 'react';
import "./contact.css";
import carte from "./carte.png";
import { Box, TextField } from "@mui/material";
import axios from 'axios';
import Swal from 'sweetalert2'; // N'oubliez pas d'installer sweetalert2: npm install sweetalert2

const Contactez_Nous = () => {
  const [formData, setFormData] = useState({
    nomComplet: '',
    adresse: '',
    ville: '',
    tel: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const _id = localStorage.getItem('_id');

    try {
      const response = await axios.post('http://localhost:5001/api/contact', {
        _id,
        ...formData
      });
      console.log(response.data);
      
      // Afficher l'alerte de succès
      Swal.fire({
        icon: "success",
        title: "Le message a été envoyé avec succès👌",
      });
      
      // Vider le formulaire
      setFormData({
        nomComplet: '',
        adresse: '',
        ville: '',
        tel: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Afficher une alerte d'erreur
      Swal.fire({
        icon: "error",
        title: "Nous avons bien reçu votre précédent message et nous ferons de notre mieux pour vous répondre rapidement. 👌"
      });
    }
  };

  return (
    <div>
      <div className="contact">
        <div className="contact__title">Contactez <span className="nous">- Nous</span></div>
        <div className="contact2"></div>
        <img className="cart" src={carte} alt="" />
        <form onSubmit={handleSubmit}>
          <Box className="Nomcomplet">
            <TextField
              label="Nom Complet"
              name="nomComplet"
              type="text"
              fullWidth
              margin="normal"
              value={formData.nomComplet}
              onChange={handleChange}
              InputProps={{
                sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px', height: "40px" },
              }}
            />
          </Box>
          <Box className="ADRESSE">
            <TextField
              label="Adresse"
              name="adresse"
              type="text"
              fullWidth
              margin="normal"
              value={formData.adresse}
              onChange={handleChange}
              InputProps={{
                sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px', height: "40px" },
              }}
            />
          </Box>
          <Box className="Ville">
            <TextField
              label="Ville"
              name="ville"
              type="text"
              fullWidth
              margin="normal"
              value={formData.ville}
              onChange={handleChange}
              InputProps={{
                sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px', height: "40px" },
              }}
            />
          </Box>
          <Box className="tel">
            <TextField
              label="Numero Telephone"
              name="tel"
              type="tel"
              fullWidth
              margin="normal"
              value={formData.tel}
              onChange={handleChange}
              InputProps={{
                sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px', height: "40px" },
              }}
            />
          </Box>
          <Box className="message">
            <TextField
              label="Message"
              name="message"
              rows={4}
              fullWidth
              margin="normal"
              value={formData.message}
              onChange={handleChange}
              InputProps={{
                sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px' },
              }}
            />
          </Box>
          <button type="submit" className="buttcontact">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default Contactez_Nous;