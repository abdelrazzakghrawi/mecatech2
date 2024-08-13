import { useEffect, useState } from "react";
import "./marque.css"
import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";
import image4 from "../assets/4.png";
import image5 from "../assets/5.png";
import image6 from "../assets/6.png";
import image7 from "../assets/7.png";
import image8 from "../assets/8.png";
import image9 from "../assets/9.png";
import image10 from "../assets/10.png";
import image11 from "../assets/11.png";
import image12 from "../assets/12.png";
import image13 from "../assets/13.png";
import image14 from "../assets/14.png";
import image15 from "../assets/15.png";
import image16 from "../assets/16.png";
import image17 from "../assets/17.png";
import image18 from "../assets/18.png";
import image19 from "../assets/19.png";
import image20 from "../assets/20.png";
import image21 from "../assets/21.png";
import image22 from "../assets/22.png";
import image23 from "../assets/23.png";
import image24 from "../assets/24.png";
import image25 from "../assets/25.png";
import image26 from "../assets/26.png";
import image27 from "../assets/27.png";
import image28 from "../assets/28.png";
import image29 from "../assets/29.png";
import image30 from "../assets/30.png";
import image31 from "../assets/31.png";
import image32 from "../assets/32.png";
import image33 from "../assets/33.png";
import image34 from "../assets/34.png";
import image35 from "../assets/35.png";
import image36 from "../assets/36.png";
import image37 from "../assets/37.png";
import image38 from "../assets/38.png";
import image39 from "../assets/39.png";
import image40 from "../assets/40.png";
import image41 from "../assets/41.png";
import image42 from "../assets/42.png";
import image43 from "../assets/43.png";
import image44 from "../assets/44.png";
import image45 from "../assets/45.png";
import image46 from "../assets/46.png";
import image47 from "../assets/47.png";
import image48 from "../assets/48.png";
import image49 from "../assets/49.png";
import image50 from "../assets/50.png";
import image51 from "../assets/51.png";
import image52 from "../assets/52.png";
import image53 from "../assets/53.png";
import image54 from "../assets/54.png";
import image55 from "../assets/55.png";
import image56 from "../assets/56.png";
import image57 from "../assets/57.png";
import image58 from "../assets/58.png";
import image59 from "../assets/59.png";
import image60 from "../assets/60.png";
import image61 from "../assets/61.png";
import image62 from "../assets/62.png";
import image63 from "../assets/63.png";
import axios from "axios";
import { TextField } from "@mui/material";
import { CircleX, Search } from "lucide-react";
import Swal from "sweetalert2";
const iconMappin = {
    "ABARTH": <img style={{width:"42px"}} src={image56} alt="" />,
    "ALFA ROMEO": <img style={{width:"42px"}} src={image58} alt="" />,
    "ALPINA": <img style={{width:"42px"}} src={image44} alt="" />,
    "ASTON MARTIN": <img style={{width:"35px"}} src={image59} alt="" />,
    "AUDI": <img style={{width:"42px"}} src={image1} alt="" />,
    "BENTLEY": <img style={{width:"42px"}} src={image61} alt="" />,
    "BMW": <img style={{width:"42px"}} src={image2} alt="" />,
    "BUGATTI": <img style={{width:"42px"}} src={image60} alt="" />,
    "CADILLAC": <img style={{width:"42px"}} src={image62} alt="" />,
    "CHERY": <img style={{width:"42px"}} src={image53} alt="" />,
    "CHEVROLET": <img style={{width:"42px"}} src={image31} alt="" />,
    "CHRYSLER":<img style={{width:"42px"}} src={image3} alt="" />,
    "CITROËN": <img style={{width:"42px"}} src={image4} alt="" />,
    "DACIA": <img style={{width:"42px"}} src={image32} alt="" />,
    "DAEWOO": <img style={{width:"42px"}} src={image36} alt="" />,
    "DAIHATSU":<img style={{width:"42px"}} src={image5} alt="" />,
    "DODGE": <img style={{width:"42px"}} src={image6} alt="" />,
    "DS": <img style={{width:"42px"}} src={image57} alt="" />,
    "FERRARI": <img style={{width:"42px"}} src={image37} alt="" />,
    "FIAT": <img style={{width:"42px"}} src={image7} alt="" />,
    "FORD": <img style={{width:"42px"}} src={image8} alt="" />,
    "FORD USA": <img style={{width:"42px"}} src={image41} alt="" />,
    "GEELY": <img style={{width:"42px"}} src={image52} alt="" />,
    "GREAT WALL": <img style={{width:"42px"}} src={image54} alt="" />,
    "HONDA": <img style={{width:"42px"}} src={image9} alt="" />,
    "HUMMER": <img style={{width:"42px"}} src={image48} alt="" />,
    "HYUNDAI": <img style={{width:"42px"}} src={image34} alt="" />,
    "INFINITI": <img style={{width:"42px"}} src={image50} alt="" />,
    "ISUZU":<img style={{width:"42px"}} src={image10} alt="" />,
    "IVECO":<img style={{width:"42px"}} src={image11} alt="" />,
    "JAGUAR":<img style={{width:"42px"}} src={image12} alt="" />,
    "JEEP": <img style={{width:"42px"}} src={image45} alt="" />,
    "KIA": <img style={{width:"42px"}} src={image35} alt="" />,
    "LAMBORGHINI":<img style={{width:"30px"}} src={image38} alt="" />,
    "LANCIA":<img style={{width:"42px"}} src={image13} alt="" />,
    "LAND ROVER": <img style={{width:"42px"}} src={image51} alt="" />,
    "LEXUS": <img style={{width:"42px"}} src={image43} alt="" />,
    "LOTUS": <img style={{width:"42px"}} src={image42} alt="" />,
    "MAHINDRA": <img style={{width:"42px"}} src={image47} alt="" />,
    "MASERATI": <img style={{width:"42px"}} src={image40} alt="" />,
    "MAZDA": <img style={{width:"42px"}} src={image14} alt="" />,
    "MCLAREN": <img style={{width:"42px"}} src={image63} alt="" />,
    "MERCEDES-BENZ": <img style={{width:"25px"}} src={image15} alt="" />,
    "MINI": <img style={{width:"42px"}} src={image49} alt="" />,
    "MITSUBISHI": <img style={{width:"42px"}} src={image16} alt="" />,
    "NISSAN": <img style={{width:"42px"}} src={image17} alt="" />,
    "OPEL": <img style={{width:"42px"}} src={image18} alt="" />,
    "PEUGEOT": <img style={{width:"42px"}} src={image19} alt="" />,
    "PORSCHE": <img style={{width:"42px"}} src={image20} alt="" />,
    "RENAULT": <img style={{width:"42px"}} src={image21} alt="" />,
    "ROLLS-ROYCE": <img style={{width:"30px"}} src={image39} alt="" />,
    "ROVER": <img style={{width:"42px"}} src={image22} alt="" />,
    "SAAB": <img style={{width:"42px"}} src={image23} alt="" />,
    "SEAT": <img style={{width:"42px"}} src={image24} alt="" />,
    "SKODA": <img style={{width:"42px"}} src={image25} alt="" />,
    "SMART": <img style={{width:"42px"}} src={image46} alt="" />,
    "SSANGYONG": <img style={{width:"42px"}} src={image33} alt="" />,
    "SUBARU": <img style={{width:"42px"}} src={image26} alt="" />,
    "SUZUKI": <img style={{width:"42px"}} src={image27} alt="" />,
    "TESLA": <img style={{width:"42px"}} src={image55} alt="" />,
    "TOYOTA": <img style={{width:"42px"}} src={image28} alt="" />,
    "VOLVO": <img style={{width:"42px"}} src={image29} alt="" />,
    "VW": <img style={{width:"42px"}} src={image30} alt="" />,
  };

const Marque = () => {
  const [Spécialités, setSpécialités] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpécialités, setSelectedSpécialités] = useState([]);
  const userId = localStorage.getItem('_id');


 
  useEffect(() => {
    const fetchSpécialités = async () => {
      try {
        const response = await axios.get('http://localhost:5001/brands');
        setSpécialités(response.data);

      } catch (error) {
        console.error('Erreur lors de la récupération des Spécialités:', error);
      }
    };
    fetchSavedMarques(); // Nouvelle fonction pour récupérer les marques enregistrées
    fetchSpécialités();
  }, []);
  const fetchSavedMarques = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/marques/${userId}`);
      setSelectedSpécialités(response.data.Spécialités || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des marques enregistrées:', error);
    }
  }

  const filteredSpécialités = Spécialités.filter((marque) =>
    marque.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupSpécialitésByFour = (Spécialités) => {
    const groupedSpécialités = [];
    for (let i = 0; i < Spécialités.length; i += 4) {
      groupedSpécialités.push(Spécialités.slice(i, i + 4));
    }
    return groupedSpécialités;
  };

  const groupedSpécialités = groupSpécialitésByFour(filteredSpécialités);

  const handleCheckboxChange = (marque) => {
    setSelectedSpécialités((prevSelected) =>
      prevSelected.includes(marque)
        ? prevSelected.filter((item) => item !== marque)
        : [...prevSelected, marque]
    );
  };

  const handleRemoveMarque = (marque) => {
    setSelectedSpécialités((prevSelected) =>
      prevSelected.filter((item) => item !== marque)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5001/api/marques', { 
        userId,
        Spécialités: selectedSpécialités 
      });
      Swal.fire({
        icon: "success",
        title: "Marques enregistrées avec succès👌",
      });
      // Optionnel : Rafraîchir les marques enregistrées après la soumission
      fetchSavedMarques();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des Spécialités:', error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue lors de l'enregistrement des marques ✖✖✖.",
      });
    }
  };


  const handleRemoveAll = () => {
    setSelectedSpécialités([]);
  };
  return (
    <div>
      <div className="marque-container">
        <div className="marque__title">Mon Spécialistes Spécialités</div>
        <button className="buttmar" type="submit" onClick={handleSubmit}>Enregistrer</button>

        <div className="marque">
          <span className="Searchmarque">Rechercher une marque... <Search style={{ position: "absolute" }} /> </span>
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
            fullWidth
            margin="normal"
            InputProps={{
              sx: { borderRadius: 10, boxShadow: '-1px 6px 6px -6px ', width: "50%", left: "38%" },
            }}
          />
            <div className="selected-brands">
          <h4>Marques Sélectionnées</h4>
          <br />
          {selectedSpécialités.length > 0 ? (
            <div className="selected-brands-container">
              {selectedSpécialités.map((marque, index) => (
                <div key={index} className="selected-brand">
                  {iconMappin[marque] || <img style={{ width: "42px" }} src={image1} alt="default" />}
                  <CircleX
                    className="remove-icon"
                    onClick={() => handleRemoveMarque(marque)}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  />
                </div>
              ))}
              <button className="remove-all" onClick={handleRemoveAll}>Supprimer Tout</button>
            </div>
          ) : (
            <span>Aucune marque sélectionnée</span>
          )}
        </div>
          {groupedSpécialités.map((group, index) => (
            <div key={index} className="marque__group">
              {group.map((marque, subIndex) => (
                <div key={subIndex} className="marque__item">
                  <input
                    className="check"
                    type="checkbox"
                    id={`checkbox-${index}-${subIndex}`}
                    checked={selectedSpécialités.includes(marque)}
                    onChange={() => handleCheckboxChange(marque)}
                  />
                  {iconMappin[marque] || <img style={{ width: "42px" }} src={image1} alt="default" />}
                  <label htmlFor={`checkbox-${index}-${subIndex}`} style={{ marginLeft: '10px' }}>{marque}</label>
                </div>
              ))}
            </div>
          ))}
        </div>

      
      </div>
    </div>
  );
};

export default Marque;
