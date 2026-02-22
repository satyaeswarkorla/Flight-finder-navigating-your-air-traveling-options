import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/UserBookings.css';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStart, setFilterStart] = useState('');
  const [filterEnd, setFilterEnd] = useState('');
  const [sortBy, setSortBy] = useState(''); // options: 'price', 'date'
  const [confirmId, setConfirmId] = useState(null);

  // Dummy download handler
  const handleDownload = (bookingId) => {
    alert(`Downloading ticket for booking ${bookingId}...`);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/bookings/my-bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(response.data);
        setFiltered(response.data);
      } catch (error) {
        setError('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Combine all filters and sorting
  useEffect(() => {
    let temp = [...bookings];

    // Filter by search term (flight name)
    if (searchTerm) {
      temp = temp.filter(b =>
        b.flight.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range if provided
    if (filterStart) {
      const start = new Date(filterStart).getTime();
      temp = temp.filter(b => new Date(b.journeyDate).getTime() >= start);
    }
    if (filterEnd) {
      const end = new Date(filterEnd).getTime();
      temp = temp.filter(b => new Date(b.journeyDate).getTime() <= end);
    }

    // Sort by selected criteria
    if (sortBy === 'price') {
      temp.sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (sortBy === 'date') {
      temp.sort((a, b) => new Date(a.journeyDate) - new Date(b.journeyDate));
    }

    setFiltered(temp);
  }, [bookings, searchTerm, filterStart, filterEnd, sortBy]);

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/bookings/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
      setFiltered(prev => prev.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
      setConfirmId(null);
    } catch (err) {
      alert('Cancellation failed.');
    }
  };

  return (
    <div className="bookings-container">
      <h1>My Bookings</h1>

      {error && <p className="error">{error}</p>}

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by flight name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="date-filters">
          <label>
            Start Date:
            <input
              type="date"
              value={filterStart}
              onChange={(e) => setFilterStart(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={filterEnd}
              onChange={(e) => setFilterEnd(e.target.value)}
            />
          </label>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="date">Journey Date</option>
        </select>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : filtered.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <div className="bookings-list">
          <AnimatePresence>
            {filtered.map(booking => (
              <motion.div
                key={booking._id}
                className="booking-card wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3>{booking.flight.name} - {booking.flight.number}</h3>
                <p><strong>From:</strong> {booking.flight.departureCity}</p>
                <p><strong>To:</strong> {booking.flight.destinationCity}</p>
                <p>
                  <strong>Date:</strong> {new Date(booking.journeyDate).toLocaleDateString()}
                </p>
                <p><strong>Time:</strong> {booking.flight.departureTime}</p>
                <p><strong>Passengers:</strong> {booking.passengers.length}</p>
                <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
                <p>
                  <strong>Status:</strong> 
                  <span className={`status ${booking.status}`}>
                    {booking.status}
                  </span>
                </p>
                <div className="actions">
                  {booking.status === 'confirmed' && (
                    <>
                      <button
                        onClick={() => setConfirmId(booking._id)}
                        className="cancel-btn"
                      >
                        Cancel Booking
                      </button>

                      {confirmId === booking._id && (
                        <div className="confirm-box">
                          <p>Are you sure?</p>
                          <button onClick={() => handleCancel(booking._id)} className="yes">Yes</button>
                          <button onClick={() => setConfirmId(null)} className="no">No</button>
                        </div>
                      )}
                    </>
                  )}
                  <button onClick={() => handleDownload(booking._id)} className="download-btn">
                    Download Ticket
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default UserBookings;
