// App.jsx (Advanced Flight Booking App with Separate Dashboard, Animations and Features)
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [page, setPage] = useState('home');
  const [form, setForm] = useState({
    email: '', password: '', from: '', to: '', departure: '', return: '',
    passengers: 1, travelClass: 'Economy'
  });
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [flightResults, setFlightResults] = useState([]);
  const [bookedFlights, setBookedFlights] = useState(() => JSON.parse(localStorage.getItem('bookedFlights')) || []);
  const [latestFlights, setLatestFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const maxSeats = parseInt(form.passengers);

  useEffect(() => {
    if (user) setPage('dashboard');
    fetchLatestFlights();
  }, [user]);

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAuth = () => {
    if (form.email && form.password) {
      const newUser = { name: form.email.split('@')[0], email: form.email, memberSince: '2025' };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setPage('dashboard');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setPage('home');
  };

  const handleSearchFlights = () => {
    if (!form.from || !form.to || !form.departure) return;
    setLoading(true);
    setTimeout(() => {
      setFlightResults([
        { from: form.from, to: form.to, date: form.departure, time: '10:30 AM', flightNo: 'AW123', country: 'USA' },
        { from: form.from, to: form.to, date: form.departure, time: '3:15 PM', flightNo: 'AW456', country: 'UK' },
        { from: form.from, to: form.to, date: form.departure, time: '8:00 PM', flightNo: 'AW789', country: 'India' },
      ]);
      setLoading(false);
      setPage('seats');
    }, 1000);
  };

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = () => {
    const newBookings = [
      ...bookedFlights,
      { ...form, seats: selectedSeats, date: form.departure, flight: flightResults[0].flightNo }
    ];
    setBookedFlights(newBookings);
    localStorage.setItem('bookedFlights', JSON.stringify(newBookings));
    setPage('dashboard');
  };

  const fetchLatestFlights = () => {
    setLatestFlights([
      { route: 'Delhi - Paris', airline: 'Air France', time: '07:00 AM' },
      { route: 'NYC - Tokyo', airline: 'ANA', time: '11:30 PM' },
      { route: 'Dubai - London', airline: 'Emirates', time: '04:45 PM' },
    ]);
  };

  const SeatMap = () => (
    <div className="seat-map slide-in">
      <h3>Select Seats ({selectedSeats.length}/{maxSeats})</h3>
      <div className="seats">
        {[...Array(6)].map((_, rowIdx) => (
          <div key={rowIdx} className="row">
            {[...Array(6)].map((_, colIdx) => {
              const seatId = `${rowIdx}-${colIdx}`;
              const isBooked = (rowIdx + colIdx) % 7 === 0;
              const isSelected = selectedSeats.includes(seatId);
              return (
                <div
                  key={seatId}
                  className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
                  onClick={() => !isBooked && toggleSeat(seatId)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="app fade-in">
      {page === 'home' && (
        <div className="screen home">
          <h1 className="brand">✈ Airways</h1>
          <p className="tagline">Explore the skies with style and speed.</p>
          {user ? (
            <button onClick={() => setPage('dashboard')}>Welcome back, {user.name}</button>
          ) : (
            <div className="auth-buttons">
              <button onClick={() => setPage('login')}>Log In</button>
              <button onClick={() => setPage('signup')}>Sign Up</button>
            </div>
          )}
        </div>
      )}

      {(page === 'login' || page === 'signup') && (
        <div className="screen login">
          <h2>{page === 'login' ? 'Log In' : 'Sign Up'}</h2>
          <input name="email" placeholder="Email" onChange={handleInput} />
          <input name="password" type="password" placeholder="Password" onChange={handleInput} />
          <button onClick={handleAuth}>{page === 'login' ? 'Log In' : 'Create Account'}</button>
          <button onClick={() => setPage('home')}>⬅ Back</button>
        </div>
      )}

      {page === 'dashboard' && (
        <div className="screen dashboard slide-up">
          <nav className="sidebar">
            <h3>Dashboard</h3>
            <button onClick={() => setPage('profile')}>Profile</button>
            <button onClick={() => setPage('latest')}>Latest Flights</button>
            <button onClick={() => setPage('bookings')}>My Bookings</button>
            <button onClick={() => setPage('search')}>Book Flight</button>
            <button onClick={logout}>Logout</button>
          </nav>
          <div className="main-panel">
            <h2>Welcome, {user?.name}</h2>
            <p>Use the sidebar to explore the features of your flight dashboard.</p>
          </div>
        </div>
      )}

      {page === 'profile' && (
        <div className="screen profile slide-in">
          <h2>User Profile</h2>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Member Since:</strong> {user?.memberSince}</p>
          <button onClick={() => setPage('dashboard')}>⬅ Back</button>
        </div>
      )}

      {page === 'latest' && (
        <div className="screen latest-flights fade-in">
          <h2>Latest Flight Updates</h2>
          <ul>
            {latestFlights.map((f, i) => (
              <li key={i}><strong>{f.route}</strong> - {f.airline} @ {f.time}</li>
            ))}
          </ul>
          <button onClick={() => setPage('dashboard')}>⬅ Back</button>
        </div>
      )}

      {page === 'bookings' && (
        <div className="screen bookings slide-in">
          <h2>Your Booked Flights</h2>
          <ul>
            {bookedFlights.map((b, i) => (
              <li key={i}>{b.from} ➔ {b.to} - {b.date} | Seats: {b.seats.join(', ')}</li>
            ))}
          </ul>
          <button onClick={() => setPage('dashboard')}>⬅ Back</button>
        </div>
      )}

      {page === 'search' && (
        <div className="screen search fade-in">
          <h2>Search Flights</h2>
          <input name="from" placeholder="From (e.g. JFK)" onChange={handleInput} />
          <input name="to" placeholder="To (e.g. LAX)" onChange={handleInput} />
          <input type="date" name="departure" onChange={handleInput} />
          <input type="date" name="return" onChange={handleInput} />
          <input type="number" name="passengers" min="1" value={form.passengers} onChange={handleInput} />
          <select name="travelClass" onChange={handleInput}>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First Class</option>
          </select>
          <button onClick={handleSearchFlights}>Search Flights</button>
          {loading && <p>Loading flights...</p>}
          <button onClick={() => setPage('dashboard')}>⬅ Back</button>
        </div>
      )}

      {page === 'seats' && (
        <div className="screen seats slide-up">
          <h3>Available Flights</h3>
          <ul className="flight-list">
            {flightResults.map((flight, index) => (
              <li key={index} className="flight-item">
                <strong>{flight.flightNo}</strong>: {flight.from} ➔ {flight.to} - {flight.date} @ {flight.time} <em>({flight.country})</em>
              </li>
            ))}
          </ul>
          <SeatMap />
          <button
            disabled={selectedSeats.length !== maxSeats}
            onClick={handleBooking}
            className="confirm-btn"
          >
            Confirm & Finish
          </button>
          <button onClick={() => setPage('search')}>⬅ Back</button>
        </div>
      )}
    </div>
  );
};

export default App;