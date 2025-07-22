import React, { useState } from "react";
import API from "../api";

function SignupForm({ switchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await API.post("/auth/register", { email, password });
      setSuccess("Signup successful! You can now log in.");
      setEmail("");
      setPassword("");
      setConfPassword("");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError("Signup failed: " + err.response.data.error);
      } else {
        setError("Signup failed. Email may already be registered.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-50 to-white">
      <form
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-green-700 text-center mb-2">Sign Up</h2>
        <input
          className="border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          autoFocus
        />
        <input
          className="border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />
        <input
          className="border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
          type="password"
          placeholder="Confirm Password"
          value={confPassword}
          required
          onChange={e => setConfPassword(e.target.value)}
        />
        <button
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          type="submit"
        >
          Sign Up
        </button>
        {error && <div className="text-red-600 text-center">{error}</div>}
        {success && <div className="text-green-700 text-center">{success}</div>}
        <button
          type="button"
          onClick={switchToLogin}
          className="text-blue-600 hover:underline mt-2"
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
