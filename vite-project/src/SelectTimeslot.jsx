import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SelectTimeslot.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const SelectTimeslot = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [scheduledSlots, setScheduledSlots] = useState([]);

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
  }, []);

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
      <h1>Select a Timeslot for Vaccination</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Available Timeslots:
            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              required
            >
              <option value="">Select a slot</option>
              {timeSlots.map((slot) => (
                <option key={slot.slot_id} value={slot.slot_id}>
                  {`${slot.date} - ${slot.start_time} to ${slot.end_time} (Patients: ${slot.patient_count}, Nurses: ${slot.nurse_count})`}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Book Timeslot</button>
        </form>
      </div>

      <div className="table-container">{renderTimeSlotsTable()}</div>
    </div>
  );
};

export default SelectTimeslot;
