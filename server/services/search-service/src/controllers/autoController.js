const Auto = require('../models/autoModel');

const getAllMarques = async (req, res) => {
   
    try {
        const marques = await Auto.distinct('Marque');
        res.status(200).json(marques);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getModelsByMarque = async (req, res) => {
    const { marque } = req.params;
    try {
        const models = await Auto.aggregate([
            { $match: { Marque: marque } },
            {
                $group: {
                    _id: { model: "$Nom du modèle", years: "$Années du modèle" },
                    model: { $first: "$Nom du modèle" },
                    years: { $first: "$Années du modèle" }
                }
            },
            {
                $project: {
                    _id: 0,
                    model: "$model",
                    years: "$years"
                }
            }
        ]);
        res.status(200).json(models);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};


const getEngineDetails = async (req, res) => {
    const { marque, model, years } = req.params;
    try {
        const details = await Auto.findOne({ Marque: marque, "Nom du modèle": model, "Années du modèle": years }, { Carburant: 1, "Type moteur": 1, _id: 0 });
        res.status(200).json(details);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getAllMarques, getModelsByMarque, getEngineDetails };
