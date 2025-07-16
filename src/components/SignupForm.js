import React, { useState } from "react";
import axios from "axios";

const SignupForm = ({ switchToLogin, switchToOtp }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Signing up...");

    try {
      const res = await axios.post("http://localhost:5000/auth/signup", form);
      setMessage(res.data.message);
      // ✅ switch to OTP form and pass email
      switchToOtp(form.email);
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-md-6">
            <input
              className="form-control"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
            />
          </div>
        </div>
        <input
          className="form-control my-2"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary w-100 mt-2">
          Sign Up
        </button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}

      <div className="text-center mt-3">
        <button className="btn btn-link" onClick={switchToLogin}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
