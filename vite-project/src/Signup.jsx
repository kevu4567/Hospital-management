// Signup.jsx

import React, { useState } from "react";
import "./Signup.css"; // Your CSS file for styling

const Signup = () => {
  // State for the input fields
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    ssn: "",
    age: "",
    gender: "",
    race: "",
    occupationalClass: "",
    medicalHistory: "",
    phone: "",
    address: "",
    username: "",
    password: "",
  });

    const races = ["White", "Hispanic", "Asian", "Black", "Other"];
    const genders = ["Male", "Female", "Other"];


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    // TODO: Implement validation for SSN, age, and other fields as necessary

    try {
      const response = await fetch("http://localhost:3000/Patients/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Signup successful", data);
        // Redirect the user to the patient-login page
        window.location.href = "/patient-login"; // Update with your actual route
      } else {
        alert(`Signup failed: ${data.error}`);
      }
    } catch (err) {
      console.error("Signup failed", err);
      alert("An error occurred. Please try again later.");
    }
  };


  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-heading">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <input
              className="form-control"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              name="middleName"
              type="text"
              placeholder="Middle Name"
              value={formData.middleName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              name="ssn"
              type="number"
              placeholder="SSN: XXX-XX-XXXX"
              value={formData.ssn}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              name="age"
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <select
              className="form-control"
              name="race"
              value={formData.race}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Race</option>
              {races.map((race) => (
                <option key={race} value={race}>
                  {race}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              className="form-control"
              name="occupationalClass"
              type="text"
              placeholder="Occupational Class"
              value={formData.occupationalClass}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              className="form-control"
              name="medicalHistory"
              type="text"
              placeholder="Medical History"
              value={formData.medicalHistory}
              onChange={handleInputChange}
              required
              style={{
                height: "100px",
                fontSize: "16px",
                width: "100%",
                resize: "vertical",
              }}
            />
          </div>

          <div className="form-group">
            <select
              className="form-control"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              className="form-control"
              name="phone"
              type="number"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              name="address"
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              name="username"
              type="text"
              placeholder="Create Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleInputChange}
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
