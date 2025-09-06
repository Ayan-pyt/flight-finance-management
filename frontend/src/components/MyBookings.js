import React, { useState, useEffect } from 'react';
import API from '../api';
import { Ticket } from 'lucide-react';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo).token : null;
    };

    useEffect(() => {
        const fetchBookings = async () => {
            const token = getToken();
            if (!token) {
                setError("You must be logged in to view your bookings.");
                setLoading(false);
                return;
            }
            try {
                const response = await API.get('/api/bookings/my-bookings', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.data.success) {
                    setBookings(response.data.data);
                }
            } catch (err) {
                setError("Failed to fetch your bookings.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <p className="text-center p-6">Loading your bookings...</p>;
    if (error) return <p className="text-center text-red-500 p-6">{error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">My Bookings</h1>
                {bookings.length === 0 ? (
                    <p className="text-gray-500">You have no upcoming or past bookings.</p>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-5">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-blue-600">{booking.flight.flightNumber}</h2>
                                        <span className="text-sm font-semibold bg-green-100 text-green-800 px-3 py-1 rounded-full">{booking.bookingStatus}</span>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-700 mt-1">{booking.flight.origin} &rarr; {booking.flight.destination}</p>
                                </div>
                                <div className="bg-gray-50 px-5 py-3 border-t grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Departure</p>
                                        <p className="font-medium text-gray-800">{new Date(booking.flight.departureTime).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Arrival</p>
                                        <p className="font-medium text-gray-800">{new Date(booking.flight.arrivalTime).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Passengers</p>
                                        <p className="font-medium text-gray-800">{booking.passengers}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Total Price</p>
                                        <p className="font-medium text-gray-800">${booking.totalPrice.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;