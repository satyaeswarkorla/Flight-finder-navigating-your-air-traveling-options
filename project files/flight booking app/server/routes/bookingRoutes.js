const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, bookingController.createBooking);
router.put('/:id/cancel', authMiddleware, bookingController.cancelBooking);

module.exports = router;