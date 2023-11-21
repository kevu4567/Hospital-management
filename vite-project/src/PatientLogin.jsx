import React from "react";
import "./PatientLogin.css"; // make sure to create this CSS file
import { useNavigate } from 'react-router-dom';

const PatientLogin = () => {
  const navigate = useNavigate(); // Initialize the navigate function

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
        <form>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
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
