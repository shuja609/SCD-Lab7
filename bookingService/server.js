const express = require('express');
const mongoose = require('mongoose');
const bookingRoutes=require('./routes/bookingRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl)
  .then(() => console.log('Car db connected'))
  .catch(err => console.error(err));

// Routes
app.use("/api/bookings",bookingRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Booking service running on port ${PORT}`));