// // frontend/src/components/FlightTracker.js

// import React, { useState } from 'react';
// import { Search, Plane, Clock, CheckCircle } from 'lucide-react';

// // --- Mock Data & API Simulation ---
// // In a real app, this data would come from your database.
// const allFlights = [
//   { _id: '1', flightNo: 'AI202', route: 'JFK-LAX', date: '2025-09-01', status: 'In-Air', progress: 60, timeRemaining: '40 mins' },
//   { _id: '2', flightNo: 'SK404', route: 'CDG-HND', date: '2025-09-02', status: 'Scheduled', progress: 0, timeRemaining: 'N/A' },
//   { _id: '3', flightNo: 'SK501', route: 'LHR-DXB', date: '2025-09-02', status: 'Landed', progress: 100, timeRemaining: '0 mins' },
//   { _id: '4', flightNo: 'SK101', route: 'JFK-LHR', date: '2025-09-03', status: 'Departed', progress: 15, timeRemaining: '5 hours' },
//   { _id: '5', flightNo: 'SK303', route: 'CDG-DXB', date: '2025-09-03', status: 'Delayed', progress: 0, timeRemaining: 'N/A' },
//   { _id: '6', flightNo: 'SK702', route: 'FRA-JFK', date: '2025-09-04', status: 'Cancelled', progress: 0, timeRemaining: 'N/A' },
// ];

// // This simulates fetching a single flight from your backend
// const fetchFlightByDetails = (flightNo) => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       const flight = allFlights.find(f => f.flightNo.toLowerCase() === flightNo.toLowerCase());
//       resolve(flight);
//     }, 1000); // Simulate 1 second network delay
//   });
// };

// // --- The Result Display Component ---
// const FlightTrackerResult = ({ flight }) => {
//     if (!flight) {
//         return (
//             <div className="mt-8 text-center bg-yellow-50 text-yellow-800 p-4 rounded-lg">
//                 <p>No flight found with the provided details.</p>
//             </div>
//         );
//     }

//     const getStatusInfo = () => {
//         switch (flight.status) {
//             case 'In-Air': return { color: 'blue', icon: <Plane className="w-5 h-5" /> };
//             case 'Landed': return { color: 'green', icon: <CheckCircle className="w-5 h-5" /> };
//             case 'Departed': return { color: 'indigo', icon: <Plane className="w-5 h-5 -rotate-45" /> };
//             case 'Delayed': return { color: 'yellow', icon: <Clock className="w-5 h-5" /> };
//             case 'Cancelled': return { color: 'red', icon: <Clock className="w-5 h-5" /> };
//             case 'Scheduled':
//             default: return { color: 'gray', icon: <Clock className="w-5 h-5" /> };
//         }
//     };

//     const { color } = getStatusInfo();
//     const progressBarColor = `bg-${color}-500`;
//     const textColor = `text-${color}-600`;
//     const ringColor = `ring-${color}-500`;

//     return (
//         <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200 animate-fade-in">
//             <div className="flex justify-between items-center">
//                 <h3 className="text-2xl font-bold text-gray-800">
//                     <Plane className="inline-block mr-3 text-blue-600" />
//                     Flight {flight.flightNo}
//                 </h3>
//                 <p className={`font-semibold ${textColor}`}>{flight.route}</p>
//             </div>

//             <div className="mt-6 space-y-2">
//                 <div className="flex justify-between text-sm font-medium text-gray-500">
//                     <span>Takeoff</span>
//                     <span>Landing</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-4">
//                     <div
//                         className={`h-4 rounded-full ${progressBarColor} transition-all duration-1000 ease-out`}
//                         style={{ width: `${flight.progress}%` }}
//                     ></div>
//                 </div>
//                 <div className="text-right text-sm font-semibold text-gray-800">{flight.progress}% Complete</div>
//             </div>

//             <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center justify-center">
//                 <p className={`text-lg font-bold ${textColor}`}>
//                     {flight.status}, {flight.timeRemaining} remaining
//                 </p>
//             </div>
//         </div>
//     );
// };


// // --- The Main Tracker Component ---
// const FlightTracker = () => {
//   const [flightNo, setFlightNo] = useState('');
//   // const [route, setRoute] = useState(''); // Add if needed
//   // const [date, setDate] = useState(''); // Add if needed

//   const [trackedFlight, setTrackedFlight] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);

//   const handleTrackFlight = async (e) => {
//     e.preventDefault();
//     if (!flightNo) return;

//     setIsLoading(true);
//     setHasSearched(true);
//     const result = await fetchFlightByDetails(flightNo);
//     setTrackedFlight(result);
//     setIsLoading(false);
//   };

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 max-w-4xl mx-auto rounded-lg">
//       <h2 className="text-2xl font-bold text-gray-800 mb-2">Live Flight Tracker</h2>
//       <p className="text-gray-500 mb-6">Enter flight details to get real-time status and progress.</p>

//       {/* --- Step 1: Input Form --- */}
//       <form onSubmit={handleTrackFlight} className="bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row items-end gap-4">
//         <div className="flex-grow w-full">
//           <label htmlFor="flightNo" className="block text-sm font-medium text-gray-700">Flight Number</label>
//           <input
//             type="text"
//             id="flightNo"
//             className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//             placeholder="e.g., AI202"
//             value={flightNo}
//             onChange={(e) => setFlightNo(e.target.value)}
//           />
//         </div>
//         {/* You can add more input fields for route and date here if needed */}
//         <button type="submit" className="w-full md:w-auto bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center" disabled={isLoading}>
//           <Search className="w-5 h-5 mr-2" />
//           {isLoading ? 'Tracking...' : 'Track Flight'}
//         </button>
//       </form>
      
//       {/* --- Step 2: Result Display --- */}
//       {isLoading && (
//         <div className="mt-8 text-center">
//           <p className="text-lg font-semibold text-gray-600">Searching for flight...</p>
//         </div>
//       )}

//       {!isLoading && hasSearched && (
//         <FlightTrackerResult flight={trackedFlight} />
//       )}
//     </div>
//   );
// };

// export default FlightTracker;


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