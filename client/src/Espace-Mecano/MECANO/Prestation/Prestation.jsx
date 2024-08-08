import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import argent from "../assets/argent.png";
import carte from "../assets/carte.png";
import cheque from "../assets/cheque.png";
import Swal from "sweetalert2"
import "./Prestation.css";

const iconMapping = {
    'Vidange': '🛢️',
    'Révision Intermédiaire - Vidange': '🔧',
    'Distribution (Kit de distribution)': '🔩',
    'Embrayage': '🚗',
    'Climatisation': '❄️',
    'Filtre d’habitacle': '🌬️',
    'Freinage': '🛠️',
    'Amortisseurs': '🔧',
    'Pneumatique': '🛞',
    'Échappement': '🚥',
    'Liquide de refroidissement': '💧',
    'Vanne EGR': '🔧',
    'Ajustement de la vanne': '⚙️',
    'Filtre à particules': '🌫️',
    'Décalaminage': '🔥',
    'Carrosserie': '🛠️',
    'Phares': '🔦',
    'Rétroviseurs': '🔍',
    'Batteries': '🔋',
    'Injecteurs': '🛢️',
    'Diagnostic Électronique': '💻',
};

const Prestation = ({ garageId, onFinish }) => {
    const [expandedServiceId, setExpandedServiceId] = useState(null);
    const [prestations, setPrestations] = useState({});
    const [selectedcompétances, setSelectedcompétances] = useState([]);
    const [selectedMethodesPaiement, setSelectedMethodesPaiement] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // État pour gérer le message d'erreur

    useEffect(() => {
        const fetchPrestations = async () => {
            try {
                const response = await axios.get('http://localhost:5001/services');
                setPrestations(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des prestations', error);
            }
        };

        fetchPrestations();
    }, []);

    const toggleExpand = (category) => {
        setExpandedServiceId(prevCategory => (prevCategory === category ? null : category));
    };

    const handlecompétancesChange = (e) => {
        const { value, checked } = e.target;
        setSelectedcompétances(prev => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(item => item !== value);
            }
        });
    };

    const handleMethodesPaiementChange = (e) => {
        const { value, checked } = e.target;
        setSelectedMethodesPaiement(prev => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(item => item !== value);
            }
        });
    };

    const handleSubmit = async () => {
        if (!garageId) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Veuillez enregistrer les informations de ton compte avant de continuer.!",
            });
            return;
        }

        try {
            const selectedCategories = Object.keys(prestations).filter(category =>
                prestations[category].some(option => selectedcompétances.includes(option))
            );

            await axios.post('http://localhost:5001/api/prestations', {
                id: garageId,
                compétances: selectedCategories,
                methodesPaiement: selectedMethodesPaiement,
            });
            Swal.fire({
              icon: "success",
              title: "Prestations enregistrées avec succès",
            });
            if (onFinish) onFinish();
        } catch (error) {
            console.error('Erreur lors de l\'envoi des prestations', error);
        }
    };

    const transformedServicesData = Object.entries(prestations)
        .filter(([category, items]) => !items.every(item => !isNaN(item)))
        .map(([category, items]) => ({
            category,
            icon: iconMapping[category] || '🔧',
            options: items
        }));

    return (
        <div>
            <div className="Prestation__title">Mes prestations & tarifs</div>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Message d'erreur */}
            <button className="buttPRE" type="button" onClick={handleSubmit}>Enregistrer</button>

            <div className="Prestation">
                <span className="Prestation_methode">Méthodes de paiement acceptées</span>
                <Box className="">
                    <span className="Espèces">Espèces</span>
                    <img className="imageme1" src={argent} alt="" />
                    <input
                        className="methode1"
                        type="checkbox"
                        value="Espèces"
                        onChange={handleMethodesPaiementChange}
                    />
                </Box>
                <Box className="">
                    <span className="carte">Carte</span>
                    <img className="imageme2" src={carte} alt="" />
                    <input
                        className="methode2"
                        type="checkbox"
                        value="Carte"
                        onChange={handleMethodesPaiementChange}
                    />
                </Box>
                <Box className="">
                    <span className="cheque">Chéque</span>
                    <img className="imageme3" src={cheque} alt="" />
                    <input
                        className="methode3"
                        type="checkbox"
                        value="Chéque"
                        onChange={handleMethodesPaiementChange}
                    />
                </Box>

                <div className="service-table">
                    <div className="service-table-columns">
                        {transformedServicesData.map((service) => (
                            <div key={service.category} className={`service-category ${expandedServiceId === service.category ? 'expanded' : ''}`}>
                                <div className="service-header" onClick={() => toggleExpand(service.category)}>
                                    <span className="service-icon">{service.icon}</span>
                                    <span className="service-title">{service.category}</span>
                                    <span className="expand-icon">{expandedServiceId === service.category ? '-' : '+'}</span>
                                </div>
                                {expandedServiceId === service.category && service.options && (
                                    <div className="service-options">
                                        {service.options.map((option, idx) => (
                                            <div key={idx} className="service-option">
                                                <input
                                                    type="checkbox"
                                                    id={`option-${service.category}-${idx}`}
                                                    value={option}
                                                    onChange={handlecompétancesChange}
                                                />
                                                <label className="labelll" htmlFor={`option-${service.category}-${idx}`}>{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Prestation;
