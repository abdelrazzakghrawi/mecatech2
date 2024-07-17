require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/search', require('./routes/searchRoutes'));

// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Search Service running on port ${PORT}`));
