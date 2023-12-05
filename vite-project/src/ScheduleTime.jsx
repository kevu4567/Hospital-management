import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ScheduleTime = () => {
  const [timeslots, setTimeslots] = useState([]);
  const [slotId, setSlotId] = useState(""); // State for the slot_id
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(""); // State for the selected date
  const [startTime, setStartTime] = useState(""); // State for the start time
  const [endTime, setEndTime] = useState(""); // State for the end time
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimeslots = async () => {
      // Fetch the timeslots from the server
      try {
        const response = await fetch("http://localhost:3000/timeslots");
        if (response.ok) {
          const data = await response.json();
          setTimeslots(data);
        } else {
          console.error("Failed to fetch timeslots");
        }
      } catch (error) {
        console.error("Error fetching timeslots", error);
      }
    };

    fetchTimeslots();
  }, []);

   const handleSlotIdChange = (event) => {
     setSlotId(event.target.value);
   };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleSlotSelection = (slotId) => {
    setSelectedSlot(slotId);
  };

  // This code is to cancel the nurse count
 const handleCancel = async (slotId) => {
   const nurseId = "101"; // This should be the ID of the nurse trying to cancel the slot
   try {
     const response = await fetch(
       `http://localhost:3000/cancel-timeslot/${slotId}`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ nurse_id: nurseId }),
       }
     );

     const result = await response.json();
     if (response.ok) {
       console.log(result.message);
       // Refresh the timeslots list here
     } else {
       alert(result.error);
     }
   } catch (error) {
     console.error("Error cancelling timeslot", error);
     alert("Failed to cancel timeslot");
   }
 };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Construct the data object for submission
    const scheduleData = {
      date: selectedDate,
      start_time: startTime,
      end_time: endTime,
      slot_id: slotId,
    };
    console.log("Scheduling with data:", scheduleData);

    try {
      // Replace 'http://localhost:3000/new-timeslot' with your actual API endpoint
      const response = await fetch("http://localhost:3000/new-timeslot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("New timeslot scheduled successfully:", result);
        // Refresh the timeslots list
        fetchTimeslots();
      } else {
        console.error("Failed to schedule new timeslot:", result.message);
      }
    } catch (error) {
      console.error("Error scheduling new timeslot:", error);
    }
  };

  function formatDate(dateString) {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  // Styles
  const containerStyle = {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    backgroundColor: "#ffffff",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column", // changed from 'row' to 'column' for vertical form layout
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  };

  const inputStyle = {
    padding: "10px",
    margin: "0 10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonContainerStyle = {
    // new style for button container
    marginTop: "20px", // adds space between the last input and the button
    display: "flex",
    justifyContent: "center", // centers button horizontally
    width: "100%", // ensures the container takes full width of the form
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "16px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thTdStyle = {
    padding: "12px 15px",
    borderBottom: "1px solid #ddd",
  };

  const headerStyle = {
    background: "#d3d3d3",
    color: "#ffffff",
  };

  const labelStyle = {
    display: "block", // This will make the label take the full width
    marginBottom: "10px", // Adds space below each label
  };

  const inputContainerStyle = {
    marginBottom: "20px", // Adds space below each input container
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center" }}>Schedule Your Time</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>
            Slot ID:
            <input
              type="number" // Assuming slot_id is a number
              value={slotId}
              onChange={handleSlotIdChange}
              style={inputStyle}
            />
          </label>
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>
            Date:
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              style={inputStyle}
            />
          </label>
        </div>
        <div style={inputContainerStyle}>
          <label>
            Start Time:
            <input
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
              style={inputStyle}
            />
          </label>
        </div>
        <div style={inputContainerStyle}>
          <label>
            End Time:
            <input
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
              style={inputStyle}
            />
          </label>
        </div>
        <div style={buttonContainerStyle}>
          <button type="submit" style={buttonStyle}>
            Schedule Time
          </button>
        </div>
      </form>

      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <h3>View Available Timeslots</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ ...thTdStyle, ...headerStyle }}>Slot ID</th>{" "}
              <th style={{ ...thTdStyle, ...headerStyle }}>Date</th>
              <th style={{ ...thTdStyle, ...headerStyle }}>Start Time</th>
              <th style={{ ...thTdStyle, ...headerStyle }}>End Time</th>
              <th style={{ ...thTdStyle, ...headerStyle }}>Nurse Count</th>
            </tr>
          </thead>
          <tbody>
            {timeslots.map((slot) => (
              <tr key={slot.slot_id}>
                <td style={thTdStyle}>{slot.slot_id}</td>
                <td style={thTdStyle}>{formatDate(slot.date)}</td>
                <td style={thTdStyle}>{slot.start_time}</td>
                <td style={thTdStyle}>{slot.end_time}</td>
                <td style={thTdStyle}>{slot.nurse_count}</td>
                <td style={thTdStyle}>
                  <button
                    onClick={() => handleCancel(slot.slot_id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleTime;
