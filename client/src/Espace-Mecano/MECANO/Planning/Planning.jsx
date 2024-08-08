import  { useState } from 'react'
import "./Planning.css";
import { TextField, Box,  MenuItem } from '@mui/material';

const Planning = () => {
    const [maxClients, setMaxClients] = useState("Illimité");

      // Générer les options de temps pour les matinées et les après-midis
  const generateMorningOptions = () => {
    const times = [];
    for (let h = 8; h <= 11; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hours = h.toString().padStart(2, '0');
        const minutes = m.toString().padStart(2, '0');
        times.push(`${hours}:${minutes}`);
      }
    }
    return times;
  };

  const generateAfternoonOptions = () => {
    const times = [];
    for (let h = 12; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hours = h.toString().padStart(2, '0');
        const minutes = m.toString().padStart(2, '0');
        times.push(`${hours}:${minutes}`);
      }
    }
    times.push('00:00'); // Ajouter 00:00 pour le cas de la fin de la journée
    return times;
  };

  return (
    <div>
 <div className="Planning__title">Mon planning</div>
            <div className="Planning">
              <span className="paramt">Paramétrage semaine standard</span>
              <Box  className="forme1">
                <TextField
                  select
                  label="Début Matin"
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
                  }}
                >
                  {generateMorningOptions().map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box className="forme2">
                <TextField
                  select
                  label="Fin Matin"
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
                  }}
                >
                  {generateMorningOptions().map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <span className="slach">/</span>
              <Box className="forme3">
                <TextField
                  select
                  label="Début Après-midi"
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
                  }}
                >
                  {generateAfternoonOptions().map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box className="forme4">
                <TextField
                  select
                  label="Fin Après-midi"
                  fullWidth
                  InputProps={{
                    sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
                  }}
                >
                  {generateAfternoonOptions().map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <span className="clientnum">Nombre de clients max</span>
              <span className="clientde">Indiquez le nombre de clients web que vous êtes prêts à recevoir par jour.Illimité</span>
              <Box className="forme5">
        <TextField
          select
          fullWidth
          value={maxClients}
          onChange={(e) => setMaxClients(e.target.value)}
          InputProps={{
            sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
          }}
        >
          {['Illimité',1, 2, 3, 4, 5,6,7,8,9,10].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <span className="clientconfi">Appliquez cette configuration aux jours suivants :</span>
        <Box className="">
          <span className="Lun">Lun . </span>
        <input
        className="form7"
                  type="checkbox"
                />
        </Box>
        <Box className="">
          <span className="Mar">Mar . </span>
        <input
        className="form8"
                  type="checkbox"
                />
        </Box>
        <Box className="">
          <span className="Mer">Mer . </span>
        <input
        className="form9"
                  type="checkbox"
                />
        </Box>
        <Box className="">
          <span className="Jeu">Jeu . </span>
        <input
        className="form10"
                  type="checkbox"
                />
        </Box>
        <Box className="">
          <span className="Ven">Ven . </span>
        <input
        className="form11"
                  type="checkbox"
                />
        </Box>
        <Box className="">
          <span className="Sam">Sam . </span>
        <input
        className="form12"
                  type="checkbox"
                />
        </Box>
        <Box className="">
          <span className="Dim">Dim . </span>
        <input
        className="form13"
                  type="checkbox"
                />
        </Box>
        
            </div>
            <div className="Indisponibilités">
            <span className="Indisponibilités_title">Indisponibilités </span>
            <span className="Indisponibilités_dec">Indiquez vos indisponibilités, votre compte sera en pause (vacances, repos, ...)*. Il sera  automatiquement réactivé à votre date de retour. </span>
            <span className="Indisponibilités_ajouter">Ajouter une période d'indisponibilités : du</span>
            <Box className="form14">
          <TextField
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            InputProps={{
              sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
            }}
          />  
          </Box>
          <span className="au">au</span>
        <Box className="form15">
          <TextField
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            InputProps={{
              sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
            }}
          />
      </Box>
      <button className="buttEn" type="submit">Enregistrer</button>

            </div>
          </div>
  )
}

export default Planning