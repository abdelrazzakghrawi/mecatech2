require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');
const app = express();
const port = 5001;

// Configuration de CORS
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/garage_images', express.static('garage_images'));

// Ensure the directory exists
const ensureDirectoryExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Directory ${dir} created.`);
    } else {
        console.log(`Directory ${dir} already exists.`);
    }
};

// Configure multer for file upload (memory storage)
const upload = multer({ storage: multer.memoryStorage() });

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connecté à MongoDB');
}).catch((error) => {
    console.error('Erreur de connexion à MongoDB:', error.message);
});

// Définition du schéma et du modèle Mongoose pour Garage
const GarageSchema = new mongoose.Schema({
    _id: String,
    Ville: String,
    nomGarage: String,
    Telephone: String,
    Adresse: String,
    latitude: Number,
    longitude: Number,
    image_path: String,
    compétances: String,
    methodesPaiement: String,
    Spécialités: String,
    pieceIdentite: String,
    diplome: String
}, { _id: false });

const Garage = mongoose.model('mecanique_details', GarageSchema);

// Définition du schéma et du modèle Mongoose pour Contact
const ContactSchema = new mongoose.Schema({
  _id: String,
  nomComplet: String,
  adresse: String,
  ville: String,
  tel: String,
  message: String
});
const Contact = mongoose.model('contactez_nous', ContactSchema);

const dbName = 'Mecano';

async function getCarBrands() {
    const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Auto');
        const brands = await collection.distinct('Marque');
        return brands;
    } finally {
        await client.close();
    }
}

async function getServices() {
    const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Prestations');
        const services = await collection.find({}, { projection: { _id: 0 } }).toArray();
        const result = {};
        services.forEach(service => {
            for (const [key, value] of Object.entries(service)) {
                if (!result[key]) {
                    result[key] = [];
                }
                result[key].push(value);
            }
        });
        return result;
    } catch (err) {
        console.error('Échec de la connexion à MongoDB:', err);
        throw err;
    } finally {
        await client.close();
    }
}

// Route pour obtenir les informations initiales
app.get('/api/initial-info/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const garage = await Garage.findById(userId);
        if (!garage) return res.status(404).json({ message: 'Garage non trouvé' });
        if (garage.image_path) {
            garage.image_path = `http://localhost:5001/${garage.image_path}`;
        }
        res.json(garage);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des informations initiales', error });
    }
});

// Route pour obtenir les spécialités
app.get('/api/marques/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const garage = await Garage.findById(userId);
        if (!garage) {
            return res.status(404).json({ message: 'Garage non trouvé' });
        }
        const Spécialités = garage.Spécialités ? garage.Spécialités.split(',') : [];
        res.json({ Spécialités });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des spécialités', error });
    }
});

// Route pour obtenir les prestations
app.get('/api/prestations/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const garage = await Garage.findById(userId);
        if (!garage) {
            return res.status(404).json({ message: 'Garage non trouvé' });
        }
        const compétances = garage.compétances ? garage.compétances.split(',') : [];
        const methodesPaiement = garage.methodesPaiement ? garage.methodesPaiement.split(',') : [];
        res.json({ compétances, methodesPaiement });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des prestations', error });
    }
});

app.post('/api/initial-info', upload.single('image_path'), async (req, res) => {
    console.log('Received upload request');
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);
    const { Ville, nomGarage, Telephone, Adresse, latitude, longitude, userId } = req.body;
    
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const original_filename = req.file.originalname;
    const dir = 'garage_images/';
    ensureDirectoryExists(dir);
    const image_path = path.join(dir, original_filename);

    try {
        // Write the file to disk
        fs.writeFileSync(image_path, req.file.buffer);
        console.log("Image saved to:", image_path);

        let imageUrl = '';

        // Send the image to the external service
        const formData = new FormData();
        formData.append('image', fs.createReadStream(image_path), {
            filename: original_filename,
            contentType: req.file.mimetype
        });

        const response = await axios.post('http://search-service:3003/api/upload-garage-image', formData, {
            headers: {
                ...formData.getHeaders(),
                'Content-Type': 'multipart/form-data'
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });

        // Store the image URL returned from the external service
        imageUrl = response.data.imageUrl;

        // Find and update the garage with the provided data
        const garage = await Garage.findOneAndUpdate(
            { _id: userId },
            {
                Ville,
                nomGarage,
                Telephone,
                Adresse,
                latitude,
                longitude,
                image_path // Store the path to the image
            },
            { upsert: true, new: true }
        );

        

        // Respond with the updated garage information
        res.status(201).json({ id: garage._id, imageUrl });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error creating initial information', error: error.message });
    }
});

// Route pour mettre à jour les prestations
app.post('/api/prestations', async (req, res) => {
    const { userId, compétances, methodesPaiement } = req.body;
    try {
        const garage = await Garage.findOneAndUpdate(
            { _id: userId },
            {
                compétances: compétances.join(','),
                methodesPaiement: methodesPaiement.join(',')
            },
            { upsert: true, new: true }
        );

        res.json(garage);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour des prestations', error });
    }
});

// Route pour mettre à jour les spécialités
app.post('/api/marques', async (req, res) => {
    const { userId, Spécialités } = req.body;
    try {
        const garage = await Garage.findOneAndUpdate(
            { _id: userId },
            { Spécialités: Spécialités.join(',') },
            { upsert: true, new: true }
        );

        res.json(garage);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour des Spécialités', error });
    }
});

// Route pour gérer le téléchargement des documents
app.post('/api/upload-documents/:userId', upload.fields([
    { name: 'pieceIdentite', maxCount: 1 },
    { name: 'diplome', maxCount: 1 }
]), async (req, res) => {
    const { userId } = req.params;
    const { pieceIdentite, diplome } = req.files;

    try {
        const updateData = {
            pieceIdentite: pieceIdentite ? pieceIdentite[0].path : undefined,
            diplome: diplome ? diplome[0].path : undefined
        };

        const garage = await Garage.findOneAndUpdate(
            { _id: userId },
            { $set: updateData },
            { new: true }
        );

        res.status(200).json(garage);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour des documents', error });
    }
});

// Route pour obtenir les chemins des documents
app.get('/api/documents/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const garage = await Garage.findById(userId);
        if (!garage) return res.status(404).json({ message: 'Garage non trouvé' });
        res.json({
            pieceIdentite: garage.pieceIdentite ? `http://localhost:5001/${garage.pieceIdentite}` : null,
            diplome: garage.diplome ? `http://localhost:5001/${garage.diplome}` : null
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des documents', error });
    }
});

// Route pour obtenir les marques
app.get('/brands', async (req, res) => {
    try {
        const brands = await getCarBrands();
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des marques', error });
    }
});

// Route pour obtenir les services
app.get('/services', async (req, res) => {
    try {
        const services = await getServices();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des services', error });
    }
});

// Nouvelle route pour enregistrer les informations de contact
app.post('/api/contact', async (req, res) => {
  try {
    const { _id, nomComplet, adresse, ville, tel, message } = req.body;
    
    const newContact = new Contact({
      _id,
      nomComplet,
      adresse,
      ville,
      tel,
      message
    });

    await newContact.save();
    res.status(201).json({ message: 'Contact enregistré avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du contact:', error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement du contact' });
  }
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});