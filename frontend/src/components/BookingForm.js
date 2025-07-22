import React, { useState } from "react";
import API from "../api";

function BookingForm({ flight, onBooked, onCancel }) {
  const [passenger, setPassenger] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/bookings", {
        flightId: flight._id,
        passenger,
      });
      setMessage("Booking successful!");
      onBooked();
    } catch (err) {
      setMessage("Booking failed.");
    }
  };

  if (!flight) return null;

  return (
    <div>
      <h3>Book Flight: {flight.flightNumber}</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={passenger}
          onChange={e => setPassenger(e.target.value)}
          placeholder="Passenger Name"
          required
        /><br />
        <button type="submit">Book</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default BookingForm;
