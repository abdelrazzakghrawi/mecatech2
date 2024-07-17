const Mechanic = require('../models/mechanicModel');

const searchMechanics = async (req, res) => {
    const { location, services, vehicleType } = req.query;

    try {
        let query = {};

        if (location) {
            query.Ville = location;
        }

        if (services) {
            query.compétance =  services;
        }

        if (vehicleType) {
            const vehicleTypes = vehicleType.split(',').map(type => type.trim());
            query.Spécialités = { $regex: vehicleTypes.join('|'), $options: 'i' }; // Regex to match any vehicle type
        }
        console.log(query)
        const mechanics = await Mechanic.find(query);
        res.status(200).json(mechanics); // Return the found documents
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { searchMechanics };
