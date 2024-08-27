// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const googleAuthRoutes = require('./routes/googleAuthRoutes'); // Assurez-vous que ce fichier est correctement importé
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');


dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '*', // Remplacez par l'URL de votre frontend si différent
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
    credentials: true
  }));
 
  app.use(express.json({ limit: '10mb' })); // Augmentez la taille selon vos besoins
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(passport.initialize());
require('./utils/passport');

app.use('/api/auth', authRoutes);
app.use('/api/auth/google-login', googleAuthRoutes); 
app.use('/api/auth/google', googleAuthRoutes);// Ajoutez cette ligne pour la route Google
app.use('/api/auth/me',authRoutes);
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));