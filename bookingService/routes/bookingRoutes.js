const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  cancelBooking
} = require('../controller/bookingController');

router.post('/', createBooking);
router.get('/:userId', getUserBookings);
router.delete('/:bookingId', cancelBooking);

module.exports = router;