import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import AdminLogin from "./AdminLogin"; // Import the AdminLogin component
import AdminHome from "./AdminHome";
import RegisterNurse from "./RegisterNurse";
import UpdateNurse from "./UpdateNurse";
import DeleteNurse from "./DeleteNurse";
import AddVaccine from "./AddVaccine";
import UpdateVaccine from "./UpdateVaccine";
import AdminNurse from "./AdminNurse";
import AdminVaccine from "./AdminVaccine";
import NurseLogin from "./NurseLogin"; // Import the NurseLogin component
import NurseHome from "./NurseHome";
import UpdateInfo from "./UpdateInfo";
import ScheduleTime from "./ScheduleTime";
import NurseVaccine from "./NurseVaccine";
import PatientLogin from "./PatientLogin"; // Import the PatientLogin component
import PatientHome from "./PatientHome";
import SelectTimeslot from "./SelectTimeslot";
import UpdatePatientInfo from "./UpdatePatientInfo";
import Signup from './Signup'; // Import the Signup component

function App() {
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
        <Route path="/add-vaccine" element={<AddVaccine />} />
        <Route path="/update-vaccine" element={<UpdateVaccine />} />
        <Route path="/admin-nurse" element={<AdminNurse />} />
        <Route path="/view-patient" element={<AdminVaccine />} />
        <Route path="/nurse-login" element={<NurseLogin />} />
        <Route path="/nurse-home" element={<NurseHome />} />
        <Route path="/update-info" element={<UpdateInfo />} />
        <Route path="/schedule-time" element={<ScheduleTime />} />
        <Route path="/nurse-vaccine" element={<NurseVaccine />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-home" element={<PatientHome />} />
        <Route path="/select-timeslot" element={<SelectTimeslot />} />
        <Route path="/update-patient-info" element={<UpdatePatientInfo />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
