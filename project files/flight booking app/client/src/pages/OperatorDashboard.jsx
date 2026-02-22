import React, { useState } from 'react';
import axios from 'axios';
import '../styles/OperatorDashboard.css';

const OperatorDashboard = () => {
  const [stats, setStats] = useState({
    bookings: 4,
    flights: 2,
  });

  const [showAddFlight, setShowAddFlight] = useState(false);
  const [newFlight, setNewFlight] = useState({
    flightName: '',
    flightId: '',
    departureCity: '',
    destinationCity: '',
    departureTime: '',
    arrivalTime: '',
    totalSeats: '',
    basePrice: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddFlight = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (newFlight.departureCity === newFlight.destinationCity) {
      setError('Departure and Destination cannot be the same.');
      return;
    }

    try {
      setError('');
      setMessage('Adding flight...');

      // Optional: Replace with your API call
      // await axios.post('http://localhost:5000/api/flights', newFlight);

      setStats((prev) => ({ ...prev, flights: prev.flights + 1 }));

      setMessage('Flight added successfully!');
      setTimeout(() => setMessage(''), 3000);

      setNewFlight({
        flightName: '',
        flightId: '',
        departureCity: '',
        destinationCity: '',
        departureTime: '',
        arrivalTime: '',
        totalSeats: '',
        basePrice: '',
      });
      setShowAddFlight(false);
    } catch (err) {
      setError('Failed to add flight.');
    }
  };

  return (
    <div className="operator-container">
      <div className="header">
        <h1>SB Flights (Operator)</h1>
        <nav>
          <button>Home</button>
          <button>Bookings</button>
          <button>Flights</button>
          <button onClick={() => setShowAddFlight(true)}>Add Flight</button>
          <button>Logout</button>
        </nav>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Bookings</h3>
          <p>{stats.bookings}</p>
          <button>View all</button>
        </div>

        <div className="stat-card">
          <h3>Flights</h3>
          <p>{stats.flights}</p>
          <button>View all</button>
        </div>
      </div>

      {showAddFlight && (
        <div className="add-flight-form">
          <h2>Add New Flight</h2>
          {message && <p className="success-msg">{message}</p>}
          {error && <p className="error-msg">{error}</p>}

          <form onSubmit={handleAddFlight}>
            <div className="form-group">
              <label>Flight Name</label>
              <input
                type="text"
                value={newFlight.flightName}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, flightName: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Flight ID</label>
              <input
                type="text"
                value={newFlight.flightId}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, flightId: e.target.value })
                }
                required
              />
            </div>

            <div className="flight-details">
              <div className="form-group">
                <label>Departure City</label>
                <select
                  value={newFlight.departureCity}
                  onChange={(e) =>
                    setNewFlight({
                      ...newFlight,
                      departureCity: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>

              <div className="form-group">
                <label>Departure Time</label>
                <input
                  type="time"
                  value={newFlight.departureTime}
                  onChange={(e) =>
                    setNewFlight({
                      ...newFlight,
                      departureTime: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Destination City</label>
                <select
                  value={newFlight.destinationCity}
                  onChange={(e) =>
                    setNewFlight({
                      ...newFlight,
                      destinationCity: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>

              <div className="form-group">
                <label>Arrival Time</label>
                <input
                  type="time"
                  value={newFlight.arrivalTime}
                  onChange={(e) =>
                    setNewFlight({ ...newFlight, arrivalTime: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Total Seats</label>
              <input
                type="number"
                min="1"
                value={newFlight.totalSeats}
                onChange={(e) =>
                  setNewFlight({
                    ...newFlight,
                    totalSeats: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Base Price</label>
              <input
                type="number"
                min="0"
                value={newFlight.basePrice}
                onChange={(e) =>
                  setNewFlight({
                    ...newFlight,
                    basePrice: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>

            <button type="submit" className="add-btn">
              Add Now
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default OperatorDashboard;
