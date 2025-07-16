// components/HomePage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ currentUser, logout }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Replace with API call in real app
    setUsers([
      { id: 1, name: "Alice", email: "alice@example.com" },
      { id: 2, name: "Bob", email: "bob@example.com" },
      { id: 3, name: "Vilas", email: "vilas@example.com" },
    ]);
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Welcome, {currentUser?.name || "User"}</h3>
        <div>
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <h4>All Users</h4>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item">
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
