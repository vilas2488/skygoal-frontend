// components/ProfilePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ user, logout }) => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleUpdatePassword = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    // Replace this with actual API call
    console.log(`Updating password for ${user.email} to ${newPassword}`);
    try {
    const response = await fetch("https://skygoal-backend-afez.onrender.com/user/update-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // assuming JWT is stored in user.token
      },
      body: JSON.stringify({
        newPassword: newPassword,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to update password");
    }

    setMessage("Password updated successfully!");
    setNewPassword("");
  } catch (error) {
    console.error("Error updating password:", error);
    setMessage("Failed to update password1");
  }

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
