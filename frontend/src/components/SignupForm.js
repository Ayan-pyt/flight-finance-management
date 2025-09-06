// // File: /src/components/SignupForm.js

// import React, { useState } from "react";
// import API from "../api";

// function SignupForm({ switchToLogin }) {
//   // NEW: Added 'name' state
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confPassword, setConfPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     if (password !== confPassword) {
//       setError("Passwords do not match.");
//       return;
//     }
//     try {
//       // CORRECTED: The API endpoint is now '/api/auth/signup' and we are sending the 'name'.
//       await API.post("/api/auth/signup", { name, email, password });
      
//       setSuccess("Signup successful! You can now log in.");
//       setName(""); // Clear name field
//       setEmail("");
//       setPassword("");
//       setConfPassword("");
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || "Signup failed. Email may already be registered.";
//       setError(errorMessage);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-white">
//       <form
//         className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">Create Account</h2>
        
//         {/* NEW: Added the input field for 'name' */}
//         <input
//           className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           required
//           onChange={e => setName(e.target.value)}
//           autoFocus
//         />

//         <input
//           className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           type="email"
//           placeholder="Email"
//           value={email}
//           required
//           onChange={e => setEmail(e.target.value)}
//         />
//         <input
//           className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           type="password"
//           placeholder="Password"
//           value={password}
//           required
//           onChange={e => setPassword(e.target.value)}
//         />
//         <input
//           className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           type="password"
//           placeholder="Confirm Password"
//           value={confPassword}
//           required
//           onChange={e => setConfPassword(e.target.value)}
//         />
//         <button
//           className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//           type="submit"
//         >
//           Create Account
//         </button>
//         {error && <div className="text-red-600 text-center text-sm">{error}</div>}
//         {success && <div className="text-green-700 text-center text-sm">{success}</div>}
//         <button
//           type="button"
//           onClick={switchToLogin}
//           className="text-blue-600 hover:underline mt-2 text-sm"
//         >
//           Already have an account? Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignupForm;



// File: /src/components/SignupForm.js

import React, { useState } from "react";
import API from "../api";

function SignupForm({ switchToLogin }) {
  // NEW: Added 'name' state
  const [name, setName] = useState("");
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
      // CORRECTED: The API endpoint is now '/api/auth/signup' and we are sending the 'name'.
      await API.post("/api/auth/signup", { name, email, password });
      
      setSuccess("Signup successful! You can now log in.");
      setName(""); // Clear name field
      setEmail("");
      setPassword("");
      setConfPassword("");
    } catch (err) {
      // CORRECTED: This now displays the specific error message from the backend.
      const errorMessage = err.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-white">
      <form
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">Create Account</h2>
        
        {/* NEW: Added the input field for 'name' */}
        <input
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          placeholder="Full Name"
          value={name}
          required
          onChange={e => setName(e.target.value)}
          autoFocus
        />

        <input
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="password"
          placeholder="Confirm Password"
          value={confPassword}
          required
          onChange={e => setConfPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          type="submit"
        >
          Create Account
        </button>
        {error && <div className="text-red-600 text-center text-sm">{error}</div>}
        {success && <div className="text-green-700 text-center text-sm">{success}</div>}
        <button
          type="button"
          onClick={switchToLogin}
          className="text-blue-600 hover:underline mt-2 text-sm"
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
}

export default SignupForm;