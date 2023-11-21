// Signup.jsx

import React, { useState } from "react";
import "./Signup.css"; // Your CSS file for styling

const Signup = () => {
  // State for the input fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to handle the form submission
  const handleSignup = (event) => {
    event.preventDefault();
    // Add validation and processing logic here
    console.log("Form submitted", {
      username,
      email,
      password,
      confirmPassword,
    });
    // Implement the signup logic, maybe send a request to your server
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-heading">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="submit-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
