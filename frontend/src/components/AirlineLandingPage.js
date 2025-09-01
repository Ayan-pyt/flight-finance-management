import React, { useState } from 'react';
import { Menu, X, Plane, Shield, Globe, Award, Star } from 'lucide-react';
import FlightSearch from './FlightSearch';
import API from '../api'; // === IMPORT OUR CORRECT API CLIENT ===

// --- Login Modal Component (CORRECTED) ---
const LoginModal = ({ show, onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);
   
    try {
      // === FIXED: Use the API client which correctly uses the proxy ===
      const { data } = await API.post('/api/auth/login', { email, password });
     
      // === FIXED: Save the entire user object to 'userInfo' to match App.js ===
      localStorage.setItem("userInfo", JSON.stringify(data));
      
      // Pass the user's role up to the App component
      onLogin(data.role);
      onClose();

    } catch (err) {
      // Show a more specific error from the backend if available
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
        <div className="text-center mb-6"><h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2><p className="text-gray-600">Sign in to your account</p></div>
        <div className="space-y-4">
          <div><input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} onKeyPress={handleKeyPress} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required /></div>
          <div><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required /></div>
          {error && (<div className="text-red-600 text-sm text-center">{error}</div>)}
          <button onClick={handleSubmit} disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50">{isLoading ? "Signing in..." : "Sign In"}</button>
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg"><p className="text-sm text-blue-800 font-semibold">Demo Accounts:</p><p className="text-xs text-blue-600">Admin: admin@airline.com | demo123</p><p className="text-xs text-blue-600">User: user@airline.com | demo123</p></div>
      </div>
    </div>
  );
};

// --- Signup Modal Component (CORRECTED) ---
const SignupModal = ({ show, onClose, onSignupSuccess }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    if (!formData.name || !formData.email || !formData.password) { setError("Please fill in all fields"); return; }
    if (formData.password !== formData.confirmPassword) { setError("Passwords do not match"); return; }
    if (formData.password.length < 6) { setError("Password must be at least 6 characters long"); return; }
    setIsLoading(true);
    try {
      // === FIXED: Use the API client which correctly uses the proxy ===
      await API.post('/api/auth/signup', { name: formData.name, email: formData.email, password: formData.password });

      onSignupSuccess();
      onClose();
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      
    } catch (err) {
       if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => { if (e.key === 'Enter') handleSubmit(); };
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
        <div className="text-center mb-6"><h2 className="text-2xl font-bold text-gray-900">Create Account</h2><p className="text-gray-600">Join SkyLine Airways today</p></div>
        <div className="space-y-4">
          <div><input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} onKeyPress={handleKeyPress} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required /></div>
          <div><input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleInputChange} onKeyPress={handleKeyPress} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required /></div>
          <div><input type="password" name="password" placeholder="Password (min. 6 characters)" value={formData.password} onChange={handleInputChange} onKeyPress={handleKeyPress} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required /></div>
          <div><input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} onKeyPress={handleKeyPress} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required /></div>
          {error && (<div className="text-red-600 text-sm text-center">{error}</div>)}
          <button onClick={handleSubmit} disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50">{isLoading ? "Creating Account..." : "Create Account"}</button>
        </div>
        <div className="mt-6 text-center"><p className="text-sm text-gray-600">By creating an account, you agree to our Terms of Service and Privacy Policy</p></div>
      </div>
    </div>
  );
};

// --- Main Landing Page Component ---
const AirlineLandingPage = ({ onLogin, onFlightSearch }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSignupSuccess = () => {
    setSignupSuccess(true);
    setTimeout(() => {
      setSignupSuccess(false);
      setShowLoginModal(true);
    }, 3000);
  };

  const destinations = [ { city: "London", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop", price: "From $890" }, { city: "Tokyo", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop", price: "From $1,300" }, { city: "Paris", image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop", price: "From $760" }, { city: "Sydney", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", price: "From $1,045" } ];
  const features = [ { icon: Shield, title: "Safe & Secure", description: "Your safety is our top priority" }, { icon: Globe, title: "Global Network", description: "Connecting you to over 100 destinations" }, { icon: Award, title: "Award Winning", description: "Recognized for excellence in service" }, { icon: Star, title: "Premium Experience", description: "Luxury and comfort at every step" } ];

  return (
    <div className="min-h-screen bg-gray-50">
      {signupSuccess && (<div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"><p>Account created successfully! Please sign in.</p></div>)}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex justify-between items-center h-16"><div className="flex items-center"><div className="flex-shrink-0 flex items-center"><Plane className="text-blue-600 mr-2" size={32} /><span className="text-xl font-bold text-gray-900">SkyLine Airways</span></div></div><div className="hidden md:block"><div className="ml-10 flex items-baseline space-x-8"><a href="#destinations" className="text-gray-700 hover:text-blue-600 font-medium">Destinations</a><a href="#experience" className="text-gray-700 hover:text-blue-600 font-medium">Experience</a><a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a><div className="flex space-x-4"><button onClick={() => setShowLoginModal(true)} className="text-blue-600 px-4 py-2 rounded-full border border-blue-600 hover:bg-blue-50">Sign In</button><button onClick={() => setShowSignupModal(true)} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">Sign Up</button></div></div></div><div className="md:hidden"><button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 hover:text-blue-600">{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</button></div></div></div>
        {mobileMenuOpen && (<div className="md:hidden bg-white border-t"><div className="px-2 pt-2 pb-3 space-y-1"><a href="#destinations" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Destinations</a><a href="#experience" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Experience</a><a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">About</a><button onClick={() => setShowLoginModal(true)} className="block w-full text-left px-3 py-2 text-blue-600 font-medium">Sign In</button><button onClick={() => setShowSignupModal(true)} className="block w-full text-left px-3 py-2 bg-blue-600 text-white font-medium rounded-lg mx-3 my-2">Sign Up</button></div></div>)}
      </nav>
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"><div className="text-center"><h1 className="text-4xl md:text-6xl font-bold mb-6">Fly Beyond<span className="block text-blue-200">Expectations</span></h1><p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Experience world-class service, exceptional comfort, and seamless travel.</p></div></div>
      </section>
      <section className="relative -mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FlightSearch onFlightSearch={onFlightSearch} />
      </section>
      <section id="destinations" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12"><h2 className="text-3xl font-bold text-gray-900">Popular Destinations</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{destinations.map((dest, index) => (<div key={index} className="group cursor-pointer"><div className="relative overflow-hidden rounded-2xl shadow-lg"><img src={dest.image} alt={dest.city} className="w-full h-64 object-cover group-hover:scale-110 transition-transform" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div><div className="absolute bottom-4 left-4 text-white"><h3 className="text-2xl font-bold">{dest.city}</h3><p>{dest.price}</p></div></div></div>))}</div>
      </section>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p className="text-center text-gray-400">&copy; 2024 SkyLine Airways. All rights reserved.</p></div>
      </footer>
      <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={onLogin} />
      <SignupModal show={showSignupModal} onClose={() => setShowSignupModal(false)} onSignupSuccess={handleSignupSuccess} />
    </div>
  );
};

export default AirlineLandingPage;



