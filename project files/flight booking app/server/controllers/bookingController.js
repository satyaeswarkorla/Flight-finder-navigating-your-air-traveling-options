const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

exports.createBooking = async (req, res) => {
  try {
    const { flightId, passengers, journeyDate, mobile, email } = req.body;
    const flight = await Flight.findById(flightId);
    
    if (!flight || flight.availableSeats < passengers.length) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }
    
    const totalPrice = passengers.length * flight.basePrice;
    const booking = new Booking({
      bookingId: generateBookingId(),
      user: req.user.id,
      flight: flightId,
      passengers,
      journeyDate,
      totalPrice,
      mobile,
      email
    });
    
    flight.availableSeats -= passengers.length;
    await flight.save();
    await booking.save();
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const flight = await Flight.findById(booking.flight);
    flight.availableSeats += booking.passengers.length;
    await flight.save();
    
    booking.status = 'cancelled';
    await booking.save();
    
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function generateBookingId() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36).substring(4);
}