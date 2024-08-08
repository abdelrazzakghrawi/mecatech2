import "./contact.css"
import carte from "./carte.png"
import { Box,  TextField } from "@mui/material"
const Contactez_Nous = () => {
  return (
    <div>
      <div className="contact">
      <div className="contact__title">Contactez <span className="nous">- Nous</span></div>
 
        <div className="contact2">
        </div>          <img className="cart" src={carte} alt="" />
        <Box className="Nomcomplet">
      <TextField
                  label="Nom Complet"
                  name="Nomcomplet"
                  type="text"
                  
                  fullWidth
                  margin="normal"
                  InputProps={{
                    sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' ,height:"40px" },
                   
                  }}
                />
              </Box>
              <Box className="ADRESSE">
      <TextField
                  label="Adresse"
                  name="ADRESSE"
                  type="text"
                  
                  fullWidth
                  margin="normal"
                  InputProps={{
                    sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' ,height:"40px" },
                   
                  }}
                />
              </Box>
              <Box className="Ville">
      <TextField
                  label="Ville"
                  name="VILLE"
                  type="text"
                  
                  fullWidth
                  margin="normal"
                  InputProps={{
                    sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ',height:"40px" },
                   
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
                  InputProps={{
                    sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ',height:"40px"  },
                   
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
                  InputProps={{
                    sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ',  },
                   
                  }}
                />
              </Box>
              <button className="buttcontact">Envoyer</button>
      </div>
    </div>
  )
}

export default Contactez_Nous