// File: /src/components/FlightList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightList = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            // Using the full object from your controller's response
            const { data } = await axios.get('/api/flights');
            setFlights(data.data || []);
        };
        fetchFlights();
    }, []);

    return (
        <div className="flight-list-container">
            <h2>Available Flights</h2>
            {flights.map((flight) => (
                <div key={flight._id} className="flight-card">
                    <h4>{`Flight ${flight.flightNumber}: ${flight.departure} to ${flight.arrival}`}</h4>
                    <p>Departure: {new Date(flight.departureTime).toLocaleString()}</p>
                    <p>Price: ${flight.price}</p>
                    
                    {/* ADD THIS DIV TO DISPLAY THE STATUS BADGE */}
                    <div className="flight-status-container">
                        <strong>Status: </strong>
                        <span className={`status-badge status-${flight.status.toLowerCase().replace(' ', '-')}`}>
                            {flight.status}
                        </span>
                    </div>

                    <button className="select-flight-btn">Book Now</button>
                </div>
            ))}
        </div>
    );
};

export default FlightList;