// import React, { useState } from 'react';
// import API from '../api'; // Your api.js file

// const FlightManagement = () => {
//     // State to hold the form data. Notice the keys are origin and destination.
//     const [flightData, setFlightData] = useState({
//         flightNumber: '',
//         origin: '',
//         destination: '',
//         departureTime: '',
//         arrivalTime: '',
//         price: '',
//         seatsAvailable: 180,
//     });

//     const [message, setMessage] = useState({ text: '', type: '' });
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const getToken = () => {
//         const userInfo = localStorage.getItem('userInfo');
//         return userInfo ? JSON.parse(userInfo).token : null;
//     };

//     // Generic handler to update state
//     const handleChange = (e) => {
//         setFlightData({
//             ...flightData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         setMessage({ text: '', type: '' });

//         const token = getToken();
//         if (!token) {
//             setMessage({ text: 'Authentication error. Please log in again.', type: 'error' });
//             setIsSubmitting(false);
//             return;
//         }

//         try {
//             console.log("Submitting flight data:", flightData); // For debugging
//             const headers = { 'Authorization': `Bearer ${token}` };
//             const response = await API.post('/api/flights', flightData, { headers });
            
//             setMessage({ text: response.data.message, type: 'success' });
//             // Reset form
//             setFlightData({
//                 flightNumber: '', origin: '', destination: '', departureTime: '', arrivalTime: '', price: '', seatsAvailable: 180
//             });
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || 'Failed to create flight.';
//             setMessage({ text: errorMessage, type: 'error' });
//             console.error('Error creating flight:', error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-xl font-semibold text-gray-800">Flight Management</h2>
//             <div className="add-cost-form-container mt-6">
//                 <h3 className="text-lg font-semibold mb-2 text-gray-700">Add New Flight</h3>
//                 <form onSubmit={handleSubmit}>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {/* CRITICAL: The 'name' attribute must match the state key */}
//                         <div className="form-group"><label>Flight Number</label><input type="text" name="flightNumber" value={flightData.flightNumber} onChange={handleChange} required /></div>
//                         <div className="form-group"><label>Price ($)</label><input type="number" name="price" value={flightData.price} onChange={handleChange} required /></div>
//                         <div className="form-group"><label>Origin</label><input type="text" name="origin" value={flightData.origin} onChange={handleChange} required /></div>
//                         <div className="form-group"><label>Destination</label><input type="text" name="destination" value={flightData.destination} onChange={handleChange} required /></div>
//                         <div className="form-group"><label>Departure Time</label><input type="datetime-local" name="departureTime" value={flightData.departureTime} onChange={handleChange} required /></div>
//                         <div className="form-group"><label>Arrival Time</label><input type="datetime-local" name="arrivalTime" value={flightData.arrivalTime} onChange={handleChange} required /></div>
//                     </div>
//                     <div className="flex justify-end mt-4">
//                         <button type="submit" disabled={isSubmitting}>
//                             {isSubmitting ? 'Saving...' : 'Add Flight'}
//                         </button>
//                     </div>
//                 </form>
//                 {message.text && <div className={`message ${message.type} mt-4`}>{message.text}</div>}
//             </div>
//             {/* You can add a flight list or other management features here later */}
//         </div>
//     );
// };

// export default FlightManagement;







// File: /src/components/FlightManagement.js

import React, { useState } from 'react';
import API from '../api'; // Your api.js file

const FlightManagement = () => {
    // State to hold the form data. Notice the keys are origin and destination.
    const [flightData, setFlightData] = useState({
        flightNumber: '',
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        seatsAvailable: 180,
    });

    const [message, setMessage] = useState({ text: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo).token : null;
    };

    // Generic handler to update state
    const handleChange = (e) => {
        setFlightData({
            ...flightData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ text: '', type: '' });

        const token = getToken();
        if (!token) {
            setMessage({ text: 'Authentication error. Please log in again.', type: 'error' });
            setIsSubmitting(false);
            return;
        }

        try {
            console.log("Submitting flight data:", flightData); // For debugging
            const headers = { 'Authorization': `Bearer ${token}` };

            // --- START OF FIX ---
            // CORRECTED: The URL now includes '/admin/create' to match the new, secure backend route.
            const response = await API.post('/api/flights/admin/create', flightData, { headers });
            // --- END OF FIX ---
            
            setMessage({ text: response.data.message, type: 'success' });
            // Reset form
            setFlightData({
                flightNumber: '', origin: '', destination: '', departureTime: '', arrivalTime: '', price: '', seatsAvailable: 180
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create flight.';
            setMessage({ text: errorMessage, type: 'error' });
            console.error('Error creating flight:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800">Flight Management</h2>
            <div className="add-cost-form-container mt-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Add New Flight</h3>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group"><label>Flight Number</label><input type="text" name="flightNumber" value={flightData.flightNumber} onChange={handleChange} required /></div>
                        <div className="form-group"><label>Price ($)</label><input type="number" name="price" value={flightData.price} onChange={handleChange} required /></div>
                        <div className="form-group"><label>Origin</label><input type="text" name="origin" value={flightData.origin} onChange={handleChange} required /></div>
                        <div className="form-group"><label>Destination</label><input type="text" name="destination" value={flightData.destination} onChange={handleChange} required /></div>
                        <div className="form-group"><label>Departure Time</label><input type="datetime-local" name="departureTime" value={flightData.departureTime} onChange={handleChange} required /></div>
                        <div className="form-group"><label>Arrival Time</label><input type="datetime-local" name="arrivalTime" value={flightData.arrivalTime} onChange={handleChange} required /></div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Add Flight'}
                        </button>
                    </div>
                </form>
                {message.text && <div className={`message ${message.type} mt-4`}>{message.text}</div>}
            </div>
        </div>
    );
};

export  default FlightManagement;
