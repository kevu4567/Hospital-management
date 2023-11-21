import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterNurse() {
  const [nurseData, setNurseData] = useState({
    // Initialize with empty strings
    employeeId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNurseData({ ...nurseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace this with the correct endpoint to your server's API
      const response = await fetch("http://localhost:3000/Nurses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nurseData),
      });

      if (response.ok) {
        // Handle a successful registration
        console.log("Nurse registered successfully");
        navigate("/admin-home"); // Redirect to the admin home page
      } else {
        // Handle errors
        console.error("Failed to register nurse");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{ textAlign: "center", color: "#333", marginBottom: "1.5rem" }}
      >
        Register Nurse
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="number"
            name="employeeId"
            value={nurseData.employeeId}
            onChange={handleChange}
            placeholder="Employee ID"
            required
            style={{
              padding: "0.8rem",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
        </div>
        <div>
          <input
            type="text"
            name="firstName"
            value={nurseData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            style={{
              padding: "0.8rem",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
        </div>
        <div>
          <input
            type="text"
            name="middleName"
            value={nurseData.middleName}
            onChange={handleChange}
            placeholder="Middle Name"
            style={{
              padding: "0.8rem",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            value={nurseData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            style={{
              padding: "0.8rem",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
        </div>
        <div>
          <input
            type="number"
            name="age"
            value={nurseData.age}
            onChange={handleChange}
            placeholder="Age"
            required
            style={{
              padding: "0.8rem",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
        </div>
        <div>
          <select
            name="gender"
            value={nurseData.gender}
            onChange={handleChange}
            required
            style={{
              padding: "0.8rem",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          >
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <input
            type="number"
            name="phone"
            value={nurseData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            style={{
              padding: "0.8rem",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
        </div>

        <div>
          <input
            type="text"
            name="address"
            value={nurseData.address}
            onChange={handleChange}
            placeholder="Address"
            style={{
              padding: "0.8rem",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
        </div>

        <div>
          <input
            type="text"
            name="username"
            value={nurseData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            style={{
              padding: "0.8rem",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
        </div>
        <input
          type="password"
          name="password"
          value={nurseData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={{
            padding: "0.8rem",
            marginBottom: "1rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "1rem",
          }}
        />
        <div>
          <button
            type="submit"
            style={{
              padding: "1rem",
              backgroundColor: "#5cb85c",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterNurse;
