import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SelectTimeslot.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const AdminVaccine = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [scheduledSlots, setScheduledSlots] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    console.log("Fetching time slots...");
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.get("http://localhost:3000/timeslots");
        console.log("Time slots fetched successfully:", response.data);
        setTimeSlots(response.data);
      } catch (error) {
        console.error("Error fetching time slots", error);
      }
    };

    fetchTimeSlots();
  }, []);

  useEffect(() => {
    // Fetch the list of scheduled timeslots from the backend
    const fetchScheduledSlots = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/scheduled-timeslots"
        );
        setScheduledSlots(response.data);
      } catch (error) {
        console.error("Error fetching scheduled timeslots", error);
      }
    };

    fetchScheduledSlots();
    fetchPatients(); // Fetch patients data
  }, []);

  // Function to fetch patients data
  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/patients"); // Update the URL as per your API
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients", error);
    }
  };
  // Function to render the patients table
  
  const renderPatientsTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Medical History</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.f_name}</td>
              <td>{patient.l_name}</td>
              <td>{patient.medical_history_description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/schedule-timeslot",
        { slot_id: selectedSlot }
      );
      alert("Timeslot booked successfully!");
      // Refresh the list of scheduled timeslots after booking
      fetchScheduledSlots();
    } catch (error) {
      alert("Error booking timeslot");
      console.error("Error submitting timeslot", error);
    }
  };

  const renderTimeSlotsTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Slot ID</th>
            <th>Nurse Count</th>
            <th>Patient Count</th>
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot) => (
            <tr key={slot.slot_id}>
              <td>{slot.slot_id}</td>
              <td>{slot.nurse_count}</td>
              <td>{slot.patient_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleCancelAppointment = async (slotId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/cancel-timeslot/${slotId}`
      );
      alert("Timeslot canceled successfully!");
      // Refresh the list of scheduled timeslots after cancellation
      fetchScheduledSlots();
    } catch (error) {
      alert("Error canceling timeslot");
      console.error("Error canceling timeslot", error);
    }
  };

  return (
    <div className="page-container">
      <h1>Vaccine Schedule</h1>
      <div className="table-container">{renderTimeSlotsTable()}</div>
      <h1>Patients Information</h1>
      <div className="table-container">{renderPatientsTable()}</div>
    </div>
  );
};

export default AdminVaccine;
