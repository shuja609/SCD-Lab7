const express = require('express');
const router = express.Router();
const {
  createCar,
  getCar,
  updateCarAvailability
} = require('../controller/carController');

router.post('/', createCar);
router.get('/:carId', getCar);
router.put('/:carId', updateCarAvailability);

module.exports = router;