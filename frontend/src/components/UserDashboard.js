import React from 'react';
import FlightSearch from './FlightSearch'; // Import the reusable component
// --- THE FIX: Changed 'Suitcase' to 'Briefcase' ---
import { Plane, Briefcase, Star } from 'lucide-react';

const UserDashboard = ({ onFlightSearch }) => {
  // In a real app, you'd fetch user's name after login
  const userName = "Passenger"; 

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {userName}!</h1>
          <p className="text-gray-600">Ready for your next adventure? Search for flights below.</p>
        </div>

        {/* Flight Search Component */}
        <div className="mb-12">
          <FlightSearch onFlightSearch={onFlightSearch} isInsideDashboard={true} />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            {/* --- THE FIX: Changed 'Suitcase' to 'Briefcase' --- */}
            <Briefcase className="mx-auto text-blue-600 mb-2" size={32} />
            <h3 className="font-semibold text-lg">My Bookings</h3>
            <p className="text-sm text-gray-500">View and manage your upcoming trips.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <Plane className="mx-auto text-blue-600 mb-2" size={32} />
            <h3 className="font-semibold text-lg">Check-in Online</h3>
            <p className="text-sm text-gray-500">Save time at the airport by checking in now.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <Star className="mx-auto text-blue-600 mb-2" size={32} />
            <h3 className="font-semibold text-lg">Loyalty Program</h3>
            <p className="text-sm text-gray-500">Check your points and member benefits.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
