import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateNurse = () => {
  const [nurses, setNurses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const response = await fetch("http://localhost:3000/Nurses");
        if (response.ok) {
          const data = await response.json();
          setNurses(data);
        } else {
          console.error("Failed to fetch nurses");
        }
      } catch (error) {
        console.error("Error fetching nurses", error);
      }
    };

    fetchNurses();
  }, []);

  // This function updates the nurse information in the state when any input field is changed
  const handleInputChange = (nurseId, fieldName, newValue) => {
    setNurses((prevNurses) =>
      prevNurses.map((nurse) =>
        nurse.EmployeeID === nurseId
          ? { ...nurse, [fieldName]: newValue }
          : nurse
      )
    );
  };

  // This function is called when the update button is clicked
const handleUpdate = async (nurseId) => {
  const nurseToUpdate = nurses.find((n) => n.EmployeeID === nurseId);

  try {
    const response = await fetch(`http://localhost:3000/Nurses/${nurseId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nurseToUpdate),
    });

    if (!response.ok) {
      // Parse the JSON error message
      const errorData = await response.json();
      console.error("Failed to update nurse", errorData.message);
      alert(`Failed to update nurse: ${errorData.message}`);
    } else {
      // Nurse updated successfully
      console.log("Nurse updated successfully");
    }
  } catch (error) {
    console.error("Error updating nurse", error);
    alert(`Error updating nurse: ${error.message}`);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Update Nurse Info</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Employee ID
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              First Name
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              First Name
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Middle Name
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Last Name
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Age
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Gender
            </th>
          </tr>
        </thead>
        <tbody>
          {nurses.map((nurse) => (
            <tr key={nurse.EmployeeID}>
              <td>{nurse.EmployeeID}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <input
                  type="text"
                  value={nurse.f_name}
                  onChange={(e) =>
                    handleInputChange(
                      nurse.EmployeeID,
                      "f_name",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={nurse.m_name}
                  onChange={(e) =>
                   handleInputChange(
                     nurse.EmployeeID,
                     "m_name",
                     e.target.value
                   )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={nurse.l_name}
                  onChange={(e) =>
                    handleInputChange(
                      nurse.EmployeeID,
                      "l_name",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={nurse.age}
                  onChange={(e) =>
                    handleInputChange(
                      nurse.EmployeeID,
                      "age",
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <select
                  value={nurse.gender}
                  onChange={(e) =>
                    handleInputChange(
                      nurse.EmployeeID,
                      "gender",
                      e.target.value
                    )
                  }
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleUpdate(nurse.EmployeeID)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateNurse;
