// File: /src/components/BookingModal.js

import React, { useState } from 'react';
import API from '../api';
import { X, Users, CreditCard, Smartphone, ShieldCheck, Banknote } from 'lucide-react';

const BookingModal = ({ flight, onClose, onBookingSuccess }) => {
    const [step, setStep] = useState(1); // 1: Passenger Selection, 2: Payment, 3: Confirmation
    const [passengers, setPassengers] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');
    
    // NEW: State to hold details for the specific payment forms
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cardPin: '',
        accountNumber: '',
        accountPin: '',
        bkashNumber: '',
        bkashPin: '',
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const totalPrice = flight.price * passengers;

    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo).token : null;
    };

    const handlePaymentDetailChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleProceedToPayment = () => {
        if (passengers > flight.seatsAvailable) {
            setError(`Only ${flight.seatsAvailable} seats are available.`);
            return;
        }
        setError('');
        setStep(2);
    };

    // This function now includes validation for the new payment forms
    const handleConfirmBooking = async () => {
        setError('');
        if (!paymentMethod) {
            setError("Please select a payment method.");
            return;
        }

        // --- NEW: Validation for each payment method ---
        if (paymentMethod === 'Credit Card' && (paymentDetails.cardNumber.length !== 9 || paymentDetails.cardPin.length !== 4)) {
            setError("Please enter a valid 9-digit card number and 4-digit PIN.");
            return;
        }
        if (paymentMethod === 'Mobile Banking' && (paymentDetails.accountNumber.length !== 6 || paymentDetails.accountPin.length !== 4)) {
            setError("Please enter a valid 6-digit account number and 4-digit PIN.");
            return;
        }
        if (paymentMethod === 'bKash' && (paymentDetails.bkashNumber.length !== 11 || paymentDetails.bkashPin.length !== 4)) {
            setError("Please enter a valid 11-digit bKash number and 4-digit PIN.");
            return;
        }

        setIsProcessing(true);
        const token = getToken();
        
        // Simulate payment processing delay
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
                    setStep(3);
                }
            } catch (err) {
                setError(err.response?.data?.message || "Booking failed. Please try again.");
                setStep(2);
            } finally {
                setIsProcessing(false);
            }
        }, 2000);
    };

    // --- RENDER LOGIC for each payment sub-form ---
    const renderPaymentSubForm = () => {
        switch(paymentMethod) {
            case 'Credit Card':
                return (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <input type="text" name="cardNumber" placeholder="9-Digit Card Number" maxLength="9" value={paymentDetails.cardNumber} onChange={handlePaymentDetailChange} className="p-2 border rounded-md" />
                        <input type="password" name="cardPin" placeholder="4-Digit PIN" maxLength="4" value={paymentDetails.cardPin} onChange={handlePaymentDetailChange} className="p-2 border rounded-md" />
                    </div>
                );
            case 'Mobile Banking':
                return (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <input type="text" name="accountNumber" placeholder="6-Digit Account No." maxLength="6" value={paymentDetails.accountNumber} onChange={handlePaymentDetailChange} className="p-2 border rounded-md" />
                        <input type="password" name="accountPin" placeholder="4-Digit PIN" maxLength="4" value={paymentDetails.accountPin} onChange={handlePaymentDetailChange} className="p-2 border rounded-md" />
                    </div>
                );
            case 'bKash':
                return (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <input type="text" name="bkashNumber" placeholder="11-Digit bKash No." maxLength="11" value={paymentDetails.bkashNumber} onChange={handlePaymentDetailChange} className="p-2 border rounded-md" />
                        <input type="password" name="bkashPin" placeholder="4-Digit PIN" maxLength="4" value={paymentDetails.bkashPin} onChange={handlePaymentDetailChange} className="p-2 border rounded-md" />
                    </div>
                );
            default:
                return null;
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1: // Passenger Selection
                return (
                    <>
                        <h3 className="text-xl font-semibold text-gray-800">Confirm Your Trip</h3>
                        <p className="text-gray-600">Select passengers for flight from <span className="font-semibold">{flight.origin}</span> to <span className="font-semibold">{flight.destination}</span>.</p>
                        <div className="my-6">
                            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">Passengers</label>
                            <input type="number" id="passengers" min="1" max={flight.seatsAvailable} value={passengers} onChange={(e) => setPassengers(parseInt(e.target.value) || 1)} className="mt-1 w-full p-2 border rounded-md" />
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg text-center">
                            <p className="text-sm text-gray-600">Total Price</p>
                            <p className="text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</p>
                        </div>
                        <button onClick={handleProceedToPayment} className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">Proceed to Payment</button>
                    </>
                );

            case 2: // Payment Simulation
                return (
                    <>
                        <h3 className="text-xl font-semibold text-gray-800">Select Payment Method</h3>
                        <p className="text-gray-600">Total Amount: <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span></p>
                        <div className="my-4 space-y-3">
                            {['Credit Card', 'Mobile Banking', 'bKash', 'Cash'].map(method => (
                                <button key={method} onClick={() => setPaymentMethod(method)} className={`w-full p-3 border rounded-lg flex items-center justify-between text-left ${paymentMethod === method ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-500' : 'hover:bg-gray-50'}`}>
                                    <span>{method}</span>
                                    {method === 'Credit Card' && <CreditCard />}
                                    {method === 'Mobile Banking' && <Smartphone />}
                                    {method === 'bKash' && <ShieldCheck />}
                                    {method === 'Cash' && <Banknote />}
                                </button>
                            ))}
                        </div>
                        {paymentMethod && paymentMethod !== 'Cash' && renderPaymentSubForm()}
                        {error && <p className="text-red-500 text-sm text-center my-4">{error}</p>}
                        <button onClick={handleConfirmBooking} disabled={isProcessing} className="w-full mt-4 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400">
                            {isProcessing ? 'Processing Payment...' : 'Pay Now & Confirm Booking'}
                        </button>
                    </>
                );

            case 3: // Confirmation
                return (
                    <div className="text-center">
                        <ShieldCheck className="mx-auto text-green-500 mb-4" size={64} />
                        <h3 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h3>
                        <p className="text-gray-600 mt-2">Your flight from {flight.origin} to {flight.destination} is booked.</p>
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

// // File: /src/components/BookingModal.js

// import React, { useState } from 'react';
// import API from '../api';
// import { X, Users, CreditCard, Smartphone, Banknote, ShieldCheck } from 'lucide-react';

// const BookingModal = ({ flight, onClose, onBookingSuccess }) => {
//     const [step, setStep] = useState(1);
//     const [passengers, setPassengers] = useState(1);
//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [error, setError] = useState('');

//     // --- START OF FIX ---
//     // CORRECTED: Calculate the total price dynamically based on the number of passengers.
//     const totalPrice = flight.price * passengers;
//     // --- END OF FIX ---

//     const getToken = () => {
//         const userInfo = localStorage.getItem('userInfo');
//         return userInfo ? JSON.parse(userInfo).token : null;
//     };

//     const handleProceedToPayment = () => {
//         if (passengers > flight.seatsAvailable) {
//             setError(`Only ${flight.seatsAvailable} seats are available.`);
//             return;
//         }
//         setError('');
//         setStep(2);
//     };

//     const handleConfirmBooking = async () => {
//         if (!paymentMethod) {
//             setError("Please select a payment method.");
//             return;
//         }
        
//         setIsProcessing(true);
//         setError('');
//         const token = getToken();
        
//         setTimeout(async () => {
//             try {
//                 const bookingDetails = {
//                     flightId: flight._id,
//                     passengers,
//                     paymentMethod,
//                 };

//                 const response = await API.post('/api/bookings', bookingDetails, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });

//                 if (response.data.success) {
//                     setStep(3);
//                 }
//             } catch (err) {
//                 setError(err.response?.data?.message || "Booking failed. The flight may no longer be available.");
//                 setStep(2);
//             } finally {
//                 setIsProcessing(false);
//             }
//         }, 2000);
//     };

//     const renderStepContent = () => {
//         switch (step) {
//             case 1: // Passenger Selection
//                 return (
//                     <>
//                         <h3 className="text-xl font-semibold text-gray-800">Confirm Your Trip</h3>
//                         <p className="text-gray-600">Select the number of passengers for your flight from <span className="font-semibold">{flight.origin}</span> to <span className="font-semibold">{flight.destination}</span>.</p>
//                         <div className="my-6">
//                             <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">Passengers</label>
//                             <input
//                                 type="number"
//                                 id="passengers"
//                                 min="1"
//                                 max={flight.seatsAvailable}
//                                 value={passengers}
//                                 onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
//                                 className="mt-1 w-full p-2 border rounded-md"
//                             />
//                             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//                         </div>
//                         <div className="p-4 bg-blue-50 rounded-lg text-center">
//                             <p className="text-sm text-gray-600">Total Price</p>
//                             {/* CORRECTED: Display the dynamically calculated total price */}
//                             <p className="text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</p>
//                         </div>
//                         <button onClick={handleProceedToPayment} className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
//                             Proceed to Payment
//                         </button>
//                     </>
//                 );

//             case 2: // Payment Simulation
//                 return (
//                     <>
//                         <h3 className="text-xl font-semibold text-gray-800">Select Payment Method</h3>
//                         {/* CORRECTED: Display the dynamically calculated total price */}
//                         <p className="text-gray-600">Total Amount: <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span></p>
//                         <div className="my-6 space-y-3">
//                             {['Credit Card', 'Mobile Banking', 'Bkash', 'Cash'].map(method => (
//                                 <button key={method} onClick={() => setPaymentMethod(method)} className={`w-full p-3 border rounded-lg flex items-center justify-between ${paymentMethod === method ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-500' : 'hover:bg-gray-50'}`}>
//                                     <span>{method}</span>
//                                     {method === 'Credit Card' && <CreditCard />}
//                                     {method === 'Mobile Banking' && <Smartphone />}
//                                     {method === 'Bkash' && <ShieldCheck />}
//                                     {method === 'Cash' && <Banknote />}
//                                 </button>
//                             ))}
//                         </div>
//                         {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
//                         <button onClick={handleConfirmBooking} disabled={isProcessing} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400">
//                             {isProcessing ? 'Processing Payment...' : 'Pay Now & Confirm Booking'}
//                         </button>
//                     </>
//                 );

//             case 3: // Confirmation
//                 return (
//                     <div className="text-center">
//                         <ShieldCheck className="mx-auto text-green-500 mb-4" size={64} />
//                         <h3 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h3>
//                         <p className="text-gray-600 mt-2">Your flight from {flight.origin} to {flight.destination} is booked.</p>
//                         <button onClick={() => { onBookingSuccess(); onClose(); }} className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
//                             View My Bookings
//                         </button>
//                     </div>
//                 );

//             default: return null;
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md m-4 relative">
//                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
//                     <X />
//                 </button>
//                 {renderStepContent()}
//             </div>
//         </div>
//     );
// };

// export default BookingModal;