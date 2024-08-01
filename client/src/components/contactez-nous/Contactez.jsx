import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './contactez.css';
import logo from "./logo.png";
import facebook from "./facebook.png";
import instagram from "./instagram.png";
import twitter from "./twitter.png";
import contact from "./contact.png";

function Contactez() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        telephone: '',
        message: '',
        image: null // New state for image file
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('nom', formData.nom);
        data.append('prenom', formData.prenom);
        data.append('telephone', formData.telephone);
        data.append('message', formData.message);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/contact', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Form Data Submitted:', response.data);

            // Clear the form after successful submission
            setFormData({
                nom: '',
                prenom: '',
                telephone: '',
                message: '',
                image: null
            });

            // Clear the file input element
            document.getElementById('image').value = '';
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <div className="app-container">
            <header>
                <div className="navbar">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                    <Link to="/logout" className="logout-buttonn">Déconnexion</Link>
                </div>
            </header>
            <div className="top-section">
                <aside className="sidebar">
                    <div className="navigation">
                        <ul>
                            <li><Link to="/mon-compte" className="active">Mon compte</Link></li>
                            <li><Link to="/mes-rendez-vous">Mes rendez-vous</Link></li>
                            <li><Link to="/choisir-prestation">Choisir une prestation</Link></li>
                            <li><Link to="/contactez-nous" className="active">Contactez-nous</Link></li>
                        </ul>
                    </div>
                </aside>
                <main className="main-content">
                    <section className="contact-form-section">
                        <img src={contact} alt="Contactez-nous" className="header-image small-image" />
                        <h2>Contactez-nous</h2>
                        <p>Merci de remplir le formulaire ci-dessous afin que notre équipe puisse vous répondre dans les plus brefs délais.</p>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div>
                                    <label htmlFor="nom">Nom *</label>
                                    <input 
                                        type="text" 
                                        id="nom" 
                                        name="nom" 
                                        value={formData.nom} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="prenom">Prénom *</label>
                                    <input 
                                        type="text" 
                                        id="prenom" 
                                        name="prenom" 
                                        value={formData.prenom} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div>
                                    <label htmlFor="telephone">Téléphone portable *</label>
                                    <input 
                                        type="tel" 
                                        id="telephone" 
                                        name="telephone" 
                                        value={formData.telephone} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message">Message</label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        value={formData.message} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <label htmlFor="image">Image</label>
                                <input 
                                    type="file" 
                                    id="image" 
                                    name="image" 
                                    onChange={handleFileChange} 
                                />
                            </div>
                            <button type="submit" className="submit-button">Envoyer</button>
                        </form>
                    </section>
                </main>
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
                        <h4>Remplacement et réparation</h4>
                        <ul>
                            <li>Remplacement freins à disque</li>
                            <li>Remplacement plaquettes de frein</li>
                            <li>Remplacement de l’embrayage</li>
                            <li>Remplacement de l’échappement</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <img src={logo} alt="Meca Tech Footer Logo" className="footer-logo" />
                    <p>Copyright © 2016 MecaTech - Tous droits réservés</p>
                    <div className="mini-images">
                        <img src={facebook} alt="Facebook" className="mini-logo" />
                        <img src={instagram} alt="Instagram" className="mini-logo" />
                        <img src={twitter} alt="Twitter" className="mini-logo" />
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Contactez;
