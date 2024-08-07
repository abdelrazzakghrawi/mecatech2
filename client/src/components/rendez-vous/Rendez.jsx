import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Rendez.css';
import logo from "./logo.png";
import facebook from "./facebook.png";
import instagram from "./instagram.png";
import twitter from "./twitter.png";

function Rendez() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showHistory, setShowHistory] = useState(false);
    const appointments = {
        "2024-07-18": { name: "Ahmed", phone: "067676766", time: "10:00", details: "Routine checkup" },
        "2024-07-19": { name: "Fatima", phone: "065656565", time: "14:00", details: "Dental cleaning" },
        "2024-07-20": { name: "John", phone: "064646464", time: "11:00", details: "Consultation" }
    };
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1); // Janvier = 0

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const getFormattedDate = (year, month, day) => {
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const renderCalendar = () => {
        const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
        const daysInMonth = new Date(year, month, 0).getDate();

        const calendar = [];
        let week = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            week.push(<td key={`empty-start-${i}`}></td>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = getFormattedDate(year, month, day);
            const hasAppointment = appointments[date];
            week.push(
                <td key={date}
                    className={hasAppointment ? 'has-appointment' : ''}
                    onClick={() => hasAppointment && handleDateClick(date)}
                >
                    {day}
                </td>
            );
            if (week.length === 7) {
                calendar.push(<tr key={`week-${day}`}>{week}</tr>);
                week = [];
            }
        }

        while (week.length < 7) {
            week.push(<td key={`empty-end-${week.length}`}></td>);
        }
        calendar.push(<tr key="last-week">{week}</tr>);
        return calendar;
    };

    const renderAppointmentsList = () => {
        return Object.entries(appointments).map(([date, appointment]) => (
            <div key={date} className="appointment-history">
                <h3>{date}</h3>
                <p><strong>Nom:</strong> {appointment.name}</p>
                <p><strong>Téléphone:</strong> {appointment.phone}</p>
                <p><strong>Heure:</strong> {appointment.time}</p>
                <p><strong>Détails:</strong> {appointment.details}</p>
            </div>
        ));
    };

    return (
        <div className="app-container">
            <header className="navbar">
                <img src={logo} alt="Meca Tech Logo" className="navbar-logo" />
                <Link to="/logout" className="logout-button">Déconnexion</Link>
            </header>
            <div className="top-section">
                <aside className="sidebar">
                    <nav className="navigation">
                        <ul>
                            <li><Link to="/mon-compte">Mon Compte</Link></li>
                            <li><Link to="/mes-rendez-vous" className="active">Mes Rendez-vous</Link></li>
                            <li><Link to="/choisir-prestation">Choisir une Présentation</Link></li>
                            <li><Link to="/contactez-nous">Contactez-nous</Link></li>
                        </ul>
                    </nav>
                </aside>
                <div className="content-container">
                    <div className="calendar-and-details">
                        <div className="calendar">
                            <h2>{showHistory ? 'Historique des Rendez-vous' : 'Mes Rendez-vous'}</h2>
                            <div className="button-container">
                                <button onClick={() => setShowHistory(false)}>Mes Rendez-vous</button>
                                <button onClick={() => setShowHistory(true)}>Historique des Rendez-vous</button>
                            </div>
                            {showHistory ? (
                                <div className="history">
                                    {renderAppointmentsList()}
                                </div>
                            ) : (
                                <div className="calendar-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Dim</th>
                                                <th>Lun</th>
                                                <th>Mar</th>
                                                <th>Mer</th>
                                                <th>Jeu</th>
                                                <th>Ven</th>
                                                <th>Sam</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderCalendar()}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                        {selectedDate && !showHistory && (
                            <div className="appointment-details">
                                <h3>Détails du rendez-vous</h3>
                                <p><strong>Date:</strong> {selectedDate}</p>
                                <p><strong>Nom:</strong> {appointments[selectedDate].name}</p>
                                <p><strong>Téléphone:</strong> {appointments[selectedDate].phone}</p>
                                <p><strong>Heure:</strong> {appointments[selectedDate].time}</p>
                                <p><strong>Détails:</strong> {appointments[selectedDate].details}</p>
                            </div>
                        )}
                    </div>
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
                        <img src={facebook} alt="Facebook" />
                        <img src={instagram} alt="Instagram" />
                        <img src={twitter} alt="Twitter" />
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Rendez;
