const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

router.get('/', async (req, res) => {
  const flights = await Flight.find();
  res.json(flights);
});

router.post('/', async (req, res) => {
  const flight = new Flight(req.body);
  await flight.save();
  res.json(flight);
});

module.exports = router;
