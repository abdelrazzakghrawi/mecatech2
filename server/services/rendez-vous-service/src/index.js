require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const path = require('path');





const corsOptions = {
  origin: '*', // For testing, allow all origins
 optionsSuccessStatus: 200
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
app.use('/api', require('./routes/reservationRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));


// Start server
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => console.log(`rendez vous Service running on port ${PORT}`));
