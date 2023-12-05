import React, { useState, useEffect } from "react";

const AddVaccine = () => {
  const [vaccines, setVaccines] = useState([]);
  const [repositoryId, setRepositoryId] = useState(""); // State to store the repository ID input
  const [newDoses, setNewDoses] = useState(""); // State to store the new doses input

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/vaccine-repository"
        );
        if (response.ok) {
          const data = await response.json();
          setVaccines(data);
        } else {
          console.error("Failed to fetch vaccines");
        }
      } catch (error) {
        console.error("Error fetching vaccines", error);
      }
    };

    fetchVaccines();
  }, []);

  const handleDosesUpdate = async (event) => {
    event.preventDefault();
    // Call the backend API to update doses
    try {
      const response = await fetch(
        `http://localhost:3000/vaccine-repository/${repositoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newDoses: parseInt(newDoses, 10) }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // Handle successful update
        // Optionally, refetch the vaccine data or update the state directly
        alert("Doses updated successfully!");
      } else {
        // Handle error
        alert(`Update failed: ${data.error}`);
      }
    } catch (error) {
      alert("An error occurred while updating doses.");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        margin: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleDosesUpdate} style={{ marginBottom: "20px" }}>
        <label>
          Repository ID:
          <input
            type="text"
            value={repositoryId}
            onChange={(e) => setRepositoryId(e.target.value)}
            style={{ marginLeft: "5px", marginRight: "10px" }}
          />
        </label>
        <label>
          New Doses:
          <input
            type="number"
            value={newDoses}
            onChange={(e) => setNewDoses(e.target.value)}
            style={{ marginLeft: "5px", marginRight: "10px" }}
          />
        </label>
        <button type="submit">Update Doses</button>
      </form>

      <h2 style={{ margin: "20px 0" }}>Vaccine Repository</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Repository ID
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Vaccine Name
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Total Doses
            </th>
          </tr>
        </thead>
        <tbody>
          {vaccines.map((vaccine, index) => (
            <tr
              key={vaccine.repository_id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#d6d6d6",
              }}
            >
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {vaccine.repository_id}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {vaccine.vaccine_name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {vaccine.total_doses}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddVaccine;
