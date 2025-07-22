import React, { useState } from "react";
import FeedbackModal from "./FeedbackModal";

// Dummy flights data for demo
const dummyFlights = [
  {
    _id: "1",
    flightNumber: "QR641",
    departure: "Doha",
    arrival: "London",
    date: "2024-08-25",
    time: "09:30",
    price: 890,
  },
  {
    _id: "2",
    flightNumber: "QR900",
    departure: "Sydney",
    arrival: "Doha",
    date: "2024-09-02",
    time: "16:50",
    price: 1045,
  },
  {
    _id: "3",
    flightNumber: "QR301",
    departure: "Paris",
    arrival: "Doha",
    date: "2024-08-29",
    time: "20:15",
    price: 760,
  },
  {
    _id: "4",
    flightNumber: "QR808",
    departure: "Tokyo",
    arrival: "Doha",
    date: "2024-09-04",
    time: "07:40",
    price: 1300,
  }
];

function FlightList({ isLoggedIn, onShowLogin, userEmail }) {
  const [flights] = useState(dummyFlights);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const openFeedback = (flight) => {
    setSelectedFlight(flight);
    setShowFeedback(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-8 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 mt-10">
        <h2 className="text-2xl font-bold mb-6 text-[#7b2ff2]">Available Flights</h2>
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[#7b2ff2] font-semibold">
              <th>Flight No</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              {isLoggedIn && <th>Feedback</th>}
            </tr>
          </thead>
          <tbody>
            {flights.map((f) => (
              <tr key={f._id} className="bg-[#f6f3fa] rounded-xl">
                <td className="py-2 px-3">{f.flightNumber}</td>
                <td className="py-2 px-3">{f.departure}</td>
                <td className="py-2 px-3">{f.arrival}</td>
                <td className="py-2 px-3">{f.date}</td>
                <td className="py-2 px-3">{f.time}</td>
                <td className="py-2 px-3">${f.price}</td>
                {isLoggedIn && (
                  <td className="py-2 px-3">
                    <button
                      className="bg-[#7b2ff2] text-white px-4 py-1 rounded-lg text-sm hover:bg-[#51267b]"
                      onClick={() => openFeedback(f)}
                    >
                      Give Feedback
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {!isLoggedIn && (
          <div className="mt-6 text-center">
            <p className="text-[#f357a8]">Login to see full flight details and give feedback.</p>
            <button
              onClick={onShowLogin}
              className="mt-2 bg-[#7b2ff2] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#51267b]"
            >
              Login
            </button>
          </div>
        )}
      </div>
      <FeedbackModal
        show={showFeedback}
        onClose={() => setShowFeedback(false)}
        flight={selectedFlight || {}}
        userEmail={userEmail}
      />
    </div>
  );
}

export default FlightList;
