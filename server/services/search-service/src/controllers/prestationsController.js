const Prestations = require('../models/prestationsModel');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Prestations.distinct('Categorie');
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getPrestationsByCategorie = async (req, res) => {
    const { categorie } = req.params;
    try {
        const prestations = await Prestations.find({ Categorie: categorie }, { Prestations: 1, _id: 0 });
        res.status(200).json(prestations);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getAllCategories, getPrestationsByCategorie };
