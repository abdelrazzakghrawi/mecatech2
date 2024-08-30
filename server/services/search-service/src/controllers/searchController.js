const express = require('express');
const router = express.Router();
const Garage = require('../models/mechanicModel'); // Path to your Mongoose model

const searchMecanique = async (req, res) => {
  try {
    const { car, city, category } = req.query;

    // Prepare the query
    const searchCriteria = {};

    // Match car marque in Spécialités field
    if (car && car.marques) {
      searchCriteria['Spécialités'] = new RegExp(`\\b${car.marques}\\b`, 'i');
    }

    // Match city (Ville) with case-insensitive
    if (city) {
      searchCriteria['Ville'] = new RegExp(`^${city}`, 'i');
    }

    // Match category in compétances field
    if (category && Array.isArray(category)) {
      const categoryCriteria = category.map(cat => new RegExp(`\\b${cat.category}\\b`, 'i'));
      searchCriteria['compétances'] = { $in: categoryCriteria };
    }

    // Fetch results from the database
    const results = await Garage.find(searchCriteria).exec();

    // Send the results in the response
    res.json(results);

  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).send('An error occurred while fetching search results.');
  }
};

const uploadGarageImage = (req, res) => {
  console.log(req.file)

  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }
  
  const imageUrl = `${req.protocol}://${req.get('host')}/garage_images/${req.file.filename}`;
  res.status(200).json({ imageUrl: imageUrl });
};


module.exports = { searchMecanique , uploadGarageImage };
