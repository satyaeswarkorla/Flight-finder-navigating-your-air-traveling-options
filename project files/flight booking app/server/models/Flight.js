const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  from: String,
  to: String,
  departureDate: Date,
  returnDate: Date,
  passengers: Number,
  travelClass: String,
  seats: [
    {
      seatNumber: String,
      isBooked: Boolean
    }
  ]
});

module.exports = mongoose.model('Flight', FlightSchema);
