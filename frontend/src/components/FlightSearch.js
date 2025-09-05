import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

// --- Main Flight Search Component ---
const FlightSearch = ({ onFlightSearch, isInsideDashboard = false }) => {
  // State now holds simple string values for 'from' and 'to'
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departure: '',
    passengers: '1',
  });

  // Generic handler to update state for all text inputs
  const handleInputChange = (e) => {
    setSearchData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearchClick = () => {
    // Updated validation for text inputs
    if (searchData.from && searchData.to && searchData.departure) {
      // The query now sends the raw text input
      const query = { 
        from: searchData.from, 
        to: searchData.to, 
        date: searchData.departure,
        passengers: searchData.passengers,
      };
      onFlightSearch(query);
    } else {
      alert("Please fill out the From, To, and Departure fields.");
    }
  };

  // Logic for component styling remains the same
  const containerClasses = isInsideDashboard 
    ? "bg-white rounded-2xl shadow-xl p-6 max-w-6xl mx-auto relative z-10"
    : "bg-white rounded-2xl shadow-xl p-6 max-w-6xl mx-auto -mt-10 relative z-10";

  return (
    <div className={containerClasses}>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* "From" field is now a text input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">From</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="from"
              value={searchData.from}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="City or Airport"
            />
          </div>
        </div>

        {/* "To" field is now a text input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">To</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="to"
              value={searchData.to}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="City or Airport"
            />
          </div>
        </div>

        {/* Departure date input (unchanged) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Departure</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="date"
              name="departure"
              value={searchData.departure}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Passengers select input (unchanged) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Passengers</label>
          <div className="relative">
            <Users className="absolute left-3 top-3 text-gray-400" size={20} />
            <select
              name="passengers"
              value={searchData.passengers}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Search button (unchanged) */}
        <div className="flex items-end">
          <button
            onClick={handleSearchClick}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center"
          >
            <Search size={20} className="mr-2" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;