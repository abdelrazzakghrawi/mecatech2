import React, { useState } from 'react';
import './prestation.css';
import logo from "./logo.png";
import user from "./user.png";
import facebook from "./facebook.png";
import instagram from "./instagram.png";
import twitter from "./twitter.png";

function Prestation() {
    const [expandedServiceId, setExpandedServiceId] = useState(null);

    const servicesData = [
        {
            id: 1,
            category: 'Services de freinage',
            icon: '🛠️',
            options: [
                'Remplacement des plaquettes de frein',
                'Remplacement des disques de frein',
                'Réglage du système de freinage'
            ]
        },
        {
            id: 2,
            category: 'Services de direction, suspension',
            icon: '🔧',
            options: [
                'Réparation de direction assistée',
                'Remplacement des amortisseurs',
                'Réglage de la géométrie des roues'
            ]
        },
        {
            id: 3,
            category: 'Services d\'entretien automobile',
            icon: '🚗',
            options: [
                'Vidange d\'huile moteur',
                'Remplacement des filtres (air, huile, carburant)',
                'Contrôle et remplissage des liquides (frein, refroidissement)'
            ]
        },
        {
            id: 4,
            category: 'Services de montage de carrosserie',
            icon: '🛠️',
            options: [
                'Réparation de chocs',
                'Remplacement de panneaux de carrosserie',
                'Alignement de la carrosserie'
            ]
        },
        {
            id: 5,
            category: 'Services de peinture de carrosserie',
            icon: '🎨',
            options: [
                'Peinture complète du véhicule',
                'Réparation et peinture de rayures',
                'Peinture de pièces spécifiques (pare-chocs, rétroviseurs)'
            ]
        },
        {
            id: 6,
            category: 'Services de dépannage',
            icon: '🚑',
            options: [
                'Assistance routière',
                'Remorquage de véhicule',
                'Réparation d\'urgence sur place'
            ]
        },
        {
            id: 7,
            category: 'Diagnostics thermiques et climatisation',
            icon: '🌡️',
            options: [
                'Vérification et recharge du climatiseur',
                'Diagnostic des systèmes de chauffage',
                'Réparation des composants du climatiseur'
            ]
        },
        {
            id: 8,
            category: 'Services moteur',
            icon: '⚙️',
            options: [
                'Réparation de moteurs',
                'Remplacement de la courroie de distribution',
                'Nettoyage du moteur'
            ]
        },
        {
            id: 9,
            category: 'Services de refroidissement et climatisation',
            icon: '❄️',
            options: [
                'Remplacement du radiateur',
                'Réparation du système de refroidissement',
                'Vérification et recharge du fluide de refroidissement'
            ]
        },
        {
            id: 10,
            category: 'Services d\'échappement',
            icon: '🚥',
            options: [
                'Remplacement du catalyseur',
                'Remplacement des tuyaux d\'échappement',
                'Remplacement du silencieux arrière',
                'Remplacement de la sonde lambda',
                'Remplacement de la vanne EGR',
                'Mise à niveau de l\'additif FAP (Cérine)',
                'Mise à niveau de l\'additif AdBlue',
                'Remplacement du filtre à particules',
                'Remplacement du silencieux intermédiaire'
            ]
        },
        {
            id: 11,
            category: 'Services de pneumatiques',
            icon: '🛞',
            options: [
                'Remplacement de pneus',
                'Réparation de crevaison',
                'Équilibrage des roues'
            ]
        },
    ];

    const toggleExpand = (id) => {
        setExpandedServiceId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="app-container">
            <header>
                <div className="navbar">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                    <a href="/logout" className="logout-buttonn">Déconnexion</a>
                </div>
            </header>
            <div className="top-section">
                <aside className="sidebar">
                    <img src={user} alt="User" className="logo" />
                    <div className="navigation">
                        <ul>
                            <li><a href="#home" className="active">Mon compte</a></li>
                            <li><a href="#calendar">Mes rendez-vous</a></li>
                            <li><a href="#about">Choisir une prestation</a></li>
                            <li><a href="#contact">Contactez-nous</a></li>
                        </ul>
                    </div>
                </aside>
                <main className="content">
                    <div className="service-table">
                        <div className="service-table-columns">
                            {servicesData.map((service) => (
                                <div key={service.id} className={`service-category ${expandedServiceId === service.id ? 'expanded' : ''}`}>
                                    <div className="service-header" onClick={() => toggleExpand(service.id)}>
                                        <span className="service-icon">{service.icon}</span>
                                        <span className="service-title">{service.category}</span>
                                        <span className="expand-icon">{expandedServiceId === service.id ? '-' : '+'}</span>
                                    </div>
                                    {expandedServiceId === service.id && service.options && (
                                        <div className="service-options">
                                            {service.options.map((option, idx) => (
                                                <div key={idx} className="service-option">
                                                    <input type="checkbox" id={`option-${service.id}-${idx}`} />
                                                    <label htmlFor={`option-${service.id}-${idx}`}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button className="save-button">Enregistrer</button>
                    </div>
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

export default Prestation;
