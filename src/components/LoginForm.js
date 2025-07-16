// components/LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = ({ switchToSignup, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ React Router navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      const user = res.data.user;
      onLoginSuccess(user); // ✅ Save user in App
      navigate("/home"); // ✅ Navigate to /home
    } catch (err) {
      setError("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h3 className="mb-3">Login</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label>Email:</label>
        <input
          type="email"
          className="form-control"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password:</label>
        <input
          type="password"
          className="form-control"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Login
      </button>

      <p className="mt-3">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={switchToSignup}
          className="btn btn-link p-0"
        >
          Sign up
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
