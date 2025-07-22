// import React from "react";

// function LandingPage({ onShowFlights, onShowLogin, onShowSignup, onShowBooking }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#7b2ff2] via-[#f357a8] to-[#38b6ff] flex items-center justify-center px-4">
//       <div className="bg-white bg-opacity-95 rounded-3xl shadow-2xl p-10 max-w-xl w-full flex flex-col items-center">
//         {/* Flight logo as SVG */}
//         <div className="mb-4">
//           <svg viewBox="0 0 64 64" width={64} height={64} fill="none">
//             <ellipse cx="32" cy="32" rx="32" ry="32" fill="#7b2ff2" />
//             <path
//               d="M32 16l4 12h12l-10 7 4 12-10-7-10 7 4-12-10-7h12l4-12z"
//               fill="#fff"
//               stroke="#fff"
//               strokeWidth={1.5}
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>
//         <h1 className="text-3xl font-bold text-[#51267b] mb-2 text-center">
//           Welcome to Flight Finance Management System
//         </h1>
//         <p className="text-gray-600 text-center mb-6">
//           Your portal for seamless flight operations and finance insights.
//         </p>
//         {/* Airplane illustration */}
//         <img
//           src="https://cdn.pixabay.com/photo/2016/04/01/09/29/airplane-1299282_1280.png"
//           alt="Airplane"
//           className="w-48 mb-6 hover:scale-110 transition-transform duration-300 shadow-lg rounded-2xl"
//           draggable="false"
//           style={{ userSelect: "none" }}
//         />
//         <div className="flex flex-col gap-5 w-full">
//           <button
//             className="w-full py-3 bg-gradient-to-r from-[#7b2ff2] to-[#f357a8] text-white font-semibold text-lg rounded-xl shadow-lg hover:scale-105 transition"
//             onClick={onShowFlights}
//           >
//             View Flights
//           </button>
//           <button
//             className="w-full py-3 bg-[#38b6ff] text-white font-semibold text-lg rounded-xl shadow-lg hover:scale-105 transition"
//             onClick={onShowLogin}
//           >
//             Login
//           </button>
//           <button
//             className="w-full py-3 bg-white border-2 border-[#7b2ff2] text-[#7b2ff2] font-semibold text-lg rounded-xl shadow-lg hover:bg-[#7b2ff2] hover:text-white transition"
//             onClick={onShowSignup}
//           >
//             Sign Up
//           </button>
//           {/* Book Ticket Button */}
//           <button
//             className="w-full py-3 bg-gradient-to-r from-[#38b6ff] to-[#7b2ff2] text-white font-semibold text-lg rounded-xl shadow-lg hover:scale-105 transition"
//             onClick={onShowBooking}
//           >
//             Book Ticket
//           </button>
//         </div>
//         <footer className="mt-8 text-xs text-gray-400 text-center">
//           &copy; {new Date().getFullYear()} Flight Finance Management.<br />Inspired by Qatar Airways.
//         </footer>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;










import React from "react";

function LandingPage({ onShowFlights, onShowLogin, onShowSignup, onShowBooking }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-95 rounded-3xl shadow-2xl p-10 max-w-xl w-full flex flex-col items-center">
        <div className="mb-4">
          <svg viewBox="0 0 64 64" width={64} height={64} fill="none">
            <ellipse cx="32" cy="32" rx="32" ry="32" fill="#7b2ff2" />
            <path
              d="M32 16l4 12h12l-10 7 4 12-10-7-10 7 4-12-10-7h12l4-12z"
              fill="#fff"
              stroke="#fff"
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-[#51267b] mb-2 text-center">
          Welcome to Flight Finance Management System
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Your portal for seamless flight operations and finance insights.
        </p>
        <img
          src="https://cdn.pixabay.com/photo/2016/04/01/09/29/airplane-1299282_1280.png"
          alt="Airplane"
          className="w-48 mb-6 hover:scale-110 transition-transform duration-300 shadow-lg rounded-2xl"
          draggable="false"
          style={{ userSelect: "none" }}
        />
        <div className="flex flex-col gap-5 w-full">
          <button
            className="w-full py-3 bg-gradient-to-r from-[#7b2ff2] to-[#f357a8] text-white font-semibold text-lg rounded-xl shadow-lg hover:scale-105 transition"
            onClick={onShowFlights}
          >
            View Flights
          </button>
          <button
            className="w-full py-3 bg-gradient-to-r from-[#38b6ff] to-[#7b2ff2] text-white font-semibold text-lg rounded-xl shadow-lg hover:scale-105 transition"
            onClick={onShowBooking}
          >
            Book Ticket
          </button>
          <button
            className="w-full py-3 bg-[#38b6ff] text-white font-semibold text-lg rounded-xl shadow-lg hover:scale-105 transition"
            onClick={onShowLogin}
          >
            Login
          </button>
          <button
            className="w-full py-3 border-2 border-[#7b2ff2] text-[#7b2ff2] font-semibold text-lg rounded-xl shadow-lg hover:bg-[#7b2ff2] hover:text-white transition"
            onClick={onShowSignup}
          >
            Sign Up
          </button>
        </div>
        <footer className="mt-8 text-xs text-gray-400 text-center">
          &copy; {new Date().getFullYear()} Flight Finance Management.<br />Inspired by Qatar Airways.
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
