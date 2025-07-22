import React, { useState } from "react";
import API from "../api";

function LoginForm({ onLogin, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white">
      <form
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">Login</h2>
        <input
          className="border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          autoFocus
        />
        <input
          className="border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          type="submit"
        >
          Login
        </button>
        {error && <div className="text-red-600 text-center">{error}</div>}
        <div className="bg-blue-50 text-blue-900 text-xs rounded p-2 mt-2 text-center">
          <b>Demo Login:</b><br />
          Email: <code>demo@flight.com</code><br />
          Password: <code>demo123</code>
        </div>
        <button
          type="button"
          onClick={switchToSignup}
          className="text-blue-600 hover:underline mt-2"
        >
          New user? Sign up
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
