import React, { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
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
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    localStorage.setItem("authUser", JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setCurrentUser(null);
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Auth App</h2>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={
            <LoginForm
              switchToSignup={() => navigate("/signup")}
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
              switchToLogin={() => navigate("/login")}
              switchToOtp={(email) => {
                setSignupEmail(email);
                navigate("/verify");
              }}
            />
          }
        />

        <Route
          path="/verify"
          element={
            <VerifyOtpForm
              email={signupEmail}
              switchToLogin={() => navigate("/login")}
            />
          }
        />

        <Route
          path="/home"
          element={
            currentUser ? (
              <HomePage
                currentUser={currentUser}
                goToProfile={() => navigate("/profile")}
                logout={() => {
                  handleLogout();
                  navigate("/login");
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
  );
}

export default App;
