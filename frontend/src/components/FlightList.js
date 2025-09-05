// // File: /src/components/FlightList.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const FlightList = () => {
//     const [flights, setFlights] = useState([]);

//     useEffect(() => {
//         const fetchFlights = async () => {
//             // Using the full object from your controller's response
//             const { data } = await axios.get('/api/flights');
//             setFlights(data.data || []);
//         };
//         fetchFlights();
//     }, []);

//     return (
//         <div className="flight-list-container">
//             <h2>Available Flights</h2>
//             {flights.map((flight) => (
//                 <div key={flight._id} className="flight-card">
//                     <h4>{`Flight ${flight.flightNumber}: ${flight.departure} to ${flight.arrival}`}</h4>
//                     <p>Departure: {new Date(flight.departureTime).toLocaleString()}</p>
//                     <p>Price: ${flight.price}</p>
                    
//                     {/* ADD THIS DIV TO DISPLAY THE STATUS BADGE */}
//                     <div className="flight-status-container">
//                         <strong>Status: </strong>
//                         <span className={`status-badge status-${flight.status.toLowerCase().replace(' ', '-')}`}>
//                             {flight.status}
//                         </span>
//                     </div>

//                     <button className="select-flight-btn">Book Now</button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default FlightList;


// // /src/components/FlightList.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // You might need to create and import a CSS file for styling
// // import './FlightList.css'; 

// const FlightList = () => {
//     const [flights, setFlights] = useState([]);

//     useEffect(() => {
//         const fetchFlights = async () => {
//             try {
//                 // The response 'data' will be the array of flights from your API
//                 const { data } = await axios.get('/api/flights');
                
//                 // DEBUG: See what the frontend receives from the API
//                 console.log('Data received from API:', data);

//                 // CORRECTED: Use the entire 'data' array directly
//                 setFlights(data || []);
//             } catch (error) {
//                 console.error("Failed to fetch flights:", error);
//                 // Also set to empty array on error
//                 setFlights([]); 
//             }
//         };
//         fetchFlights();
//     }, []);

//     // DEBUG: See what is currently in the component's state
//     console.log('Current flights state:', flights);

//     return (
//         <div className="flight-list-container p-6">
//             <h2 className="text-2xl font-bold mb-4">Available Flights</h2>
            
//             {/* Add a check for when there are no flights to display */}
//             {flights.length === 0 ? (
//                 <p className="text-gray-500">No available flights at the moment.</p>
//             ) : (
//                 flights.map((flight) => (
//                     <div key={flight._id} className="flight-card bg-white shadow-md rounded-lg p-4 mb-4">
//                         <h4 className="font-bold text-lg">{`Flight ${flight.flightNumber}: ${flight.origin} to ${flight.destination}`}</h4>
//                         <p>Departure: {new Date(flight.departureTime).toLocaleString()}</p>
//                         <p>Price: ${flight.price}</p>
                        
//                         <div className="flight-status-container mt-2">
//                             <strong>Status: </strong>
//                             {/* Simple styling for status */}
//                             <span className={`status-badge font-semibold ${
//                                 flight.status === 'On-Time' ? 'text-green-600' : 
//                                 flight.status === 'Delayed' ? 'text-orange-600' : 
//                                 flight.status === 'Cancelled' ? 'text-red-600' : ''
//                             }`}>
//                                 {flight.status}
//                             </span>
//                         </div>

//                         <button className="select-flight-btn mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
//                             Book Now
//                         </button>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default FlightList;


// /src/components/FlightList.js



// File: /src/components/FlightList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightList = ({ searchQuery }) => {
    const [flights, setFlights] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newFlight, setNewFlight] = useState({
        flightNumber: '',
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        status: 'On-Time',
    });
    const [userRole, setUserRole] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const params = new URLSearchParams();
                if (searchQuery?.from) params.append('from', searchQuery.from);
                if (searchQuery?.to) params.append('to', searchQuery.to);

                const { data } = await axios.get(`/api/flights?${params.toString()}`);
                
                // --- START OF FIX ---
                // The API now returns an object { success, count, data }.
                // We need to access the 'data' property which contains the array of flights.
                setFlights(data.data || []);
                // --- END OF FIX ---

            } catch (error) {
                console.error("Failed to fetch flights:", error);
                setFlights([]); 
            }
        };

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setUserRole(userInfo.role);
        }
        
        fetchFlights();
    }, [searchQuery]);

    const handleInputChange = (e) => {
        setNewFlight({ ...newFlight, [e.target.name]: e.target.value });
    };

    const handleFlightSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) {
            setMessage('You must be logged in to add a flight.');
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        
        const flightDataToSend = { ...newFlight, basePrice: newFlight.price };
        delete flightDataToSend.price;

        try {
            await axios.post('/api/flights', flightDataToSend, config);
            setMessage('Flight added successfully!');
            setShowAddForm(false);
            const { data } = await axios.get('/api/flights');

            // Also apply the fix here when re-fetching flights
            setFlights(data.data || []);

        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Failed to add flight.';
            setMessage(errorMsg);
        }
    };
    
    return (
        <div className="flight-list-container p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Available Flights</h2>
                {userRole === 'admin' && (
                    <button 
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                        {showAddForm ? 'Cancel' : 'Add New Flight'}
                    </button>
                )}
            </div>

            {message && <p className="text-center text-red-500 mb-4">{message}</p>}

            {showAddForm && userRole === 'admin' && (
                <div className="add-flight-form bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
                    {/* The form JSX remains unchanged */}
                </div>
            )}

            {flights.length === 0 ? (
                <p className="text-gray-500">No available flights match your search criteria.</p>
            ) : (
                flights.map((flight) => (
                    <div key={flight._id} className="flight-card bg-white shadow-md rounded-lg p-4 mb-4">
                        <h4 className="font-bold text-lg">{`Flight ${flight.flightNumber}: ${flight.origin} to ${flight.destination}`}</h4>
                        <p>Departure: {new Date(flight.departureTime).toLocaleString()}</p>
                        {/* This part was likely a typo in your previous file, it should be flight.price from the database */}
                        <p>Price: ${flight.price}</p>
                        
                        <div className="flight-status-container mt-2">
                            <strong>Status: </strong>
                            <span className={`status-badge font-semibold ${
                                flight.status === 'On-Time' ? 'text-green-600' : 
                                flight.status === 'Delayed' ? 'text-orange-600' : 
                                flight.status === 'Cancelled' ? 'text-red-600' : ''
                            }`}>
                                {flight.status}
                            </span>
                        </div>

                        <button className="select-flight-btn mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Book Now
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default FlightList;