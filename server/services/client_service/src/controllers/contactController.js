const mongoose = require('mongoose');
const { InfoClient, InfoContact } = require('../models/Contact');

// Fonction pour créer un client
exports.createClient = async (req, res) => {
    try {
        if (req.file && req.file.size > 10 * 1024 * 1024) {
            return res.status(400).json({ error: 'Le fichier est trop volumineux' });
        }

        const validateTextField = (field) => field && field.length <= 1000;

        const { nom, prenom, telephone, message } = req.body;
        if (!validateTextField(nom) || !validateTextField(prenom) || !validateTextField(telephone) || !validateTextField(message)) {
            return res.status(400).json({ error: 'Un ou plusieurs champs de texte sont trop longs' });
        }

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const newClient = new InfoClient({ nom, prenom, telephone, message, imageUrl });
        const result = await newClient.save();
        console.log('Nouveau client créé:', result); // Ajouté
        res.status(201).json(result);
    } catch (err) {
        console.error('Erreur lors de la création du client:', err.message);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

// Fonction pour mettre à jour un client
exports.updateClient = async (req, res) => {
    try {
        if (req.file && req.file.size > 10 * 1024 * 1024) {
            return res.status(400).json({ error: 'Le fichier est trop volumineux' });
        }

        const validateTextField = (field) => field && field.length <= 1000;

        const { nom, prenom, telephone, message } = req.body;
        const { id } = req.params;
        console.log('ID reçu:', id); // Ajouté
        if (!validateTextField(nom) || !validateTextField(prenom) || !validateTextField(telephone) || !validateTextField(message)) {
            return res.status(400).json({ error: 'Un ou plusieurs champs de texte sont trop longs' });
        }

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID invalide' });
        }

        const client = await InfoClient.findById(id);
        if (!client) {
            return res.status(404).json({ message: 'Client non trouvé' });
        }

        const updateData = {
            nom,
            prenom,
            telephone,
            message,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : client.imageUrl // Conserve l'ancienne image si aucune nouvelle image n'est téléchargée
        };

        const result = await InfoClient.findByIdAndUpdate(id, updateData, { new: true });
        console.log('Client mis à jour:', result); // Ajouté
        res.status(200).json(result);
    } catch (err) {
        console.error('Erreur lors de la mise à jour du client:', err.message);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

// Fonction pour créer un contact
exports.createContact = async (req, res) => {
    try {
        if (req.file && req.file.size > 10 * 1024 * 1024) {
            return res.status(400).json({ error: 'Le fichier est trop volumineux' });
        }

        const validateTextField = (field) => field && field.length <= 1000;

        const { nom, prenom, telephone, message } = req.body;
        if (!validateTextField(nom) || !validateTextField(prenom) || !validateTextField(telephone) || !validateTextField(message)) {
            return res.status(400).json({ error: 'Un ou plusieurs champs de texte sont trop longs' });
        }

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const newContact = new InfoContact({ nom, prenom, telephone, message, imageUrl });
        const result = await newContact.save();
        console.log('Nouveau contact créé:', result); // Ajouté
        res.status(201).json(result);
    } catch (err) {
        console.error('Erreur lors de la création du contact:', err.message);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

// Fonction pour mettre à jour un contact
exports.updateContact = async (req, res) => {
    try {
        if (req.file && req.file.size > 10 * 1024 * 1024) {
            return res.status(400).json({ error: 'Le fichier est trop volumineux' });
        }

        const validateTextField = (field) => field && field.length <= 1000;

        const { nom, prenom, telephone, message } = req.body;
        const { id } = req.params;
        console.log('ID reçu:', id); // Ajouté
        if (!validateTextField(nom) || !validateTextField(prenom) || !validateTextField(telephone) || !validateTextField(message)) {
            return res.status(400).json({ error: 'Un ou plusieurs champs de texte sont trop longs' });
        }

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID invalide' });
        }

        const contact = await InfoContact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }

        const updateData = {
            nom,
            prenom,
            telephone,
            message,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : contact.imageUrl // Conserve l'ancienne image si aucune nouvelle image n'est téléchargée
        };

        const result = await InfoContact.findByIdAndUpdate(id, updateData, { new: true });
        console.log('Contact mis à jour:', result); // Ajouté
        res.status(200).json(result);
    } catch (err) {
        console.error('Erreur lors de la mise à jour du contact:', err.message);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

// Fonction pour obtenir tous les clients
exports.getClients = async (req, res) => {
    try {
        const clients = await InfoClient.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour obtenir un client par ID
exports.getClientById = async (req, res) => {
    try {
        const client = await InfoClient.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client non trouvé' });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour obtenir tous les contacts
exports.getContacts = async (req, res) => {
    try {
        const contacts = await InfoContact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
