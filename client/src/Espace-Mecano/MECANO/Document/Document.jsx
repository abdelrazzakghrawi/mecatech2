import React, { useRef, useState } from 'react';
import './Document.css';
import { FilePlus } from 'lucide-react';

const Document = () => {
  const [idFile, setIdFile] = useState(null);
  const [diplomaFile, setDiplomaFile] = useState(null);
  const idFileInputRef = useRef(null);
  const diplomaFileInputRef = useRef(null);

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'image/jpeg') && file.size <= 10 * 1024 * 1024) {
      setFile(file);
    } else {
      alert('Le fichier doit être au format PDF ou JPEG et ne pas dépasser 10 Mo.');
    }
  };

  const handleButtonClick = (inputRef) => {
    inputRef.current.click();
  };

  return (
    <div>
      <div className="Document__title">Mes Documents</div>
      
      <div className="Document">
        <span className='Document_telecharger'>Télécharger votre pièce d'identité et diplôme</span>
        <span className='Document_Attention'>
          ATTENTION le format du document doit être OBLIGATOIREMENT : PDF ou JPEG (taille maximum 10 Mo).
          Valider en appuyant sur le bouton ENVOYER au bas de la page
        </span>
      </div>
      
      <div className='Document2'>
      <FilePlus className='file1' onClick={() => handleButtonClick(diplomaFileInputRef)} />
        <button  className="imagedocument2"onClick={() => handleButtonClick(idFileInputRef)}>~Ajouter un fichier~</button>
        <input 
          type="file" 
          accept="application/pdf,image/jpeg" 
          ref={idFileInputRef} 
          onChange={(e) => handleFileChange(e, setIdFile)} 
          style={{ display: 'none' }} 
        />
      </div>
      
      <div className='Document3'>
      <FilePlus className='file2' onClick={() => handleButtonClick(diplomaFileInputRef)} />
        <button className="imagedocument3" onClick={() => handleButtonClick(diplomaFileInputRef)}>~Ajouter un fichier~</button>
        <input 
          type="file" 
          accept="application/pdf,image/jpeg" 
          ref={diplomaFileInputRef} 
          onChange={(e) => handleFileChange(e, setDiplomaFile)} 
          style={{ display: 'none' }} 
        />
              <button className='Document__submit'>ENVOYER</button>

      </div>
      
    </div>
  );
};

export default Document;
