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
  const createPlanning = async (req, res) => {
    try {
      const { mecanique_id, jours_travail, horaires, max_clients_par_jour, indisponibilites } = req.body;
  
      // Create a new planning document
      const newPlanning = new Planning({
        mecanique_id,
        jours_travail,
        horaires,
        max_clients_par_jour,
        indisponibilites
      });
  
      // Save the planning document to the database
      const savedPlanning = await newPlanning.save();
  
      // Return the saved planning data
      res.status(201).json(savedPlanning);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const updatePlanning = async (req, res) => {
    try {
      const { mecanique_id } = req.params;
      const updates = req.body;
  
      // Find the planning by mecanique_id and update it
      const updatedPlanning = await Planning.findOneAndUpdate(
        { mecanique_id },
        { $set: updates },
        { new: true, runValidators: true }
      );
  
      if (!updatedPlanning) {
        return res.status(404).json({ message: 'Planning not found' });
      }
  
      // Return the updated planning data
      res.status(200).json(updatedPlanning);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    getAllPlannings,
  getPlanningByMecaniqueId,
  createPlanning ,
  updatePlanning
};
