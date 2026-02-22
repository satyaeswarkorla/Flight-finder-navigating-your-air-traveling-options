const Flight = require('../models/Flight');

exports.createFlight = async (req, res) => {
  try {
    const flight = new Flight({ ...req.body, operator: req.user.id });
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchFlights = async (req, res) => {
  try {
    const { departureCity, destinationCity, journeyDate } = req.query;
    const flights = await Flight.find({
      departureCity,
      destinationCity,
      departureTime: { $gte: new Date(journeyDate) }
    });
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};