// /controllers/planningController.js
const Planning = require('../models/planingModel');
const mongoose = require('mongoose');

// Get planning by mecanique_id
const getPlanningByMecaniqueId = async (req, res) => {
    try {
      const { mecanique_id } = req.params;
  
      // Find the planning by mecanique_id (as a string)
      const planning = await Planning.findOne({ mecanique_id });
  
      if (!planning) {
        return res.status(404).json({ message: 'Planning not found' });
      }
  
      // Return the planning data as a JSON response
      res.status(200).json(planning);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
const getAllPlannings = async (req, res) => {
    try {
      // Find all planning documents
      const plannings = await Planning.find();
  
      // Return the list of plannings
      res.status(200).json(plannings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    getAllPlannings,
  getPlanningByMecaniqueId
};
