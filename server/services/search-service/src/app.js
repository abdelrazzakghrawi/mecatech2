const express = require('express');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auto', require('./routes/autoRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));




module.exports = app ;