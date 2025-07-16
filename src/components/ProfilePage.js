// components/ProfilePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ user, logout }) => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    // Replace this with actual API call
    console.log(`Updating password for ${user.email} to ${newPassword}`);

    setMessage("Password updated successfully!");
    setNewPassword("");
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Profile - {user?.name || user?.email}</h3>
        <div>
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate("/home")}
          >
            Home
          </button>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <form onSubmit={handleUpdatePassword}>
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Password
        </button>
      </form>

      {message && <div className="alert alert-success mt-3">{message}</div>}
    </div>
  );
};

export default ProfilePage;
