import React from "react";
import { useNavigate } from "react-router-dom";

function PatientHome() {
  const navigate = useNavigate();

  // Handler functions for button clicks
  const handleUpdateInfo = () => navigate("/update-patient-info");
  const handleScheduleAppointment = () => navigate("/select-timeslot");
  const handleCancelAppointment = () => navigate("/cancel-appointment");
  const handleViewInfo = () => navigate("/view-info");

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Patients Home</h1>
      <div style={buttonContainerStyle}>
        <button onClick={handleUpdateInfo} style={buttonStyle}>
          Update Info
        </button>
        <button onClick={handleScheduleAppointment} style={buttonStyle}>
          Schedule
        </button>
        <button onClick={handleViewInfo} style={buttonStyle}>
          View Info
        </button>
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "55vh",
  paddingTop: "0px", // Adjust the padding-top to set how far down from the top the content should start.
};

const headerStyle = {
  marginBottom: "20px", // Space between the header and the button container
};

const buttonContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const buttonStyle = {
  margin: "10px 0", // Vertical spacing between buttons
  padding: "10px 20px", // Padding inside the buttons
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  width: "200px", // Set a fixed width for all buttons
};

export default PatientHome;
