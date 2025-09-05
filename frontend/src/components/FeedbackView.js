// frontend/src/components/FeedbackView.js
import React, { useState } from 'react';
import API from '../api'; // Your API instance is set up
import { Star, Send } from 'lucide-react';

const FeedbackView = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    flightNumber: '',
    rating: 0,
    feedback: '',
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    if (!formData.name || !formData.email || !formData.feedback) {
      setError('Please fill in your name, email, and feedback message.');
      return;
    }

    setLoading(true);
    try {
      // --- START OF FIX ---
      // CORRECTED: Added the required '/api' prefix to the URL to match the backend route.
      const response = await API.post('/api/feedback', formData);
      // --- END OF FIX ---

      if (response.data.success) {
        setSuccess('Thank you! Your feedback has been submitted successfully.');
        // Reset form
        setFormData({ name: '', email: '', flightNumber: '', rating: 0, feedback: '' });
      } else {
        setError(response.data.error || 'An unknown error occurred.');
      }
    } catch (err) {
      setError('Failed to submit feedback. Please check your connection and try again.');
      console.error('Feedback submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Share Your Feedback</h1>
            <p className="text-gray-600 mt-2">We value your opinion and strive to improve our service.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Star Rating */}
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">Overall Experience</label>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`cursor-pointer transition-colors duration-200`}
                      size={32}
                      color={ (hoverRating || formData.rating) >= star ? '#f59e0b' : '#d1d5db' }
                      fill={ (hoverRating || formData.rating) >= star ? '#f59e0b' : 'none' }
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormData({ ...formData, rating: star })}
                    />
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                </div>
              </div>
              <div>
                <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-700">Flight Number (Optional)</label>
                <input type="text" name="flightNumber" id="flightNumber" value={formData.flightNumber} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., SK404" />
              </div>
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Your Feedback</label>
                <textarea name="feedback" id="feedback" rows="4" value={formData.feedback} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required></textarea>
              </div>
            </div>

            {/* Messages and Submit Button */}
            <div className="mt-8">
              {error && <p className="text-red-600 text-center mb-4">{error}</p>}
              {success && <p className="text-green-600 text-center mb-4">{success}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <Send size={18} className="mr-2" />
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackView;