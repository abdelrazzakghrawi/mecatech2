const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 5001;

// Configuration CORS
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurer multer pour gérer les images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Modèle pour les garages
const GarageSchema = new mongoose.Schema({
    Ville: String,
    nomGarage: String,
    Telephone: String,
    Adresse: String,
    latitude: String,
    longitude: String,
    image_path: String,
    compétances: String,
    methodesPaiement: String,
    Spécialités: String
});
const Garage = mongoose.model('mecanique_details', GarageSchema);

// Nom de la base de données
const dbName = 'Mecano';

// Fonction pour récupérer les marques
async function getCarBrands() {
    const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connecté à la base de données");
        const db = client.db(dbName);
        const collection = db.collection('Auto');
        const brands = await collection.distinct('Marque');
        return brands;
    } finally {
        await client.close();
    }
}

// Fonction pour récupérer les services
async function getServices() {
    const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connecté à MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('Prestations');
        const services = await collection.find({}, { projection: { _id: 0 } }).toArray(); // Exclure _id
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

// Route pour les informations initiales
app.post('/api/initial-info', upload.single('image_path'), async (req, res) => {
    const { Ville, nomGarage, Telephone, Adresse, latitude, longitude } = req.body;
    const image_path = req.file ? req.file.path : '';

    try {
        const garage = new Garage({
            Ville,
            nomGarage,
            Telephone,
            Adresse,
            latitude,
            longitude,
            image_path
        });
        await garage.save();
        res.status(201).json({ id: garage._id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création des informations initiales', error });
    }
});

// Route pour les prestations
app.post('/api/prestations', async (req, res) => {
    const { id, compétances, methodesPaiement } = req.body;
    try {
        const garage = await Garage.findByIdAndUpdate(id, {
            compétances: compétances.join(','), // Stocker en tant que chaîne de caractères
            methodesPaiement: methodesPaiement.join(',') // Stocker en tant que chaîne de caractères
        }, { new: true });

        if (!garage) return res.status(404).json({ message: 'Garage non trouvé' });
        res.json(garage);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour des prestations', error });
    }
});

// Route pour les Spécialités
app.post('/api/marques', async (req, res) => {
    const { id, Spécialités } = req.body;
    try {
        const garage = await Garage.findByIdAndUpdate(id, {
            Spécialités: Spécialités.join(',') // Stocker en tant que chaîne de caractères
        }, { new: true });

        if (!garage) return res.status(404).json({ message: 'Garage non trouvé' });
        res.json(garage);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour des Spécialités', error });
    }
});

// Route pour les marques
app.get('/brands', async (req, res) => {
    try {
        const brands = await getCarBrands();
        res.json(brands);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route pour les services
app.get('/services', async (req, res) => {
    try {
        const data = await getServices();
        res.json(data);
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des services');
    }
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
