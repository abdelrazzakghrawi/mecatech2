require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const path = require('path');

const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
// Serve static files
app.use('/garage_images', express.static(path.join(__dirname, 'garage_images')));
// Routes
app.use('/api/auto', require('./routes/autoRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/prestations', require('./routes/prestationsRoutes')); 
app.use('/api/villequartier', require('./routes/villeQuartierRoutes')); // Registering the new routes

// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Search Service running on port ${PORT}`));
