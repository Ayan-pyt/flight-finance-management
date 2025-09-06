// File: /src/components/FlightTracker.js

import React, { useState, useEffect, useCallback } from 'react';
import { Plane, CheckCircle, Clock, XCircle, Send } from 'lucide-react';
import './FlightTracker.css'; // Make sure you have this CSS file for animations

const FlightTracker = () => {
  const [flightNumberInput, setFlightNumberInput] = useState('');
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [progress, setProgress] = useState(0);
  const [calculatedStatus, setCalculatedStatus] = useState('N/A');

  const getToken = () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo).token : null;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFlightData(null);

    const token = getToken();
    if (!token) {
      setError('Admin token not found. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      // --- START OF FIX ---
      // CORRECTED: The URL now includes '/admin/' to match the new, secure backend route.
      const response = await fetch(`/api/flights/admin/status/${flightNumberInput}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      // --- END OF FIX ---

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch flight data');
      setFlightData(data);
    } catch (err) {
      // This will now correctly catch backend errors like "Flight not found".
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    const token = getToken();
    if (!flightData || !token) {
        setError("Cannot update status without a selected flight or token.");
        return;
    }

    try {
      // --- START OF FIX ---
      // CORRECTED: This URL is also updated to include '/admin/'.
      const response = await fetch(`/api/flights/admin/status/${flightData._id}`, {
      // --- END OF FIX ---
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update status');
      
      // Update the local state to instantly reflect the change
      setFlightData(data);
      setError(''); // Clear previous errors on success

    } catch (err) {
      setError(err.message);
    }
  };

  const calculateProgress = useCallback(() => {
    // ... (This function is correct and remains unchanged)
    if (!flightData) return;
    const now = new Date().getTime();
    const departure = new Date(flightData.departureTime).getTime();
    const arrival = new Date(flightData.arrivalTime).getTime();
    if (now < departure) {
      setCalculatedStatus('Scheduled');
      setProgress(0);
    } else if (now > arrival) {
      setCalculatedStatus('Landed');
      setProgress(100);
    } else {
      setCalculatedStatus('On Air');
      const totalDuration = arrival - departure;
      const elapsedTime = now - departure;
      const percentage = Math.round((elapsedTime / totalDuration) * 100);
      setProgress(Math.min(100, percentage));
    }
  }, [flightData]);

  useEffect(() => {
    // ... (This hook is correct and remains unchanged)
    calculateProgress();
    const interval = setInterval(() => {
      calculateProgress();
    }, 30000);
    return () => clearInterval(interval);
  }, [flightData, calculateProgress]);

  const getStatusIcon = (status) => {
    // ... (This function is correct and remains unchanged)
    switch(status) {
      case 'On-Time':
      case 'Landed':
        return <CheckCircle className="text-green-500 mr-2" />;
      case 'Delayed':
        return <Clock className="text-orange-500 mr-2" />;
      case 'Cancelled':
        return <XCircle className="text-red-500 mr-2" />;
      default:
        return <Plane className="text-blue-500 mr-2" />;
    }
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-inner">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Flight Tracker</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={flightNumberInput}
          onChange={(e) => setFlightNumberInput(e.target.value.toUpperCase())}
          placeholder="Enter Flight Number (e.g., SK101)"
          className="flex-grow p-2 border rounded-md shadow-sm"
        />
        <button type="submit" disabled={loading} className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 flex items-center">
          <Send size={18} className="mr-2"/>{loading ? 'Searching...' : 'Track'}
        </button>
      </form>

      {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md mb-6">{error}</p>}
      
      {flightData && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div>
              <h3 className="text-2xl font-bold text-indigo-700">{flightData.flightNumber}</h3>
              <p className="text-lg text-gray-600">{flightData.origin} &rarr; {flightData.destination}</p>
            </div>
            <div className="flex items-center text-lg font-semibold bg-gray-100 px-3 py-1 rounded-full">
              {getStatusIcon(flightData.status)}
              {flightData.status}
            </div>
          </div>
          <div className="my-6">
            <div className="flex justify-between font-mono text-sm mb-1">
                <span>{calculatedStatus}</span>
                <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-blue-500 h-4 rounded-full progress-bar-inner" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Departed: {new Date(flightData.departureTime).toLocaleTimeString()}</span>
                <span>Arrival: {new Date(flightData.arrivalTime).toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-center pt-4 border-t">
            <p className="text-sm font-medium">Update Status:</p>
            <button onClick={() => handleUpdateStatus('On-Time')} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200">On-Time</button>
            <button onClick={() => handleUpdateStatus('Delayed')} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm hover:bg-orange-200">Delayed</button>
            <button onClick={() => handleUpdateStatus('Cancelled')} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm hover:bg-red-200">Cancelled</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightTracker;