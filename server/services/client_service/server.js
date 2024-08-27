const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const vehicleRoutes = require('./routes/vehicleRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5007;

// Middlewares
app.use(cors({ origin: '*' }));

app.use(express.json());
app.use('/uploads', express.static('uploads'));


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api', vehicleRoutes);
app.use('/api', contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
