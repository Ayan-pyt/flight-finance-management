// import React, { useState } from "react";
// import API from "../api";

// const cities = [
//   "Doha", "London", "Sydney", "Paris", "Tokyo", "New York", "Singapore"
// ];

// function BookingModal({ show, onClose, userEmail }) {
//   const [from, setFrom] = useState("Doha");
//   const [to, setTo] = useState("London");
//   const [date, setDate] = useState("");
//   const [passengers, setPassengers] = useState(1);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState(userEmail || "");
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   if (!show) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); setSuccess(""); setIsSubmitting(true);
//     try {
//       await API.post("/bookings", {
//         from, to, date, passengers, name, email
//       });
//       setSuccess("Booking successful! Confirmation sent to your email.");
//       setTimeout(() => { onClose(); setSuccess(""); }, 2200);
//       setFrom("Doha"); setTo("London"); setDate(""); setPassengers(1); setName(""); setEmail(userEmail || "");
//     } catch (err) {
//       setError("Booking failed. Please try again.");
//     } finally { setIsSubmitting(false); }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//       <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg relative animate-fade-in">
//         <button className="absolute top-4 right-6 text-3xl text-gray-400 hover:text-gray-800"
//           onClick={onClose} aria-label="Close">×</button>
//         <h2 className="text-2xl font-extrabold text-[#7b2ff2] mb-2 text-center tracking-tight">Book Your Flight</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
//           <div className="flex gap-4">
//             <div className="flex-1">
//               <label className="block mb-1 text-[#7b2ff2] font-semibold">From</label>
//               <select className="w-full border rounded-lg px-3 py-2" value={from} onChange={e=>setFrom(e.target.value)} required>
//                 {cities.filter(c=>c!==to).map(city=>(
//                   <option key={city} value={city}>{city}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex-1">
//               <label className="block mb-1 text-[#7b2ff2] font-semibold">To</label>
//               <select className="w-full border rounded-lg px-3 py-2" value={to} onChange={e=>setTo(e.target.value)} required>
//                 {cities.filter(c=>c!==from).map(city=>(
//                   <option key={city} value={city}>{city}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="flex gap-4">
//             <div className="flex-1">
//               <label className="block mb-1 text-[#7b2ff2] font-semibold">Date</label>
//               <input className="w-full border rounded-lg px-3 py-2"
//                 type="date" value={date} min={new Date().toISOString().split("T")[0]}
//                 onChange={e=>setDate(e.target.value)} required />
//             </div>
//             <div className="flex-1">
//               <label className="block mb-1 text-[#7b2ff2] font-semibold">Passengers</label>
//               <input className="w-full border rounded-lg px-3 py-2" type="number" min={1} max={9}
//                 value={passengers} onChange={e=>setPassengers(e.target.value)} required />
//             </div>
//           </div>
//           <div>
//             <label className="block mb-1 text-[#7b2ff2] font-semibold">Passenger Name</label>
//             <input className="w-full border rounded-lg px-3 py-2"
//               value={name} onChange={e=>setName(e.target.value)} required />
//           </div>
//           <div>
//             <label className="block mb-1 text-[#7b2ff2] font-semibold">Email</label>
//             <input className="w-full border rounded-lg px-3 py-2"
//               type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
//           </div>
//           <button
//             className={`w-full py-3 mt-1 text-lg rounded-xl font-bold transition ${
//               isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#7b2ff2] to-[#38b6ff] text-white hover:scale-105'
//             }`}
//             type="submit" disabled={isSubmitting}
//           >
//             {isSubmitting ? "Booking..." : "Book Now"}
//           </button>
//         </form>
//         {success && <div className="mt-4 text-center text-green-600 font-bold">{success}</div>}
//         {error && <div className="mt-4 text-center text-red-600 font-bold">{error}</div>}
//       </div>
//       {/* fade-in animation */}
//       <style>{`
//         .animate-fade-in { animation: fade-in 0.35s cubic-bezier(.42,0,.58,1); }
//         @keyframes fade-in { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
//       `}</style>
//     </div>
//   );
// }

// export default BookingModal;



import React, { useState } from 'react';
import API from '../api';
import { X, Users, CreditCard, Smartphone, Banknote, ShieldCheck } from 'lucide-react';

const BookingModal = ({ flight, onClose, onBookingSuccess }) => {
    const [step, setStep] = useState(1); // 1: Passenger Selection, 2: Payment, 3: Confirmation
    const [passengers, setPassengers] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo).token : null;
    };

    const handleProceedToPayment = () => {
        if (passengers > flight.seatsAvailable) {
            setError(`Only ${flight.seatsAvailable} seats are available.`);
            return;
        }
        setError('');
        setStep(2);
    };

    const handleConfirmBooking = async () => {
        if (!paymentMethod) {
            setError("Please select a payment method.");
            return;
        }
        
        setIsProcessing(true);
        setError('');
        const token = getToken();
        
        // Simulate payment processing
        setTimeout(async () => {
            try {
                const bookingDetails = {
                    flightId: flight._id,
                    passengers,
                    paymentMethod,
                };

                const response = await API.post('/api/bookings', bookingDetails, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data.success) {
                    setStep(3); // Move to confirmation step
                }
            } catch (err) {
                setError(err.response?.data?.message || "Booking failed. The flight may no longer be available.");
                setStep(2); // Go back to payment step on failure
            } finally {
                setIsProcessing(false);
            }
        }, 2000); // 2-second delay to simulate payment
    };

    const renderStepContent = () => {
        switch (step) {
            case 1: // Passenger Selection
                return (
                    <>
                        <h3 className="text-xl font-semibold text-gray-800">Confirm Your Trip</h3>
                        <p className="text-gray-600">Select the number of passengers for your flight from <span className="font-semibold">{flight.origin}</span> to <span className="font-semibold">{flight.destination}</span>.</p>
                        <div className="my-6">
                            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">Passengers</label>
                            <input
                                type="number"
                                id="passengers"
                                min="1"
                                max={flight.seatsAvailable}
                                value={passengers}
                                onChange={(e) => setPassengers(parseInt(e.target.value))}
                                className="mt-1 w-full p-2 border rounded-md"
                            />
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg text-center">
                            <p className="text-sm text-gray-600">Total Price</p>
                            <p className="text-2xl font-bold text-blue-600">${flight.price.toFixed(2)}</p>
                        </div>
                        <button onClick={handleProceedToPayment} className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
                            Proceed to Payment
                        </button>
                    </>
                );

            case 2: // Payment Simulation
                return (
                    <>
                        <h3 className="text-xl font-semibold text-gray-800">Select Payment Method</h3>
                        <p className="text-gray-600">Total Amount: <span className="font-bold text-lg">${flight.price.toFixed(2)}</span></p>
                        <div className="my-6 space-y-3">
                            {['Credit Card', 'Mobile Banking', 'PayPal', 'Cash'].map(method => (
                                <button key={method} onClick={() => setPaymentMethod(method)} className={`w-full p-3 border rounded-lg flex items-center justify-between ${paymentMethod === method ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-500' : 'hover:bg-gray-50'}`}>
                                    <span>{method}</span>
                                    {method === 'Credit Card' && <CreditCard />}
                                    {method === 'Mobile Banking' && <Smartphone />}
                                    {method === 'PayPal' && <ShieldCheck />}
                                    {method === 'Cash' && <Banknote />}
                                </button>
                            ))}
                        </div>
                        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                        <button onClick={handleConfirmBooking} disabled={isProcessing} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400">
                            {isProcessing ? 'Processing Payment...' : 'Pay Now & Confirm Booking'}
                        </button>
                    </>
                );

            case 3: // Confirmation
                return (
                    <div className="text-center">
                        <ShieldCheck className="mx-auto text-green-500 mb-4" size={64} />
                        <h3 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h3>
                        <p className="text-gray-600 mt-2">Your flight from {flight.origin} to {flight.destination} is booked. A confirmation has been sent to your email.</p>
                        <button onClick={() => { onBookingSuccess(); onClose(); }} className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
                            View My Bookings
                        </button>
                    </div>
                );

            default: return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md m-4 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X />
                </button>
                {renderStepContent()}
            </div>
        </div>
    );
};

export default BookingModal;