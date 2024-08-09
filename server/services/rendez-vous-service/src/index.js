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
app.use('/api', require('./routes/planningRoutes'));  // Register planning routes
app.use('/api/planning', require('./routes/planningRoutes'));
app.use('/api/planning', require('./routes/planningRoutes'));


// Start server
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => console.log(`Search Service running on port ${PORT}`));
