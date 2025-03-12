const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl)
  .then(() => console.log('User DB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));