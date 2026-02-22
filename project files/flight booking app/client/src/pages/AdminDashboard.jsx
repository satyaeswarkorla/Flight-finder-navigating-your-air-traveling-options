import React from 'react';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const stats = {
    users: 6,
    bookings: 7,
    flights: 6,
  };

  const users = [
    { _id: '64e5fcb298f1c5aa0a36c2a7', username: 'hola', email: 'hola@gmail.com' },
    { _id: '64e9d2e0f7964122dbe8d098', username: 'alex', email: 'alex@gmail.com' },
  ];

  const operators = [
    { _id: '64e8ca302bb50798fe630779', flightName: 'spicejet', email: 'spicejet@gmail.com' },
    { _id: '64e8d11154e48a90d1c0f26b', flightName: 'indigo', email: 'indigo@gmail.com' },
    { _id: '64e9d38e5d17bcbf3a78a58a', flightName: 'Air Vistara', email: 'vistara@gmail.com' },
  ];

  const bookings = [
    {
      bookingId: '64e6c3c4622709484005484',
      mobile: '7669678988',
      email: 'harsha@gmail.com',
      flightId: 'cn12321',
      flightName: 'Indigo',
      boarding: 'Chennai',
      destination: 'Bangalore',
      passengers: [
        { name: 'Alex', age: 44, seat: 'B-1' },
        { name: 'Snyder', age: 55, seat: 'B-2' },
      ],
      bookingDate: '2023-08-28',
      journeyDate: '2023-08-31',
      journeyTime: '18:40',
      totalPrice: 7200,
      status: 'confirmed',
    },
  ];

  const handleCancelBooking = (bookingId) => {
    alert(`Cancel booking for ID: ${bookingId}`);
    // Here you'd call your API to cancel the booking
  };

  return (
    <div className="admin-container">
      <h1>SB Flights (Admin)</h1>

      <div className="stats-container">
        {Object.entries(stats).map(([key, value]) => (
          <div className="stat-card" key={key}>
            <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
            <p>{value}</p>
            <button>View all</button>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>New Operator Applications</h2>
        <p>No new requests.</p>
      </div>

      <div className="section">
        <h2>All Users</h2>
        {users.map(user => (
          <div key={user._id} className="user-card">
            <p><strong>User ID:</strong> {user._id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <hr />
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Flight Operators</h2>
        {operators.map(op => (
          <div key={op._id} className="operator-card">
            <p><strong>Operator ID:</strong> {op._id}</p>
            <p><strong>Flight Name:</strong> {op.flightName}</p>
            <p><strong>Email:</strong> {op.email}</p>
            <hr />
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Bookings</h2>
        {bookings.map(booking => (
          <div key={booking.bookingId} className="booking-card">
            <p><strong>Booking ID:</strong> {booking.bookingId}</p>
            <p><strong>Mobile:</strong> {booking.mobile}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Flight ID:</strong> {booking.flightId}</p>
            <p><strong>Flight Name:</strong> {booking.flightName}</p>
            <p><strong>Boarding:</strong> {booking.boarding}</p>
            <p><strong>Destination:</strong> {booking.destination}</p>
            <p><strong>Passengers:</strong></p>
            <ul>
              {booking.passengers.map((p, index) => (
                <li key={index}>{p.name}, Age: {p.age}, Seat: {p.seat}</li>
              ))}
            </ul>
            <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
            <p><strong>Journey Date:</strong> {booking.journeyDate}</p>
            <p><strong>Journey Time:</strong> {booking.journeyTime}</p>
            <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            {booking.status === 'confirmed' && (
              <button
                className="cancel-btn"
                onClick={() => handleCancelBooking(booking.bookingId)}
              >
                Cancel Ticket
              </button>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
