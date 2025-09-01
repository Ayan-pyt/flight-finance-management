// File: /src/App.js

import React, { useState, useEffect } from 'react';
import { Plane, Home, Search, BookOpen, MessageSquare, Users, LogOut, Menu, X } from 'lucide-react';

// Import all components
import AirlineLandingPage from './components/AirlineLandingPage';
import AdminDashboard from './components/AdminDashboard';
import FlightList from './components/FlightList';
import UserDashboard from './components/UserDashboard';
import FeedbackView from './components/FeedbackView';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [publicView, setPublicView] = useState('home');
  const [flightSearchQuery, setFlightSearchQuery] = useState(null);

  // === CORRECTION START ===
  // This useEffect now correctly checks for the 'userInfo' object in localStorage.
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      setIsLoggedIn(true);
      setUserRole(parsedUser.role);
    }
    setIsLoading(false);
  }, []);
  // === CORRECTION END ===

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setCurrentView('dashboard');
    setPublicView('home');
  };

  // === CORRECTION START ===
  // The logout function now correctly removes the 'userInfo' item.
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentView('dashboard');
    setPublicView('home');
    setSidebarOpen(false);
    // window.location.reload(); // Optional: force a reload on logout as well
  };
  // === CORRECTION END ===

  const handleFlightSearch = (query) => {
    setFlightSearchQuery(query);
    if (isLoggedIn) {
      setCurrentView('flights');
    } else {
      setPublicView('flights');
    }
  };

  const handleNewSearch = () => {
    setFlightSearchQuery(null);
    setPublicView('home');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }

  if (!isLoggedIn) {
    if (publicView === 'flights') {
      return <FlightList isLoggedIn={false} searchQuery={flightSearchQuery} onNewSearch={handleNewSearch} />;
    }
    // The AirlineLandingPage likely contains your LoginForm. It passes the handleLogin function.
    return <AirlineLandingPage onLogin={handleLogin} onFlightSearch={handleFlightSearch} />;
  }

  // Logged-in experience
  const navigationItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'flights', icon: Search, label: 'Flights' },
    { id: 'bookings', icon: BookOpen, label: 'My Bookings' },
    { id: 'feedback', icon: MessageSquare, label: 'Feedback' },
    ...(userRole === 'admin' ? [{ id: 'admin-panel', icon: Users, label: 'Admin Panel' }] : [])
  ];

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard':
        return userRole === 'admin' 
          ? <AdminDashboard /> 
          : <UserDashboard onFlightSearch={handleFlightSearch} />;
      case 'flights':
        return <FlightList isLoggedIn={isLoggedIn} searchQuery={flightSearchQuery} onNewSearch={() => setCurrentView('dashboard')} />;
      case 'bookings':
        return <BookingsView />;
      case 'feedback':
        return <FeedbackView />;
      case 'admin-panel':
        return userRole === 'admin' ? <AdminDashboard /> : <AccessDenied />;
      default:
        return <UserDashboard onFlightSearch={handleFlightSearch} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-200 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b"><div className="flex items-center"><Plane className="text-blue-600 mr-2" size={32} /><span className="text-xl font-bold text-gray-900">SkyLine</span></div><button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700"><X size={24} /></button></div>
        <div className="p-4 border-b bg-blue-50"><div className="flex items-center"><div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">U</div><div className="ml-3"><p className="text-sm font-medium text-gray-900">User</p><p className="text-xs text-blue-600 font-medium capitalize">{userRole === 'admin' ? 'Administrator' : 'Passenger'}</p></div></div></div>
        <nav className="flex-1 p-4"><ul className="space-y-2">{navigationItems.map((item) => (<li key={item.id}><button onClick={() => { setCurrentView(item.id); setSidebarOpen(false); }} className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${currentView === item.id ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}><item.icon size={20} className="mr-3" />{item.label}</button></li>))}</ul></nav>
        <div className="p-4 border-t"><button onClick={handleLogout} className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><LogOut size={20} className="mr-3" />Logout</button></div>
      </div>
      <div className="flex-1 lg:ml-0"><div className="bg-white shadow-sm border-b p-4 flex items-center justify-between lg:hidden"><button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-700"><Menu size={24} /></button><h1 className="text-lg font-semibold">SkyLine Airways</h1><div className="w-6"></div></div><main className="flex-1">{renderContent()}</main></div>
      {sidebarOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>)}
    </div>
  );
}

// Placeholder components
const BookingsView = () => <div className="p-6"><h1 className="text-2xl font-bold">My Bookings</h1></div>;
const AccessDenied = () => <div className="p-6 text-center text-red-500"><h1 className="text-2xl font-bold">Access Denied</h1></div>;

export default App;