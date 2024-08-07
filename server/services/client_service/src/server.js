const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Charger les variables d'environnement
dotenv.config();

// Connecter à la base de données
connectDB();

// Préparer pour le changement de strictQuery
mongoose.set('strictQuery', true);

// Créer l'application Express
const app = express();

// Configurer CORS
app.use(cors());

// Middleware pour analyser les corps de requêtes JSON
app.use(express.json());

// Vérifiez si le répertoire uploads existe, sinon créez-le
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
}

// Middleware pour servir les fichiers statiques
app.use('/uploads', express.static(uploadsPath));

// Utiliser les routes combinées
app.use('/api', contactRoutes);

// Gestion des erreurs pour les fichiers statiques
app.use((req, res, next) => {
    const filePath = path.join(__dirname, 'uploads', req.url);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).json({ error: 'File not found' });
        } else {
            res.sendFile(filePath);
        }
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
