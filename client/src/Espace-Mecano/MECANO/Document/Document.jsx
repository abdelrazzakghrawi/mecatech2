import { useState, useEffect } from 'react';
import axios from 'axios';
import { FilePlus } from 'lucide-react';
import "./Document.css"
import Swal from 'sweetalert2';
const Document = () => {
    const userId = localStorage.getItem('_id');
    const [files, setFiles] = useState({
        pieceIdentite: null,
        diplome: null
    });
    const [documents, setDocuments] = useState({
        pieceIdentite: null,
        diplome: null
    });

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/documents/${userId}`);
                setDocuments(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des documents', error);
            }
        };

        if (userId) {
            fetchDocuments();
        }
    }, [userId]);

    const handleFileChange = (e) => {
        setFiles({
            ...files,
            [e.target.name]: e.target.files[0]
        });
    };

    const handleUpload = async () => {
        const formData = new FormData();
        if (files.pieceIdentite) formData.append('pieceIdentite', files.pieceIdentite);
        if (files.diplome) formData.append('diplome', files.diplome);

        try {
            await axios.post(`http://localhost:5001/api/upload-documents/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              
            });
            // Recharger les documents après l'upload
            const response = await axios.get(`http://localhost:5001/api/documents/${userId}`);
            setDocuments(response.data);
            Swal.fire({
              icon: "success",
              title: "Information de Ton Compte enregistrées avec succès👌",
            });
        } catch (error) {
            console.error('Erreur lors du téléchargement des documents', error);
        }
    };

    return (
        <div>
           <div>
              <div className="Document__title">Mes Documents</div>

              {/* Condition pour masquer ou afficher la div docs */}
              <div className='docs' style={{ display: (documents.pieceIdentite || documents.diplome) ? 'block' : 'none' }}>
                <h1>Documents</h1>
                {documents.pieceIdentite && (
                    <div>
                        <a href={documents.pieceIdentite} target="_blank" rel="noopener noreferrer">Voir le fichier 1</a>
                    </div>
                )}
                {documents.diplome && (
                    <div>
                        <a href={documents.diplome} target="_blank" rel="noopener noreferrer">Voir le fichier 2</a>
                    </div>
                )}
              </div>
              
              <div className="Document">
                <span className='Document_telecharger'>Télécharger votre pièce d'identité et diplôme</span>
                <span className='Document_Attention'>
                  ATTENTION le format du document doit être OBLIGATOIREMENT : PDF ou JPEG (taille maximum 10 Mo).
                  Valider en appuyant sur le bouton ENVOYER au bas de la page
                </span>
              </div>
              
              <div className='Document2'>
                <FilePlus className='file1' />
                <button className="imagedocument2">~Ajouter un fichier 1~</button>
                <input 
                  type="file" 
                  accept="application/pdf,image/jpeg" 
                  name="pieceIdentite" 
                  onChange={handleFileChange}
                  className='inputpiece'
                />
              </div>
              
              <div className='Document3'>
                <FilePlus className='file2' />
                <button className="imagedocument3">~Ajouter un fichier 2~</button>
                <input 
                  type="file" 
                  accept="application/pdf,image/jpeg" 
                  name="diplome" 
                  onChange={handleFileChange}
                  className='inputpiece'
                />
                <button className='Document__submit' onClick={handleUpload}>ENVOYER</button>
              </div>
            </div>
        </div>
    );
};

export default Document;
