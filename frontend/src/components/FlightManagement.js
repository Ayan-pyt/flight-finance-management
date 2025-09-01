// File: /src/components/FlightManagement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightManagement = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchFlights = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/flights'); // Assuming this endpoint fetches all flights
            // Sort flights by departure time for better viewing
            const sortedFlights = data.data.sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime));
            setFlights(sortedFlights);
            setError('');
        } catch (err) {
            setError('Failed to fetch flights.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlights();
    }, []);

    const handleStatusChange = async (flightId, newStatus) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo ? userInfo.token : null;

            if (!token) {
                alert('Admin authorization token not found. Please log in again.');
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.patch(
                `/api/flights/${flightId}/status`,
                { status: newStatus },
                config
            );
            
            // Update the status in the local state for immediate feedback
            setFlights(flights.map(f => (f._id === flightId ? { ...f, status: newStatus } : f)));
            
        } catch (err) {
            alert('Error updating flight status.');
            console.error(err);
        }
    };

    if (loading) return <p>Loading flight data...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="flight-management-container">
            <h3>Flight Status Management</h3>
            <table className="flight-table">
                <thead>
                    <tr>
                        <th>Flight No.</th>
                        <th>Route</th>
                        <th>Date & Time (Departure)</th>
                        <th>Current Status</th>
                        <th>Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight) => (
                        <tr key={flight._id}>
                            <td>{flight.flightNumber}</td>
                            <td>{`${flight.departure} → ${flight.arrival}`}</td>
                            <td>{new Date(flight.departureTime).toLocaleString()}</td>
                            <td>
                                <span className={`status-badge status-${flight.status.toLowerCase().replace(' ', '-')}`}>
                                    {flight.status}
                                </span>
                            </td>
                            <td>
                                <select
                                    value={flight.status}
                                    onChange={(e) => handleStatusChange(flight._id, e.target.value)}
                                    className="status-select"
                                >
                                    <option value="Scheduled">Scheduled</option>
                                    <option value="On Time">On Time</option>
                                    <option value="Delayed">Delayed</option>
                                    <option value="Departed">Departed</option>
                                    <option value="Arrival">Arrival</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FlightManagement;