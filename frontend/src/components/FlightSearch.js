import React, { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, Users, X } from 'lucide-react';

// --- Airport Data ---
const airports = [
  { iata: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
  { iata: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'USA' },
  { iata: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom' },
  { iata: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { iata: 'HND', name: 'Tokyo Haneda Airport', city: 'Tokyo', country: 'Japan' },
  { iata: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
  { iata: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia' },
  { iata: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
];

// --- Airport Search Modal Component ---
const AirportSearchModal = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredAirports = useMemo(() => {
    if (!searchTerm) return airports;
    const lowercasedTerm = searchTerm.toLowerCase();
    return airports.filter(airport =>
      airport.name.toLowerCase().includes(lowercasedTerm) ||
      airport.city.toLowerCase().includes(lowercasedTerm) ||
      airport.iata.toLowerCase().includes(lowercasedTerm) ||
      airport.country.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[70vh] flex flex-col">
        <div className="p-4 border-b flex items-center justify-between"><h3 className="text-lg font-semibold">Select Airport</h3><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button></div>
        <div className="p-4 border-b"><div className="relative"><Search className="absolute left-3 top-3 text-gray-400" size={20} /><input type="text" placeholder="Search by city, airport, or IATA code..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" autoFocus /></div></div>
        <div className="overflow-y-auto flex-1">{filteredAirports.length > 0 ? (<ul>{filteredAirports.map(airport => (<li key={airport.iata}><button onClick={() => { onSelect(airport); onClose(); }} className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors"><div className="font-semibold">{airport.city}, {airport.country}</div><div className="text-sm text-gray-600">{airport.name} ({airport.iata})</div></button></li>))}</ul>) : (<p className="p-4 text-gray-500">No airports found.</p>)}</div>
      </div>
    </div>
  );
};

// --- Main Flight Search Component ---
const FlightSearch = ({ onFlightSearch, isInsideDashboard = false }) => {
  const [searchData, setSearchData] = useState({ from: null, to: null, departure: '', passengers: '1' });
  const [modalOpenFor, setModalOpenFor] = useState(null);

  const handleSelectAirport = (airport) => {
    setSearchData(prev => ({ ...prev, [modalOpenFor]: airport }));
  };

  const handleSearchClick = () => {
    if (searchData.from && searchData.to && searchData.departure) {
      const query = { from: searchData.from.iata, to: searchData.to.iata, date: searchData.departure };
      onFlightSearch(query);
    } else {
      alert("Please select departure, destination, and date.");
    }
  };

  const containerClasses = isInsideDashboard 
    ? "bg-white rounded-2xl shadow-xl p-6 max-w-6xl mx-auto relative z-10"
    : "bg-white rounded-2xl shadow-xl p-6 max-w-6xl mx-auto -mt-10 relative z-10";

  return (
    <>
      <div className={containerClasses}>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">From</label><button onClick={() => setModalOpenFor('from')} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left relative"><MapPin className="absolute left-3 top-3 text-gray-400" size={20} />{searchData.from ? (<span>{searchData.from.city} ({searchData.from.iata})</span>) : (<span className="text-gray-500">City or Airport</span>)}</button></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">To</label><button onClick={() => setModalOpenFor('to')} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left relative"><MapPin className="absolute left-3 top-3 text-gray-400" size={20} />{searchData.to ? (<span>{searchData.to.city} ({searchData.to.iata})</span>) : (<span className="text-gray-500">City or Airport</span>)}</button></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Departure</label><div className="relative"><Calendar className="absolute left-3 top-3 text-gray-400" size={20} /><input type="date" value={searchData.departure} onChange={(e) => setSearchData({...searchData, departure: e.target.value})} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Passengers</label><div className="relative"><Users className="absolute left-3 top-3 text-gray-400" size={20} /><select value={searchData.passengers} onChange={(e) => setSearchData({...searchData, passengers: e.target.value})} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">{[1,2,3,4,5,6].map(num => (<option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>))}</select></div></div>
          <div className="flex items-end"><button onClick={handleSearchClick} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center"><Search size={20} className="mr-2" />Search</button></div>
        </div>
      </div>
      <AirportSearchModal isOpen={!!modalOpenFor} onClose={() => setModalOpenFor(null)} onSelect={handleSelectAirport} />
    </>
  );
};

export default FlightSearch;