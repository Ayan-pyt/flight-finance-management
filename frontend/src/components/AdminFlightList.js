// // File: frontend/src/components/AdminFlightList.js

// import React, { useState, useEffect } from 'react';
// import API from '../api'; // Assuming you have a configured axios instance

// const AdminFlightList = () => {
//     const [flights, setFlights] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     const getToken = () => {
//         const userInfo = localStorage.getItem('userInfo');
//         return userInfo ? JSON.parse(userInfo).token : null;
//     };

//     useEffect(() => {
//         const fetchAllFlights = async () => {
//             const token = getToken();
//             if (!token) {
//                 setError("Authentication required.");
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 // This calls the new admin-specific endpoint
//                 const response = await API.get('/api/flights/admin/all', {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });
//                 if (response.data?.success) {
//                     setFlights(response.data.data);
//                 }
//             } catch (err) {
//                 setError("Failed to fetch flights. You may not have admin rights.");
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAllFlights();
//     }, []);

//     const getStatusClass = (status) => {
//         switch (status) {
//             case 'On-Time': return 'bg-green-100 text-green-800';
//             case 'Delayed': return 'bg-orange-100 text-orange-800';
//             case 'Cancelled': return 'bg-red-100 text-red-800 line-through';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     };

//     if (loading) return <p>Loading all flights...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;

//     return (
//         <div className="bg-white p-6 rounded-lg shadow">
//             <h2 className="text-2xl font-bold mb-4">Admin Flight Management</h2>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight No.</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departure Time</th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {flights.map((flight) => (
//                             <tr key={flight._id}>
//                                 <td className="px-6 py-4 whitespace-nowrap font-medium">{flight.flightNumber}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">{flight.origin} &rarr; {flight.destination}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">{new Date(flight.departureTime).toLocaleString()}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">
//                                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(flight.status)}`}>
//                                         {flight.status}
//                                     </span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };



// File: frontend/src/components/AdminFlightList.js

import React, { useState, useEffect } from 'react';
import API from '../api';
import { Trash2 } from 'lucide-react'; // Import the trash icon

const AdminFlightList = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo).token : null;
    };

    useEffect(() => {
        const fetchAllFlights = async () => {
            // ... (existing fetch logic is correct)
            const token = getToken();
            if (!token) { setError("Authentication required."); setLoading(false); return; }
            try {
                const response = await API.get('/api/flights/admin/all', { headers: { 'Authorization': `Bearer ${token}` } });
                if (response.data?.success) { setFlights(response.data.data); }
            } catch (err) {
                setError("Failed to fetch flights.");
            } finally {
                setLoading(false);
            }
        };
        fetchAllFlights();
    }, []);

    // --- START OF NEW FEATURE ---
    const handleDelete = async (flightId) => {
        // Show a confirmation dialog to prevent accidental deletions
        if (window.confirm('Are you sure you want to permanently delete this flight? This action cannot be undone.')) {
            const token = getToken();
            try {
                const response = await API.delete(`/api/flights/admin/${flightId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data.success) {
                    // Update the UI in real-time by removing the flight from the state
                    setFlights(prevFlights => prevFlights.filter(flight => flight._id !== flightId));
                    setMessage('Flight deleted successfully.');
                    // Clear the message after a few seconds
                    setTimeout(() => setMessage(''), 3000);
                }
            } catch (err) {
                setError(err.response?.data?.message || "Failed to delete flight.");
            }
        }
    };
    // --- END OF NEW FEATURE ---

    const getStatusClass = (status) => {
        // ... (existing status styling logic is correct)
        switch (status) {
            case 'On-Time': return 'bg-green-100 text-green-800';
            case 'Delayed': return 'bg-orange-100 text-orange-800';
            case 'Cancelled': return 'bg-red-100 text-red-800 line-through';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return <p>Loading all flights...</p>;
    if (error) return <p className="text-red-500 p-4">{error}</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Admin Flight Management</h2>
            {message && <p className="text-green-600 bg-green-50 p-3 rounded-md mb-4">{message}</p>}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight No.</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departure</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            {/* NEW: Added a column for actions */}
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {flights.map((flight) => (
                            <tr key={flight._id}>
                                <td className="px-6 py-4 whitespace-nowrap font-medium">{flight.flightNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{flight.origin} &rarr; {flight.destination}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(flight.departureTime).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(flight.status)}`}>
                                        {flight.status}
                                    </span>
                                </td>
                                {/* NEW: Added the delete button */}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleDelete(flight._id)} className="text-red-600 hover:text-red-900">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminFlightList;