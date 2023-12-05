import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHome.css"; // Make sure to create this stylesheet

function AdminHome() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-home">
      <aside className="sidebar">
        <button onClick={() => handleNavigation("/register-nurse")}>
          Register
        </button>
        <button onClick={() => handleNavigation("/update-nurse")}>
          Update
        </button>
        <button onClick={() => handleNavigation("/delete-nurse")}>
          Delete
        </button>
        <button onClick={() => handleNavigation("/add-vaccine")}>
          Add Vac
        </button>
        <button onClick={() => handleNavigation("/update-vaccine")}>
          Update Vac
        </button>
        <button onClick={() => handleNavigation("/admin-nurse")}>
          View Nurse
        </button>
        <button onClick={() => handleNavigation("/view-patient")}>
          View Patient
        </button>
      </aside>
      <main className="content">
        {/* Content will be rendered here based on which button is clicked */}
      </main>
    </div>
  );
}

export default AdminHome;
