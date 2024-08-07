import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './Cclient.css';
import logo from "./logo.png";
import defaultUserImage from "./user.png";
import instagram from "./instagram.png";
import facebook from "./facebook.png";
import twitter from "./twitter.png";

function Aclient() {
    const [id, setId] = useState(null);
    const [nom, setNom] = useState('Ghrawi');
    const [prenom, setPrenom] = useState('Abdelkader');
    const [telephone, setTelephone] = useState('');
    const [message, setMessage] = useState('');
    const [userImage, setUserImage] = useState(defaultUserImage); // Valeur par défaut
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const savedImage = localStorage.getItem('userImage');
        if (savedImage) {
            setUserImage(savedImage);
        } else {
            setUserImage(defaultUserImage); // Afficher l'image par défaut si aucune image n'est stockée
        }
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                console.log('Image sélectionnée:', base64Image);
                setUserImage(base64Image);
                localStorage.setItem('userImage', base64Image); // Stocker l'image en base64 dans localStorage
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const phoneNumberPattern = /^\d{10}$/;
        if (!phoneNumberPattern.test(telephone)) {
            setShowModal(true);
            return;
        }

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('telephone', telephone);
        formData.append('message', message);

        if (userImage !== defaultUserImage) { // Ne pas ajouter d'image si c'est l'image par défaut
            try {
                // Convertir base64 en blob
                const response = await fetch(userImage);
                const blob = await response.blob();
                formData.append('image', blob, 'image.png');
            } catch (error) {
                console.error('Erreur lors de la conversion de l\'image:', error);
                return; // Arrêter la soumission si la conversion échoue
            }
        }

        try {
            let response;
            if (id) {
                // Mettre à jour le client existant
                response = await axios.put(`http://localhost:5000/api/client/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                // Créer un nouveau client
                response = await axios.post('http://localhost:5000/api/client', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            console.log('Données envoyées:', response.data);
            setTelephone('');
            setMessage('');
            // Ne pas réinitialiser l'image pour la garder inchangée
            // localStorage.removeItem('userImage'); // Ne pas nettoyer le localStorage
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const loadClientData = async (clientId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/client/${clientId}`);
            const { nom, prenom, telephone, message, imageUrl } = response.data;
            setId(clientId);
            setNom(nom);
            setPrenom(prenom);
            setTelephone(telephone);
            setMessage(message);
            setUserImage(imageUrl ? `/uploads/${imageUrl}` : defaultUserImage);
        } catch (error) {
            console.error('Erreur lors du chargement des données du client:', error);
        }
    };

    return (
        <div className="app-container">
            <header className="navbar">
                <img src={logo} alt="Meca Tech Logo" className="navbar-logo" />
                <NavLink to="/logout" className="logout-button">Déconnexion</NavLink>
            </header>
            <div className="top-section">
                <aside className="sidebar">
                    <div className="profile-image-container">
                        <label htmlFor="upload-image">
                            <img src={userImage} alt="Profile" className="profile-image" />
                        </label>
                        <input
                            type="file"
                            id="upload-image"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <nav className="navigation">
                        <ul>
                            <li>
                                <NavLink
                                    to="/mon-compte"
                                    className={({ isActive }) => isActive ? "navigation-link active" : "navigation-link"}
                                >
                                    Mon Compte
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/mes-rendez-vous"
                                    className={({ isActive }) => isActive ? "navigation-link active" : "navigation-link"}
                                >
                                    Mes Rendez-vous
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/choisir-prestation"
                                    className={({ isActive }) => isActive ? "navigation-link active" : "navigation-link"}
                                >
                                    Choisir une Présentation
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contactez-nous"
                                    className={({ isActive }) => isActive ? "navigation-link active" : "navigation-link"}
                                >
                                    Contactez-nous
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <div className="form-container">
                    <h2>Mon profil</h2>
                    <form onSubmit={handleSubmit} className="styled-form">
                        <div className="form-group">
                            <input
                                type="text"
                                id="nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                placeholder="Nom"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="prenom"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                placeholder="Prénom"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telephone">Téléphone portable*</label>
                            <div className="input-container">
                                <input
                                    type="tel"
                                    id="telephone"
                                    value={telephone}
                                    onChange={(e) => setTelephone(e.target.value)}
                                    required
                                />
                                <span className={`input-error ${telephone ? '' : 'visible'}`}>✗</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Adresse</label>
                            <div className="input-container">
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                                <span className={`input-error ${message ? '' : 'visible'}`}>✗</span>
                            </div>
                        </div>
                        <button type="submit" className="save-button">Modifier</button>
                    </form>
                </div>
            </div>
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>Mécanos dans votre ville</h4>
                        <ul>
                            <li>Mécano à Paris</li>
                            <li>Mécano à Lille</li>
                            <li>Mécano à Bordeaux</li>
                            <li>Mécano à Lyon</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Entretien par modèles</h4>
                        <ul>
                            <li>Entretien BMW</li>
                            <li>Entretien Mercedes</li>
                            <li>Entretien Volvo</li>
                            <li>Entretien Fiat</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>À propos de Méca Tech</h4>
                        <ul>
                            <li>Qui sommes-nous?</li>
                            <li>FAQ</li>
                            <li>Mentions légales</li>
                            <li>Politique de confidentialité</li>
                        </ul>
                    </div>
                    <div className="footer-bottom">
                        <img src={logo} alt="Meca Tech Logo" className="footer-logo" />
                        <div className="social-icons">
                            <img src={instagram} alt="Instagram" />
                            <img src={facebook} alt="Facebook" />
                            <img src={twitter} alt="Twitter" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Aclient;
