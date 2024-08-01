const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const contactController = require('../controllers/contactController');

// Configuration de Multer pour les fichiers uploadés
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
        fieldSize: 10 * 1024 * 1024
    }
});

// Routes pour les clients
router.post('/client', upload.single('image'), contactController.createClient);
router.put('/client/:id', upload.single('image'), contactController.updateClient); // Changement ici
router.get('/client', contactController.getClients);
router.get('/client/:id', contactController.getClientById);

// Routes pour les contacts
router.post('/contact', upload.single('image'), contactController.createContact);
router.put('/contact/:id', upload.single('image'), contactController.updateContact); // Changement ici
router.get('/contact', contactController.getContacts);

module.exports = router;
