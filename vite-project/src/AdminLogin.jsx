import React, { useState } from "react"; // Import useState here
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  
  const [username, setUsername] = useState(""); // Now useState is defined
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // You need to update the endpoint to match your backend API
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle login success
        console.log("Login successful with data:", data);
        localStorage.setItem("token", data.token); // Example: storing the token
        navigate("/admin-home"); // Navigate to the admin home page
      } else {
        // Handle login failure
        console.error("Login failed", response.statusText);
      }
    } catch (error) {
      console.error("There was an error logging in", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">Admin Login</h2>
        <form onSubmit={handleSubmit}>
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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

export default AdminLogin;
