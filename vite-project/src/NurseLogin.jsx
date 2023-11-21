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
     if (response.ok && data.message === "Login successful") {
       console.log("Login successful with data:", data);
       localStorage.setItem("token", data.token); // if token is part of your response
       localStorage.setItem("nurseId", data.user.id); // Store the nurse ID
       navigate("/nurse-home"); // Make sure this path matches your NurseHome route
     } else {
       alert(data.error || "Login failed. Please check your username and password.");
     }
   } catch (err) {
     alert("An error occurred while logging in: " + err.message);
     console.error(err);
   }
 };


  useEffect(() => {
    fetch("http://localhost:3000/Nurses")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

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
