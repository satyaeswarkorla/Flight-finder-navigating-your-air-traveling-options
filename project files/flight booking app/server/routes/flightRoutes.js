const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, flightController.createFlight);
router.get('/', flightController.getAllFlights);
router.get('/search', flightController.searchFlights);

module.exports = router;