const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightId: { type: String, required: true, unique: true },
  flightName: { type: String, required: true },
  departureCity: { type: String, required: true },
  destinationCity: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  basePrice: { type: Number, required: true },
  operator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Flight', flightSchema);