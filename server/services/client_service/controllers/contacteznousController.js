const axios = require('axios');
const Contact = require('../models/Contact');

// Soumettre le formulaire de contact
const submitContactForm = async (req, res) => {
    try {
      const { sujet, message } = req.body;
  
      // Créer un nouveau document de contact
      const contact = new Contact({
        sujet,
        message,
      });
  
      // Sauvegarder dans la base de données
      await contact.save();
  
      res.status(201).json({ message: 'Message reçu avec succès.' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      res.status(400).json({ error: 'Erreur lors de l\'envoi du message.' });
    }
  };

  module.exports = {submitContactForm,};