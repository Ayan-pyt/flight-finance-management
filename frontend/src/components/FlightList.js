// frontend/src/components/FlightList.js
import React, { useState, useEffect } from 'react';
import API from '../api';
import { Plane, Clock, DollarSign, Users, ArrowLeft } from 'lucide-react';

const FlightList = ({ isLoggedIn, searchQuery, onNewSearch }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        if (searchQuery) {
          if (searchQuery.from) params.append('from', searchQuery.from);
          if (searchQuery.to) params.append('to', searchQuery.to);
          if (searchQuery.date) params.append('date', searchQuery.date);
        }
        const response = await API.get(`/flights?${params.toString()}`);
        if (response.data.success) {
          setFlights(response.data.data);
        } else {
          setError('Could not fetch flights.');
        }
      } catch (err) {
        setError('An error occurred while fetching flights.');
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, [searchQuery]);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formatTime = (dateString) => new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Bar */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {searchQuery ? 'Flight Search Results' : 'All Available Flights'}
            </h1>
            {searchQuery && (
              <p className="text-sm text-gray-500 mt-1">
                Showing flights from <strong>{searchQuery.from}</strong> to <strong>{searchQuery.to}</strong> on <strong>{new Date(searchQuery.date).toLocaleDateString()}</strong>
              </p>
            )}
          </div>
          {/* --- NEW: Back / New Search Button --- */}
          <button
            onClick={onNewSearch}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            New Search
          </button>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {loading && <p className="text-center text-gray-600">Searching for flights...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          
          {!loading && !error && (
            <div className="space-y-6">
              {flights.length > 0 ? (
                flights.map((flight) => (
                  <div key={flight._id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <div className="p-6 md:flex justify-between items-center">
                      <div className="md:w-1/3 mb-4 md:mb-0">
                        <div className="flex items-center text-xl font-bold text-gray-800">
                          <span>{flight.departure}</span>
                          <Plane className="mx-4 text-gray-400" />
                          <span>{flight.arrival}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Flight No: {flight.flightNumber} | {formatDate(flight.departureTime)}</div>
                      </div>

                      <div className="md:w-1/3 flex justify-around text-center mb-4 md:mb-0 border-y md:border-y-0 md:border-x border-gray-200 py-4 md:py-0">
                        <div>
                          <div className="text-sm text-gray-500">Departure</div>
                          <div className="text-lg font-semibold text-gray-900 flex items-center justify-center"><Clock size={16} className="mr-1.5" />{formatTime(flight.departureTime)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Arrival</div>
                          <div className="text-lg font-semibold text-gray-900 flex items-center justify-center"><Clock size={16} className="mr-1.5" />{formatTime(flight.arrivalTime)}</div>
                        </div>
                      </div>

                      <div className="md:w-1/3 md:flex items-center justify-end">
                        <div className="text-center md:text-right mr-6 mb-4 md:mb-0">
                          <div className="text-2xl font-bold text-blue-600 flex items-center justify-center md:justify-end"><DollarSign size={22} />{flight.price}</div>
                          <div className="text-sm text-gray-500">{flight.seatsAvailable} seats left</div>
                        </div>
                        <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg">
                          Select Flight
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center bg-white p-12 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800">No Flights Found</h2>
                  <p className="text-gray-600 mt-2">Sorry, we couldn't find any flights for this route on the selected date.</p>
                  <button onClick={onNewSearch} className="mt-6 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                    Try a Different Search
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FlightList;


