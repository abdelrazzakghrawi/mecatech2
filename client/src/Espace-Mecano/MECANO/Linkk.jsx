import "./Profile.css";
import mecano from "./assets/mecano.png";
import { House, NotepadText, Plus, CalendarDays, Folder, Phone, Car, Search, CircleCheckIcon, CircleX, Hourglass } from 'lucide-react';

import { useState } from "react";
import Document from "./Document/Document";
import Contactez_Nous from "./Contactez_Nous/Contactez_Nous";
import Rendezvous from "./Rendezvous/Rendezvous";
import Planning from "./Planning/Planning";
import Compte from "./Compte/Compte";
import Prestation from "./Prestation/Prestation";
import Marque from "./marque/Marque";

const Linkk = () => {
  const [showCompte, setShowCompte] = useState(true);
  const [showPlanning, setShowPlanning] = useState(false);
  const [showPrestation, setShowPrestation] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showRendezVous, setShowRendezVous] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [garageId, setGarageId] = useState(null);
  const [step, setStep] = useState(1);
  const [imageURL, setImageURL] = useState(mecano);

  const handleNextStep = () => {
      setStep(prevStep => prevStep + 1);
  };

  const handleClick = () => {
    setShowAllFalse();
    setShowCompte(true);
  };

  const handleClickPlanning = () => {
    setShowAllFalse();
    setShowPlanning(true);
  };

  const handleClickPrestation = () => {
    setShowAllFalse();
    setShowPrestation(true);
  };

  const handleClickServices = () => {
    setShowAllFalse();
    setShowServices(true);
  };

  const handleClickRendezVous = () => {
    setShowAllFalse();
    setShowRendezVous(true);
  };

  const handleClickDocuments = () => {
    setShowAllFalse();
    setShowDocuments(true);
  };

  const handleClickContact = () => {
    setShowAllFalse();
    setShowContact(true);
  };

  const setShowAllFalse = () => {
    setShowCompte(false);
    setShowPlanning(false);
    setShowPrestation(false);
    setShowServices(false);
    setShowRendezVous(false);
    setShowDocuments(false);
    setShowContact(false);
  };

  return (
    <div className="bodyprofile">
    <div className="profile">
      <div>
        {imageURL && <img className="mecano" src={imageURL} alt="Image de Garage" />}
      </div>
      <div className="tous">
        <div onClick={handleClick} className={`compte ${showCompte ? 'active' : ''}`}>
          <House className="imagecompte" />
          {showCompte && <hr className="active-line" />}
          <h1>Mon compte</h1>
        </div>
       
        <div onClick={handleClickPrestation} className={`prestation ${showPrestation ? 'active' : ''}`}>
          <Plus className="imageprestation" />
          {showPrestation && <hr className="active-line" />}
          <h1>Mes prestations & tarifs</h1>
        </div>
        
        <div onClick={handleClickServices} className={`services ${showServices ? 'active' : ''}`}>
          <Car className="imageservices" />
          {showServices && <hr className="active-line" />}
          <h1>Mes Spécialistes</h1>
        </div>
        <div onClick={handleClickPlanning} className={`planning ${showPlanning ? 'active' : ''}`}>
          <NotepadText className="imageplanning" />
          {showPlanning && <hr className="active-line" />}
          <h1>Mon planning</h1>
        </div>
        <div onClick={handleClickRendezVous} className={`Rendez-vous ${showRendezVous ? 'active' : ''}`}>
          <CalendarDays className="imageRendez-vous" />
          {showRendezVous && <hr className="active-line" />}
          <h1>Mes Rendez-vous</h1>
        </div>
        <div onClick={handleClickDocuments} className={`documents ${showDocuments ? 'active' : ''}`}>
          <Folder className="imagedocuments" />
          {showDocuments && <hr className="active-line" />}
          <h1>Mes documents</h1>
        </div>
        <div onClick={handleClickContact} className={`Contactez_Nous ${showContact ? 'active' : ''}`}>
          <Phone className="imageContactez_Nous" />
          {showContact && <hr className="active-line" />}
          <h1>Contactez-Nous</h1>
        </div>
      </div>
      <div className="absolute">
        {showCompte && <Compte setGarageId={setGarageId} setImageURL={setImageURL} />}

        {showPrestation && <Prestation garageId={garageId} />}
        {showServices && <Marque garageId={garageId} />}
        {showPlanning && <Planning />}
        {showRendezVous && <div>
          <div className="Rendez__title">Mes Rendez-vous</div>
          <div className='Rendez'>
            <CircleCheckIcon style={{ marginLeft: "50px", marginTop: "20px", color: "green", position: "absolute" }} /> <span style={{ color: "green", marginLeft: "80px", marginTop: "23px", position: "absolute" }}>Rendez-Vous confirmé</span>
            <span style={{ fontSize: "30px", position: "absolute", marginLeft: "31.5%", marginTop: "2%" }}>/</span>
            <CircleX style={{ marginLeft: "270px", marginTop: "20px", color: "red", position: "absolute" }} /> <span style={{ color: "red", marginLeft: "300px", marginTop: "23px", position: "absolute" }}>Rendez-Vous Annuler</span>
            <span style={{ fontSize: "30px", position: "absolute", marginLeft: "58%", marginTop: "2%" }}>/</span>
            <Hourglass style={{ marginLeft: "480px", marginTop: "20px", color: "orange", position: "absolute" }} /> <span style={{ color: "orange", marginLeft: "510px", marginTop: "23px", position: "absolute" }}>Rendez-Vous En Attente</span>
          </div>
          <Rendezvous />
        </div>}
        {showDocuments && <Document />}
        {showContact && <Contactez_Nous />}
      </div>
      <p></p> 

      </div>
      
    </div>
  );
};

export default Linkk;
