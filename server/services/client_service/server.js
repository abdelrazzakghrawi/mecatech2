// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const vehicleRoutes = require('./routes/vehicleRoutes');
const contactRoutes = require('./routes/contactRoutes'); // Add this line

dotenv.config();

const app = express();
const port = process.env.PORT || 5007;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api', vehicleRoutes);
app.use('/api', contactRoutes); // Add this line

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
