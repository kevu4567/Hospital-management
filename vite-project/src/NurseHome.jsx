import React from "react";
import { useNavigate } from "react-router-dom";

function NurseHome() {
  const navigate = useNavigate();

  // Handler functions for button clicks
  const handleUpdateInfo = () => navigate("/update-info");
  const handleScheduleTime = () => navigate("/schedule-time");
  //const handleCancelTime = () => navigate("/cancel-time");
  const handleViewInfo = () => navigate("/view-info");
  const handleRecordVaccination = () => navigate("/nurse-vaccine");

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Nurse Home</h1>
      <div style={buttonContainerStyle}>
        <button onClick={handleUpdateInfo} style={buttonStyle}>
          Update Info
        </button>
        <button onClick={handleScheduleTime} style={buttonStyle}>
          Schedule
        </button>
        <button onClick={handleRecordVaccination} style={buttonStyle}>
          Vaccination
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

export default NurseHome;
