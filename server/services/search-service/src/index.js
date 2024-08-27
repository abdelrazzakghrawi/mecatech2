require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const path = require('path');

const app = express();

const corsOptions = {
   origin: '*', // For testing, allow all origins
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Serve static files
app.use('/garage_images', express.static(path.join(__dirname, 'garage_images')));
app.use('/meca_images', express.static(path.join(__dirname, 'random_image_meca')));

// Routes
app.use('/api/auto', require('./routes/autoRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/prestations', require('./routes/prestationsRoutes')); 
app.use('/api/villequartier', require('./routes/villeQuartierRoutes'));

// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Search Service running on port ${PORT}`));