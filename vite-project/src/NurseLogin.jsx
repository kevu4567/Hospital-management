import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NurseLogin.css"; // make sure to create this CSS file

const NurseLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/Nurses/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.user && data.user.EmployeeID) {
          localStorage.setItem("nurseID", data.user.EmployeeID);
          localStorage.setItem("token", data.token); // If your backend sends a token
          navigate("/nurse-home");
        } else {
          console.error("No user data received");
          alert("Login failed. Please try again.");
        }
      } else {
        alert("Login failed. Please check your username and password.");
        alert(`Login failed: ${data.error}`);
      }
    } catch (err) {
      alert("An error occurred while logging in: " + err.message);
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">Nurse Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="submit-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default NurseLogin;
