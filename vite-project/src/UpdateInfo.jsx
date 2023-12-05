import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function UpdateInfo() {
  const [nurse, setNurse] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const nurseId = localStorage.getItem("nurseID");
    if (!nurseId) {
      alert("Nurse ID not found. Please log in again.");
      navigate("/login"); // redirect to login
      return;
    }

  async function fetchNurseInfo() {
    try {
      const response = await fetch(`http://localhost:3000/nurses/${nurseId}`);
      const data = await response.json();
      if (response.ok) {
        setNurse({
          ...nurse,
          firstName: data.f_name,
          lastName: data.l_name,
          phone: data.phone,
          address: data.address,
        });
      } else {
        // Handle errors here
        console.error("Failed to fetch nurse information");
      }
    } catch (error) {
      console.error("Error fetching nurse information:", error);
      // Handle error, such as showing a message to the user
    }
  };

    fetchNurseInfo();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNurse((prevNurse) => ({ ...prevNurse, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nurseId = localStorage.getItem("nurseID");

    try {
      const response = await fetch(`http://localhost:3000/nurses/${nurseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: nurse.phone,
          address: nurse.address,
        }),
      });

      if (response.ok) {
        alert("Information updated successfully!");
        navigate("/nurse-home"); // redirect to the nurse home page
      } else {
        const errorData = await response.json();
        alert(`Failed to update information: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error updating information: ${error.message}`);
      console.error(error);
    }
  };

    const containerStyle = {
      maxWidth: "500px",
      margin: "20px auto",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#fff", // Adjust as needed
      borderRadius: "8px", // Optional for rounded corners
      boxShadow: "0 0 10px rgba(0,0,0,0.1)", // Optional for shadow
    };

    const labelStyle = {
      display: "block",
      marginBottom: "10px",
      marginTop: "20px", // Add top margin for spacing
    };


  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

     const buttonStyle = {
       padding: "10px 15px",
       marginTop: "20px",
       backgroundColor: "#4CAF50",
       color: "white",
       border: "none",
       borderRadius: "4px",
       cursor: "pointer",
       width: "200px",
       fontSize: "16px",
     };

  return (
    <div style={containerStyle}>
      <h2 style={{ margin: "20px 0" }}>Update Your Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>
            Phone Number:
            <input
              type="tel"
              name="phone"
              style={inputStyle}
              value={nurse.phone}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label style={labelStyle}>
            Address:
            <input
              type="text"
              name="address"
              style={inputStyle}
              value={nurse.address}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit" style={buttonStyle}>
          {" "}
          Update Info
        </button>
      </form>
    </div>
  );
};

export default UpdateInfo;
