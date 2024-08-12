require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connecté à MongoDB');
}).catch((error) => {
    console.error('Erreur de connexion à MongoDB:', error.message);
});

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
    Spécialités: String,
    userId: String
});
const Garage = mongoose.model('mecanique_details', GarageSchema);

const dbName = 'Mecano';

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

async function getServices() {
    const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connecté à MongoDB');

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

app.get('/api/initial-info/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const garage = await Garage.findOne({ userId });
        if (!garage) return res.status(404).json({ message: 'Garage non trouvé' });
        if (garage.image_path) {
            garage.image_path = `http://localhost:5001/${garage.image_path}`;
        }
        res.json(garage);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des informations initiales', error });
    }
});
app.get('/api/prestations/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const garage = await Garage.findOne({ userId });
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
    const { Ville, nomGarage, Telephone, Adresse, latitude, longitude, userId } = req.body;
    const image_path = req.file ? req.file.path : '';

    try {
        const garage = await Garage.findOneAndUpdate(
            { userId },
            {
                Ville,
                nomGarage,
                Telephone,
                Adresse,
                latitude,
                longitude,
                image_path
            },
            { upsert: true, new: true }
        );

        res.status(201).json({ id: garage._id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création des informations initiales', error });
    }
});

app.post('/api/prestations', async (req, res) => {
    const { userId, compétances, methodesPaiement } = req.body;
    try {
        const garage = await Garage.findOneAndUpdate(
            { userId },
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

app.post('/api/marques', async (req, res) => {
    const { userId, Spécialités } = req.body;
    try {
        const garage = await Garage.findOneAndUpdate(
            { userId },
            { Spécialités: Spécialités.join(',') },
            { upsert: true, new: true }
        );

        res.json(garage);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour des Spécialités', error });
    }
});

app.get('/brands', async (req, res) => {
    try {
        const brands = await getCarBrands();
        res.json(brands);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

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