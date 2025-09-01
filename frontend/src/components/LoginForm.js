import React, { useState } from "react";
import API from "../api";

function LoginForm({ onLogin, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      // This API call is successful, as proven by your screenshot's "200 OK" status.
      const res = await API.post("/api/auth/login", { email, password });
      
      // Store the entire user object, including the token, in local storage.
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      
      // This function tells the parent component about the successful login.
      if (onLogin) {
        onLogin(res.data.role);
      }

      // THE FINAL FIX: Force a page reload. This is the most reliable way 
      // to update the entire application to a "logged-in" state.
      window.location.reload();

    } catch (err) {
      // This code runs if the API call fails (e.g., wrong password).
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
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
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
        {error && <div className="text-red-600 text-center">{error}</div>}
        <div className="bg-blue-50 text-blue-900 text-xs rounded p-2 mt-2 text-center">
          <b>Demo Accounts:</b><br />
          Admin: <code>admin@airline.com | demo123</code><br/>
          User: <code>user@airline.com | demo123</code>
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