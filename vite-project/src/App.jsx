import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import AdminLogin from "./AdminLogin"; // Import the AdminLogin component
import AdminHome from "./AdminHome";
import RegisterNurse from "./RegisterNurse";
import UpdateNurse from "./UpdateNurse";
import DeleteNurse from "./DeleteNurse";
import NurseLogin from "./NurseLogin"; // Import the NurseLogin component
import NurseHome from "./NurseHome";
import UpdateInfo from "./UpdateInfo";
import PatientLogin from "./PatientLogin"; // Import the PatientLogin component
import Signup from './Signup'; // Import the Signup component

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/Vaccine")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (buttonName) => {
    console.log(`Button ${buttonName} clicked!`);
    // You can add more functionality for button click here
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div>
              <h1>Welcome to the Hospital Database!</h1>
              <div className="buttonContainer">
                <Link to="/admin-login">
                  <button onClick={() => handleClick("Admin")}>Admin</button>
                </Link>
                <Link to="/nurse-login">
                  <button onClick={() => handleClick("Nurse")}>Nurse</button>
                </Link>
                <Link to="/patient-login">
                  <button onClick={() => handleClick("Patient")}>
                    Patient
                  </button>
                </Link>
              </div>
            </div>
          }
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/register-nurse" element={<RegisterNurse />} />
        <Route path="/update-nurse" element={<UpdateNurse />} />
        <Route path="/delete-nurse" element={<DeleteNurse />} />
        <Route path="/nurse-login" element={<NurseLogin />} />
        <Route path="/nurse-home" element={<NurseHome />} />
        <Route path="/update-info" element={<UpdateInfo />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
