const express = require('express');
const router = express.Router();
const {
  createUser,
  getUser,
  updateUserBookings
} = require('../controller/userController');

router.post('/', createUser);
router.get('/:userId', getUser);
router.put('/:userId', updateUserBookings);

module.exports = router;