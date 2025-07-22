// import React, { useState } from "react";
// import LandingPage from "./components/LandingPage";
// import BookingModal from "./components/BookingModal";
// // ...other imports...

// function App() {
//   const [showBooking, setShowBooking] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
//   const [userEmail, setUserEmail] = useState(""); // set this on login/signup

//   // ... your existing logic ...

//   return (
//     <>
//       <LandingPage
//         // ...other props...
//         onShowBooking={() => setShowBooking(true)}
//       />
//       <BookingModal
//         show={showBooking}
//         onClose={() => setShowBooking(false)}
//         userEmail={userEmail}
//       />
//       {/* ...rest of your code */}
//     </>
//   );
// }

// export default App;




import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import FlightList from "./components/FlightList";
import BookingModal from "./components/BookingModal";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  const [view, setView] = useState("landing");
  const [showBooking, setShowBooking] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState(""); // update after login/signup

  const renderView = () => {
    switch (view) {
      case "flights":
        return <FlightList onBack={() => setView("landing")} />;
      case "login":
        return (
          <LoginForm
            onBack={() => setView("landing")}
            onLogin={(email) => {
              setLoggedIn(true);
              setUserEmail(email);
              setView("landing");
            }}
          />
        );
      case "signup":
        return (
          <SignupForm
            onBack={() => setView("landing")}
            onSignup={(email) => {
              setLoggedIn(true);
              setUserEmail(email);
              setView("landing");
            }}
          />
        );
      case "landing":
      default:
        return (
          <LandingPage
            onShowFlights={() => setView("flights")}
            onShowLogin={() => setView("login")}
            onShowSignup={() => setView("signup")}
            onShowBooking={() => setShowBooking(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-[#7b2ff2] via-[#f357a8] to-[#38b6ff]">
      {renderView()}
      <BookingModal
        show={showBooking}
        onClose={() => setShowBooking(false)}
        userEmail={userEmail}
      />
    </div>
  );
}

export default App;
