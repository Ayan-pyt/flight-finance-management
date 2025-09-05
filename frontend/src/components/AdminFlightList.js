// File: frontend/src/components/AdminFlightList.js

import React, { useState, useEffect } from 'react';
import API from '../api'; // Assuming you have a configured axios instance

const AdminFlightList = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo).token : null;
    };

    useEffect(() => {
        const fetchAllFlights = async () => {
            const token = getToken();
            if (!token) {
                setError("Authentication required.");
                setLoading(false);
                return;
            }

            try {
                // This calls the new admin-specific endpoint
                const response = await API.get('/api/flights/admin/all', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.data?.success) {
                    setFlights(response.data.data);
                }
            } catch (err) {
                setError("Failed to fetch flights. You may not have admin rights.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllFlights();
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case 'On-Time': return 'bg-green-100 text-green-800';
            case 'Delayed': return 'bg-orange-100 text-orange-800';
            case 'Cancelled': return 'bg-red-100 text-red-800 line-through';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return <p>Loading all flights...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Admin Flight Management</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight No.</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departure Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminFlightList;