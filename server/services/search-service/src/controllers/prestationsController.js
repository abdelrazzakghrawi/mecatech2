const Prestations = require('../models/prestationsModel');

const getAllCategoriesAndPrestations = async (req, res) => {
  try {
    const prestations = await Prestations.find();
    
    if (prestations.length === 0) {
      return res.status(404).json({ message: 'No categories and prestations found' });
    }

    // Extract and structure data
    const structuredData = prestations.map(prestation => {
      const { _id, ...categoriesAndPrestations } = prestation._doc;
      return categoriesAndPrestations;
    });

    res.status(200).json(structuredData);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getAllCategoriesAndPrestations };
