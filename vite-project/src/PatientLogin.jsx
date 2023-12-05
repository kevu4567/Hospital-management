import React from "react";
import { useState } from "react";
import "./PatientLogin.css"; // make sure to create this CSS file
import { useNavigate } from "react-router-dom";

const PatientLogin = () => {
  const [username, setUsername] = useState(""); // State to store the username input
  const [password, setPassword] = useState(""); // State to store the password input
  const navigate = useNavigate(); // Initialize the navigate function

  // This would be in your Login component
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Replace this with your actual login API endpoint
      const response = await fetch("http://localhost:3000/Patients/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok && data.message === "Login successful") {
        console.log("Login successful with data:", data);
        localStorage.setItem("patientData", JSON.stringify(data.user));
        console.log("Login successful with data:", data);
        // If login is successful, store the token (or any other session data)
        localStorage.setItem("patientSSN", data.user.ssn);
        localStorage.setItem("token", data.token); // Make sure your backend provides a token or some session identifier
        // And navigate to PatientHome
        navigate("/patient-home"); // Ensure you have a route set up for this path in your React Router
      } else {
        // Handle login failure
        alert("Login failed. Please check your username and password.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during login.");
    }
  };

  // You can add a function to handle sign up action
  const handleSignUp = () => {
    navigate("/signup");
    // Implement your sign-up logic here, for example, redirect to sign-up page
    console.log("Redirecting to sign-up page...");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">Patient Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update the username state on change
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update the password state on change
            />
          </div>
          <button className="submit-button" type="submit">
            Login
          </button>

          {/* Add sign-up button */}
          <button
            className="signup-button"
            type="button"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientLogin;
