import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SearchFlights.css'; // Create this for styling

export default function SearchFlights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:5000/api/flights');
      setFlights(res.data);
    } catch (err) {
      setError('Failed to fetch flights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-flights-container">
      <h2>Search Flights</h2>

      <button onClick={search} className="search-btn" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p className="error">{error}</p>}

      <div className="flights-list">
        {flights.length > 0 ? (
          flights.map((f) => (
            <div key={f._id} className="flight-card">
              <p><strong>{f.flightName}</strong> (ID: {f.flightId})</p>
              <p>{f.from} ➝ {f.to}</p>
              <p>Departure: {f.departureTime} | Arrival: {f.arrivalTime}</p>
              <p>Seats: {f.totalSeats} | Price: ₹{f.basePrice}</p>
            </div>
          ))
        ) : (
          !loading && <p>No flights to display. Click "Search" to begin.</p>
        )}
      </div>
    </div>
  );
}
