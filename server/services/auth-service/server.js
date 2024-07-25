const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes'); // Nous utilisons maintenant un seul fichier de routes
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
require('./utils/passport');

app.use('/api/auth', authRoutes); // Utilisation du fichier de routes combiné

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
