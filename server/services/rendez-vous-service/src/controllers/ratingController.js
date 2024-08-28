const Rating = require('../models/rating');

const createRating = async (req, res) => {
  try {
    const { reservationId, stars, comment } = req.body;

    const rating = new Rating({
      reservationId,
      stars,
      comment,
    });

    await rating.save();
    res.status(201).json({ message: 'Rating created successfully', rating });
  } catch (error) {
    res.status(500).json({ message: 'Error creating rating', error });
  }
};

module.exports = { 
    createRating
}