import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdatePatientInfo = () => {
  const [patientInfo, setPatientInfo] = useState({
    occupational_class: "",
    medical_history_description: "",
    phone: "",
    address: "",
    password: "", // Be cautious with password management
  });
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("patientUsername");
    
   

    const fetchPatientInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/patients/${username}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Include the auth header
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setPatientInfo({ ...patientInfo, ...data });
        } else {
          console.error("Failed to fetch patient info");
        }
      } catch (error) {
        console.error("Error fetching patient info:", error);
      }
    };

    fetchPatientInfo();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo({ ...patientInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/patients/${username}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the auth header
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientInfo),
        }
      );

      if (response.ok) {
        alert("Information updated successfully!");
        navigate("/patient-home"); // Adjust the route as necessary for your patient home page
      } else {
        const errorData = await response.json();
        alert(`Failed to update information: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating information:", error);
      alert("An error occurred while updating information.");
    }
    
    
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "20px auto",
        backgroundColor: "#f5f5f5",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2>Update Your Information</h2>
      <form onSubmit={handleSubmit}>
        {/* ... other form inputs ... */}
        <div>
          <label style={{ marginBottom: "20px" }}>
            Occupational Class:
            <input
              type="text"
              name="occupational_class"
              value={patientInfo.occupational_class}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </label>
        </div>
        <div>
          <label style={{ marginBottom: "20px" }}>
            Medical History Description:
            <textarea
              name="medical_history_description"
              value={patientInfo.medical_history_description}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label style={{ marginBottom: "20px" }}>
            Phone:
            <input
              type="tel"
              name="phone"
              value={patientInfo.phone}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label style={{ marginBottom: "20px" }}>
            Address:
            <input
              type="text"
              name="address"
              value={patientInfo.address}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label style={{ marginBottom: "20px" }}>
            Password:
            <input
              type="password"
              name="password"
              value={patientInfo.password}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit" style={buttonStyle}>
          Update Info
        </button>
      </form>
    </div>
  );
};

 const inputStyle = {
   width: "200px",
   padding: "8px",
   margin: "10px 0",
   borderRadius: "4px",
   border: "1px solid #ccc",
 };

 const buttonStyle = {
   padding: "10px 15px",
   backgroundColor: "#4CAF50",
   color: "white",
   border: "none",
   borderRadius: "4px",
   cursor: "pointer",
   width: "100%",
   marginTop: "20px",
 };

export default UpdatePatientInfo;
