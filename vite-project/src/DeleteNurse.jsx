import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteNurse = () => {
  const [employeeId, setEmployeeId] = useState("");
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/Nurses/${employeeId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Nurse deleted successfully");
        navigate("/admin-home"); // Redirect to admin home page or other as necessary
      } else {
        console.error("Failed to delete nurse");
      }
    } catch (error) {
      console.error("Error deleting nurse", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "1.5rem",
        }}
      >
        Delete Nurse
      </h2>
      <form onSubmit={handleDelete}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Employee ID"
            required
            style={{
              width: "100%",
              padding: "0.8rem",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "1rem",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default DeleteNurse;
