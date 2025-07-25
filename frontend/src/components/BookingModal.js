import React, { useState } from "react";
import API from "../api";

const cities = [
  "Doha", "London", "Sydney", "Paris", "Tokyo", "New York", "Singapore"
];

function BookingModal({ show, onClose, userEmail }) {
  const [from, setFrom] = useState("Doha");
  const [to, setTo] = useState("London");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(userEmail || "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setIsSubmitting(true);
    try {
      await API.post("/bookings", {
        from, to, date, passengers, name, email
      });
      setSuccess("Booking successful! Confirmation sent to your email.");
      setTimeout(() => { onClose(); setSuccess(""); }, 2200);
      setFrom("Doha"); setTo("London"); setDate(""); setPassengers(1); setName(""); setEmail(userEmail || "");
    } catch (err) {
      setError("Booking failed. Please try again.");
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg relative animate-fade-in">
        <button className="absolute top-4 right-6 text-3xl text-gray-400 hover:text-gray-800"
          onClick={onClose} aria-label="Close">×</button>
        <h2 className="text-2xl font-extrabold text-[#7b2ff2] mb-2 text-center tracking-tight">Book Your Flight</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-[#7b2ff2] font-semibold">From</label>
              <select className="w-full border rounded-lg px-3 py-2" value={from} onChange={e=>setFrom(e.target.value)} required>
                {cities.filter(c=>c!==to).map(city=>(
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-[#7b2ff2] font-semibold">To</label>
              <select className="w-full border rounded-lg px-3 py-2" value={to} onChange={e=>setTo(e.target.value)} required>
                {cities.filter(c=>c!==from).map(city=>(
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-[#7b2ff2] font-semibold">Date</label>
              <input className="w-full border rounded-lg px-3 py-2"
                type="date" value={date} min={new Date().toISOString().split("T")[0]}
                onChange={e=>setDate(e.target.value)} required />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-[#7b2ff2] font-semibold">Passengers</label>
              <input className="w-full border rounded-lg px-3 py-2" type="number" min={1} max={9}
                value={passengers} onChange={e=>setPassengers(e.target.value)} required />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-[#7b2ff2] font-semibold">Passenger Name</label>
            <input className="w-full border rounded-lg px-3 py-2"
              value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-[#7b2ff2] font-semibold">Email</label>
            <input className="w-full border rounded-lg px-3 py-2"
              type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <button
            className={`w-full py-3 mt-1 text-lg rounded-xl font-bold transition ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#7b2ff2] to-[#38b6ff] text-white hover:scale-105'
            }`}
            type="submit" disabled={isSubmitting}
          >
            {isSubmitting ? "Booking..." : "Book Now"}
          </button>
        </form>
        {success && <div className="mt-4 text-center text-green-600 font-bold">{success}</div>}
        {error && <div className="mt-4 text-center text-red-600 font-bold">{error}</div>}
      </div>
      {/* fade-in animation */}
      <style>{`
        .animate-fade-in { animation: fade-in 0.35s cubic-bezier(.42,0,.58,1); }
        @keyframes fade-in { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}

export default BookingModal;

