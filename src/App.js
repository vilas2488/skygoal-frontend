// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import VerifyOtpForm from "./components/VerifyOtpForm";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";

function App() {
  const [signupEmail, setSignupEmail] = useState("");
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLoginSuccess = (userData) => {
    localStorage.setItem("authUser", JSON.stringify(userData)); // ✅ store in localStorage
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser"); // ✅ remove from localStorage
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="container py-4">
        <h2 className="text-center mb-4">Auth App</h2>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route
            path="/login"
            element={
              <LoginForm
                switchToSignup={() => (window.location.href = "/signup")}
                onLoginSuccess={(user) => {
                  handleLoginSuccess(user);
                  window.location.href = "/home";
                }}
              />
            }
          />

          <Route
            path="/signup"
            element={
              <SignupForm
                switchToLogin={() => (window.location.href = "/login")}
                switchToOtp={(email) => {
                  setSignupEmail(email);
                  window.location.href = "/verify";
                }}
              />
            }
          />

          <Route
            path="/verify"
            element={
              <VerifyOtpForm
                email={signupEmail}
                switchToLogin={() => (window.location.href = "/login")}
              />
            }
          />

          <Route
            path="/home"
            element={
              currentUser ? (
                <HomePage
                  currentUser={currentUser}
                  goToProfile={() => (window.location.href = "/profile")}
                  logout={() => {
                    handleLogout();
                    window.location.href = "/login";
                  }}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/profile"
            element={
              currentUser ? (
                <ProfilePage
                  user={currentUser}
                  backToHome={() => (window.location.href = "/home")}
                  logout={() => {
                    handleLogout();
                    window.location.href = "/login";
                  }}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
