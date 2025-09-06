import React, { useState, useEffect } from 'react';
import API from '../api';
import BookingModal from './BookingModal'; // Import the new modal component

const FlightList = ({ searchQuery }) => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // --- NEW STATE for Booking ---
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchFlights = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (searchQuery?.from) params.append('from', searchQuery.from);
                if (searchQuery?.to) params.append('to', searchQuery.to);
                if (searchQuery?.date) params.append('date', searchQuery.date);

                const { data } = await API.get(`/api/flights?${params.toString()}`);
                
                if(data.success) {
                    setFlights(data.data || []);
                } else {
                    setError('Could not fetch flights.');
                }
            } catch (err) {
                setError('An error occurred while fetching flights.');
                console.error(err);
                setFlights([]); 
            } finally {
                setLoading(false);
            }
        };
        
        fetchFlights();
    }, [searchQuery]);

    // --- NEW FUNCTIONS for Booking ---
    const handleBookNowClick = (flight) => {
        if (!userInfo) {
            alert("Please log in to book a flight.");
            return;
        }
        setSelectedFlight(flight);
        setIsBookingModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsBookingModalOpen(false);
        setSelectedFlight(null);
    };

    const handleBookingSuccess = () => {
        console.log("Booking successful! In a real app, you would redirect to My Bookings.");
        // If you are using the state-based navigation from App.js, you might have a function passed down
        // to change the view to 'my-bookings'.
    };

    if (loading) return <p className="text-center p-6">Searching for flights...</p>;
    if (error) return <p className="text-center text-red-500 p-6">{error}</p>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Available Flights</h2>
            
            {flights.length === 0 ? (
                <p className="text-gray-500">No available flights match your search criteria.</p>
            ) : (
                <div className="space-y-4">
                    {flights.map((flight) => (
                        <div key={flight._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-lg">{`Flight ${flight.flightNumber}: ${flight.origin} to ${flight.destination}`}</h4>
                                <p className="text-sm text-gray-600">Departure: {new Date(flight.departureTime).toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Seats Available: {flight.seatsAvailable}</p>
                            </div>
                            <div className="text-right">
                                {/* --- START OF FIX --- */}
                                {/* CORRECTED: Added a check to prevent crash if price is missing. */}
                                <p className="font-bold text-xl text-blue-600">
                                    ${(flight.price || 0).toFixed(2)}
                                </p>
                                {/* --- END OF FIX --- */}
                                <button onClick={() => handleBookNowClick(flight)} className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isBookingModalOpen && selectedFlight && (
                <BookingModal 
                    flight={selectedFlight} 
                    onClose={handleCloseModal} 
                    onBookingSuccess={handleBookingSuccess} 
                />
            )}
        </div>
    );
};

export default FlightList;