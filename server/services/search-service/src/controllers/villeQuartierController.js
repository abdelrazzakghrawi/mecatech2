const VilleQuartier = require('../models/villeQuartierModel');

const getAllVilles = async (req, res) => {
    try {
        const villes = await VilleQuartier.distinct('VILLE');
        res.status(200).json(villes);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getQuartiersByVille = async (req, res) => {
    const { ville } = req.params;
    try {
        const quartiers = await VilleQuartier.find({ VILLE: ville }, { QUARTIER: 1, _id: 0 });
        res.status(200).json(quartiers);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getAllVilles, getQuartiersByVille };
