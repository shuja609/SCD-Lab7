const express = require('express');
const mongoose = require('mongoose');
const carRoutes= require('./routes/carRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl)
  .then(() => console.log('Car db connected'))
  .catch(err => console.error(err));

// Routes
app.use("/api/cars",carRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Car service running on port ${PORT}`));