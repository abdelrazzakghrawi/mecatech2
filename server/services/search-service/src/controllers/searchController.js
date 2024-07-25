const path = require('path');
const Mecanique = require('../models/mechanicModel');

// Function to normalize strings by removing diacritics and special characters
const normalizeString = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\u2019`']/g, '').toLowerCase();
};

const searchMecanique = async (req, res) => {
  const { car, city, category } = req.query;

  let query = [];

  // Search by city
  if (city) {
    query.push({ Ville: { $regex: city, $options: 'i' } });
  }

  // Search by car marques in Spécialités
  if (car && car.marques) {
    query.push({ Spécialités: { $regex: car.marques, $options: 'i' } });
  }

  // Search by category and prestations in compétance
  if (category && Array.isArray(category)) {
    category.forEach(cat => {
      if (cat.category) {
        query.push({ compétance: { $regex: new RegExp(cat.category, 'i') } });
      }
      if (cat.prestations && Array.isArray(cat.prestations)) {
        cat.prestations.forEach(prestation => {
          prestation.split(' ').forEach(word => {
            query.push({ compétance: { $regex: new RegExp(`\\b${word.toLowerCase()}\\b`, 'i') } });
          });
        });
      }
    });
  }

  try {
    // Perform the search query
    const results = await Mecanique.find({
      $and: query.map(condition => ({
        $and: Object.keys(condition).map(key => ({
          [key]: condition[key]
        }))
      }))
    });

    // Normalize Ville and other fields in the results
    const normalizedResults = results.map(result => ({
      ...result._doc,
      Ville: normalizeString(result.Ville),
      Nom_Garage: normalizeString(result['Nom Garage']),
      Spécialités: normalizeString(result.Spécialités),
      compétance: normalizeString(result.compétance),
      Adresse: normalizeString(result.Adresse)
    }));

    // Remove duplicates based on normalized results without _id field
    const seen = new Set();
    const uniqueResults = normalizedResults.filter(result => {
      const normalizedResult = JSON.stringify({
        Ville: result.Ville,
        Nom_Garage: result.Nom_Garage,
        Spécialités: result.Spécialités,
        compétance: result.compétance,
        Adresse: result.Adresse
      });
      return seen.has(normalizedResult) ? false : seen.add(normalizedResult);
    });

    // Construct the full image URL
    const updatedResults = uniqueResults.map(result => {
      const imageUrl = `${req.protocol}://${req.get('host')}/garages_images/${path.basename(result.image_path)}`;
      return {
        ...result,
        imageUrl
      };
    });

    res.json(updatedResults);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while searching' });
  }
};

module.exports = { searchMecanique };
