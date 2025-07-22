// FeedbackModal.js
import React, { useState, useEffect } from "react"; // Added useEffect
import API from "../api";

function FeedbackModal({ show, onClose, flight, userEmail }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(userEmail || "");
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Use useEffect to update email state when userEmail prop changes
  useEffect(() => {
    setEmail(userEmail || "");
  }, [userEmail]);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      // Ensure all required fields are sent, especially flightNumber
      await API.post("/feedbacks", {
        flightNumber: flight.flightNumber, // Make sure flight.flightNumber is correctly passed
        name,
        email,
        feedback,
      });
      setSuccess("Thank you for your feedback!");
      setName("");
      setEmail(userEmail || ""); // Reset email to userEmail or empty after successful submission
      setFeedback("");
    } catch (err) {
      console.error("Feedback submission error:", err.response ? err.response.data : err.message); // Log the actual error for debugging
      setError("Could not submit feedback. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >×</button>
        <h3 className="text-xl font-semibold text-[#7b2ff2] mb-4 text-center">
          Give Feedback for Flight {flight?.flightNumber} {/* Added optional chaining for safety */}
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border rounded px-3 py-2"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            className="border rounded px-3 py-2"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <textarea
            className="border rounded px-3 py-2"
            placeholder="Your feedback"
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            rows={3}
            required
          />
          <button
            className="bg-[#7b2ff2] text-white rounded py-2 font-semibold hover:bg-[#51267b] transition"
            type="submit"
          >
            Submit Feedback
          </button>
        </form>
        {success && <div className="mt-3 text-green-700 text-center">{success}</div>}
        {error && <div className="mt-3 text-red-600 text-center">{error}</div>}
      </div>
    </div>
  );
}

export default FeedbackModal;