import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateInfo = () => {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // Retrieve the nurse ID from localStorage
  const nurseId = localStorage.getItem("nurseId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/nurses/${nurseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, address }),
      });

      if (response.ok) {
        const updatedNurseData = await response.json();
        setNurseData((prevState) => ({ ...prevState, ...updatedNurseData }));
        alert("Information updated successfully!");
        navigate("/nurse-home"); // or wherever you wish to redirect after the update
      } else {
        const errorData = await response.json();
        alert(`Failed to update information: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Update Your Information</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="phone" style={styles.label}>
          Phone Number:
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
          required
        />
        <label htmlFor="address" style={styles.label}>
          Address:
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Update Info
        </button>
      </form>
    </div>
  );
};

// You can move these styles to a CSS file if preferred
const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  label: {
    marginBottom: "5px",
  },
  input: {
    marginBottom: "20px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default UpdateInfo;
