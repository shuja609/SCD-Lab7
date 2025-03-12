const Booking = require('../model/Booking');
const { userServiceClient, carServiceClient } = require('../utils/apiClient');

exports.createBooking = async (req, res) => {
  try {
  const { userId, carId, startDate, endDate } = req.body;

    // Check user booking limit
    const userResponse = await userServiceClient.get(`/${userId}`);
    if (userResponse.data.activeBookings >= userResponse.data.maxBookings) {
      return res.status(400).json({ error: 'User booking limit reached' });
    }

    // Check car availability
    const carResponse = await carServiceClient.get(`/${carId}`);
    if (!carResponse.data.isAvailable) {
      return res.status(400).json({ error: 'Car not available' });
    }

    // Create booking
    const booking = new Booking({
      userId,
      carId,
      startDate,
      endDate,
      status: 'active'
    });
    await booking.save();

    // Update user and car
    await userServiceClient.put(`/${userId}`, { activeBookings:1});
    await carServiceClient.put(`/${carId}`, { isAvailable: false });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    if (booking.status === 'canceled') {
      return res.status(400).json({ error: 'Booking already canceled' });
    }

    booking.status = 'canceled';
    await booking.save();

    // Update user and car
    await userServiceClient.put(`/${booking.userId}`, { activeBookings: -1 });
    await carServiceClient.put(`/${booking.carId}`, { isAvailable: true });

    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};