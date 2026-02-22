const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'operator', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const FlightSchema = new mongoose.Schema({
  flightId: { type: String, required: true, unique: true },
  flightName: { type: String, required: true },
  departureCity: { type: String, required: true },
  destinationCity: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  basePrice: { type: Number, required: true },
  operator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  passengers: [{
    name: { type: String, required: true },
    age: { type: Number, required: true },
    seat: { type: String }
  }],
  journeyDate: { type: Date, required: true },
  bookingDate: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  Flight: mongoose.model('Flight', FlightSchema),
  Booking: mongoose.model('Booking', BookingSchema)
};