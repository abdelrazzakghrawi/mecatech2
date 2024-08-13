import React, { useState, useEffect } from 'react';
import "./Planning.css";
import { TextField, Box, MenuItem } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const Planning = () => {
    const [planning, setPlanning] = useState(null);
    const [maxClients, setMaxClients] = useState("Illimité");
    const [debutMatin, setDebutMatin] = useState('');
    const [finMatin, setFinMatin] = useState('');
    const [debutAprem, setDebutAprem] = useState('');
    const [finAprem, setFinAprem] = useState('');
    const [joursTravail, setJoursTravail] = useState({
        Lun: false, Mar: false, Mer: false, Jeu: false, Ven: false, Sam: false, Dim: false
    });
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');

    // Supposons que l'ID du mécanique est stocké quelque part (par exemple, dans le localStorage)
    const mecaniqueId = localStorage.getItem('_id');

    useEffect(() => {
        fetchPlanning();
    }, []);

    const fetchPlanning = async () => {
        try {
            const response = await axios.get(`http://localhost:3007/api/planning/${mecaniqueId}`);
            setPlanning(response.data);
            // Mettre à jour l'état avec les données reçues
            setMaxClients(response.data.max_clients_par_jour === -1 ? "Illimité" : response.data.max_clients_par_jour.toString());
            setDebutMatin(response.data.horaires.matin.debut);
            setFinMatin(response.data.horaires.matin.fin);
            setDebutAprem(response.data.horaires.apres_midi.debut);
            setFinAprem(response.data.horaires.apres_midi.fin);
            const joursActifs = response.data.jours_travail.reduce((acc, jour) => ({...acc, [jour]: true}), {
                Lun: false, Mar: false, Mer: false, Jeu: false, Ven: false, Sam: false, Dim: false
            });
            setJoursTravail(joursActifs);
            if (response.data.indisponibilites && response.data.indisponibilites.length > 0) {
                setDateDebut(response.data.indisponibilites[0].debut.split('T')[0]);
                setDateFin(response.data.indisponibilites[0].fin.split('T')[0]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération du planning:", error);
        }
    }; 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const planningData = {
            mecanique_id: mecaniqueId,
            jours_travail: Object.entries(joursTravail).filter(([_, value]) => value).map(([key, _]) => key),
            horaires: {
                matin: { debut: debutMatin, fin: finMatin },
                apres_midi: { debut: debutAprem, fin: finAprem }
            },
            max_clients_par_jour: maxClients === "Illimité" ? -1 : parseInt(maxClients),
            indisponibilites: [{ debut: dateDebut, fin: dateFin }]
        };
        console.log(planningData)
        try {
          if (planning) {
              await axios.put(`http://localhost:3007/api/planning/${mecaniqueId}`, planningData);
          } else {
              await axios.post('http://localhost:3007/api/planning', planningData);  // Assurez-vous que l'URL soit correcte
          }
          Swal.fire({
            icon: "success",
            title: "Planning sauvegardé avec succès👌",
          });
          fetchPlanning(); // Recharger le planning après la sauvegarde
      } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Une erreur est survenue lors de l'enregistrement des Plannings ✖✖✖.",
          });
      }
      
    };

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
        times.push('00:00');
        return times;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="Planning__title">Mon planning</div>
            <div className="Planning">
                <span className="paramt">Paramétrage semaine standard</span>
                <Box className="forme1">
                    <TextField
                        select
                        label="Début Matin"
                        fullWidth
                        value={debutMatin}
                        onChange={(e) => setDebutMatin(e.target.value)}
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
                        value={finMatin}
                        onChange={(e) => setFinMatin(e.target.value)}
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
                        value={debutAprem}
                        onChange={(e) => setDebutAprem(e.target.value)}
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
                        value={finAprem}
                        onChange={(e) => setFinAprem(e.target.value)}
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
                <span className="clientde">Indiquez le nombre de clients web que vous êtes prêts à recevoir par jour. Illimité</span>
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
                        {['Illimité', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <span className="clientconfi">Appliquez cette configuration aux jours suivants :</span>
                {Object.entries(joursTravail).map(([jour, checked]) => (
                    <Box key={jour} className="">
                        <span className={jour}>{jour} . </span>
                        <input
                            className={`form${['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].indexOf(jour) + 7}`}
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setJoursTravail({...joursTravail, [jour]: e.target.checked})}
                        />
                    </Box>
                ))}
            </div>
            <div className="Indisponibilités">
                <span className="Indisponibilités_title">Indisponibilités </span>
                <span className="Indisponibilités_dec">Indiquez vos indisponibilités, votre compte sera en pause (vacances, repos, ...)*. Il sera automatiquement réactivé à votre date de retour. </span>
                <span className="Indisponibilités_ajouter">Ajouter une période d'indisponibilités : du</span>
                <Box className="form14">
                    <TextField
                        type="date"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
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
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ' },
                        }}
                    />
                </Box>
            </div>
            <button className="buttEnEn" type="submit">Enregistrer</button>
        </form>
    );
}

export default Planning;