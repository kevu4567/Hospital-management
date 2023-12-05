const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require("body-parser"); // You'll need body-parser to parse JSON bodies
const dbConfig = require("./db.config");

const app = express();
app.use(cors()); 
app.use(bodyParser.json()); // This will parse JSON bodies

const db = mysql.createConnection(dbConfig);

app.get("/", (req, res) => {
  res.json("Welcome to the API!");
});

db.connect(function (err) {
    if(err){
        console.log(err);
        // Handle error after the initial connection attempt:
        // You could set up a retry mechanism or exit the process
        process.exit(1);
    }else{
        console.log("Connected as id: " + db.threadId + "!");
    }
    
})

app.get('/Vaccine', (req, res) => {
   const sql = 'SELECT * FROM Vaccine';
   db.query(sql, (err, result) => {
       if (err) return res.json(err);
       return res.json(result);
   })
})

app.get("/Nurses", (req, res) => {
  const sql = "SELECT * FROM Nurses";
  db.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// This code is for logging in for the admin
app.post("/login", (req, res) => {
  const { username, password } = req.body; // Extract username and password from the request body
  const sql = "SELECT * FROM Nurses WHERE username = ? AND password = ?"; // Use parameterized queries to prevent SQL injection
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      // Handle any errors during the query
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length > 0) {
        // User was found, handle login success
        res.json({ message: "Login successful", user: result[0] });
      } else {
        // User not found, handle login failure
        res.status(401).json({ error: "Invalid username or password" });
      }
    }
  });
});

app.post("/book-timeslot", (req, res) => {
  const { slot_id } = req.body;

  // Assuming you have a limit for patient_count. If not, you can remove this check.
  const sqlCheck = "SELECT patient_count FROM Timeslots WHERE slot_id = ?";
  db.query(sqlCheck, [slot_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error checking timeslot" });
    }

    // Check if there's a limit on the number of patients per slot
    if (results.length > 0 && results[0].patient_count < some_max_limit) {
      // Update query to increment patient_count
      const sqlUpdate =
        "UPDATE Timeslots SET patient_count = patient_count + 1 WHERE slot_id = ?";
      db.query(sqlUpdate, [slot_id], (updateErr, updateResults) => {
        if (updateErr) {
          return res.status(500).json({ error: "Error booking timeslot" });
        }
        if (updateResults.affectedRows > 0) {
          res.json({ message: "Timeslot booked successfully" });
        } else {
          res.status(404).json({ error: "Timeslot not found" });
        }
      });
    } else {
      res
        .status(400)
        .json({ error: "Patient limit reached for this timeslot" });
    }
  });
});


// Get vaccine repository data
app.get('/vaccine-repository', (req, res) => {
  const sql = 'SELECT * FROM VaccineRepository';
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving vaccines from the database');
    } else {
      res.json(result);
    }
  });
});

// To add number of doses
app.put("/vaccine-repository/:repositoryId", (req, res) => {
  const { repositoryId } = req.params;
  const { newDoses } = req.body;

  const sql = `
    UPDATE VaccineRepository
    SET total_doses = total_doses + ?
    WHERE repository_id = ?;
  `;

  db.query(sql, [newDoses, repositoryId], (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.affectedRows > 0) {
      res.json({ message: "Total doses updated successfully" });
    } else {
      res.status(404).json({ error: "Repository not found" });
    }
  });
});

// Backend code to update the total doses for the entire repository
app.put("/vaccine-repository/update-total-doses/:repositoryId", (req, res) => {
  const { repositoryId } = req.params;
  const { newTotalDoses } = req.body;

  const sql = `
    UPDATE VaccineRepository
    SET total_doses = ?
    WHERE repository_id = ?;
  `;

  db.query(sql, [newTotalDoses, repositoryId], (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.affectedRows > 0) {
      res.json({ message: "Total doses updated successfully" });
    } else {
      res
        .status(404)
        .json({ error: "No repository found with the provided ID" });
    }
  });
});

// Login route for nurses
app.post("/Nurses/login", (req, res) => {
  const { username, password } = req.body;

  // Check for missing username or password
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  // Define the SQL query
  const sql = "SELECT * FROM Nurses WHERE username = ? AND password = ?";
  
  // Execute the query
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("Error executing query", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    
    // Check if any user was found
    if (results.length > 0) {
      // User found, handle login success
      // You should NOT send the password back to the client
      const { password, ...userWithoutPassword } = results[0];
      res.json({ message: "Login successful", user: userWithoutPassword });
    } else {
      // User not found, handle login failure
      res.status(401).json({ error: "Invalid username or password" });
    }
  });
});

// This code is for registering Nurse data into the database
app.post("/Nurses", (req, res) => {
  // Extract the nurse data from the request body
  const {
    employeeId,
    firstName,
    middleName,
    lastName,
    age,
    gender,
    phone,
    address,
    username,
    password,
  } = req.body;

  // Construct the SQL query to insert the new nurse data into your database
  const sql = `INSERT INTO Nurses (EmployeeID, f_name, m_name, l_name, age, gender, phone, address, username, password)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Execute the query using the mysql module
  db.query(
    sql,
    [
      employeeId,
      firstName,
      middleName,
      lastName,
      age,
      gender,
      phone,
      address,
      username,
      password,
    ],
    (err, result) => {
      if (err) {
        // Handle any SQL errors
        console.error("Error executing query", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        // If successful, send a response back to the client
        res.status(201).json({ message: "Nurse registered successfully" });
      }
    }
  );
});


// This code is for updating Nurse data in the database
app.get("/Nurses/:employeeId", (req, res) => {
  const { employeeId } = req.params;

  // Use parameterized queries to avoid SQL injection
  const sql =
    "SELECT f_name, l_name, phone, address FROM Nurses WHERE EmployeeID = ?";

  db.query(sql, [employeeId], (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Check if the nurse was found
    if (result.length > 0) {
      const nurse = result[0];
      res.json({
        first_name: nurse.f_name,
        last_name: nurse.l_name,
        phone: nurse.phone,
        address: nurse.address,
      });
    } else {
      res
        .status(404)
        .json({ error: "Nurse not found with the provided EmployeeID" });
    }
  });
});

// This is for updating Nurse data in the database
app.put("/Nurses/:employeeId", (req, res) => {
  const { employeeId } = req.params;
  const { phone, address } = req.body;

  // Construct the SQL statement with multiple fields to update
  const sql = `UPDATE Nurses SET phone = ?, address = ? WHERE EmployeeID = ?`;

  // Execute the query with the values to update
  db.query(sql, [phone, address, employeeId], (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to update nurse due to server error.",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "Nurse not found with the provided EmployeeID.",
      });
    }

    res.json({ message: "Nurse updated successfully." });
  });
});

// This code is for deleting Nurse data from the database
app.delete("/Nurses/:employeeId", (req, res) => {
  const { employeeId } = req.params;

  const sql = "DELETE FROM Nurses WHERE EmployeeID = ?";

  db.query(sql, [employeeId], (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Nurse not found" });
      } else {
        res.json({ message: "Nurse deleted successfully" });
      }
    }
  });
});

// Signup route for patients
app.post('/Patients/signup', async (req, res) => {
  const {
    firstName, middleName, lastName, ssn, age, gender, race,
    occupationalClass, medicalHistory, phone, address, username, password
  } = req.body;

  // Validation and additional logic...

  // Construct the SQL query to insert the new patient data into your database
  const sql = `
    INSERT INTO Patients
    (f_name, m_name, l_name, ssn, age, gender, race, occupational_class, medical_history_description, phone, address, username, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Execute the query
  db.query(sql, [
    firstName, middleName, lastName, ssn, age, gender, race,
    occupationalClass, medicalHistory, phone, address, username, password
  ], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(201).json({ message: 'Signup successful', patientId: result.insertId });
  });
});


// GET available time slots
app.get('/timeslots', (req, res) => {
  const sql = 'SELECT * FROM Timeslots WHERE nurse_count < 12'; // Replace 'some_max_limit' with your logic
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query", err);
      return res.status(500).json({ error: "Internal server error", details: err.message });
    }
    res.json(results);
  });
});

// To get patients details in admin page
app.get("/patients", (req, res) => {
  const sql =
    "SELECT f_name, l_name, medical_history_description FROM Patients";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(result);
    }
  });
});


// This endpoint schedules a new time for the nurse and increments the nurse count.
app.post('/schedule-timeslot', async (req, res) => {
  const { slot_id, date, start_time, end_time } = req.body;

  // Check if the slot already exists
  const checkSlotSql = 'SELECT * FROM Timeslots WHERE slot_id = ?';
  db.query(checkSlotSql, [slot_id], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error executing query', checkErr);
      return res.status(500).json({ error: 'Error checking for existing timeslot' });
    }

    if (checkResults.length > 0) {
      // Slot exists, increment nurse count
      const updateSql = 'UPDATE Timeslots SET patient_count = patient_count + 1 WHERE slot_id = ?';
      db.query(updateSql, [slot_id], (updateErr, updateResults) => {
        if (updateErr) {
          console.error('Error executing query', updateErr);
          return res.status(500).json({ error: 'Error updating nurse count' });
        }

        if (updateResults.affectedRows === 0) {
          return res.status(404).json({ error: 'Timeslot not found' });
        }

        return res.json({ message: 'Nurse count updated successfully' });
      });
    } else {
      // Slot does not exist, create new slot with nurse_count = 1
      const insertSql = `
        INSERT INTO Timeslots (slot_id, date, start_time, end_time, nurse_count, patient_count)
        VALUES (?, ?, ?, ?, 1)`;
      db.query(insertSql, [slot_id, date, start_time, end_time], (insertErr, insertResults) => {
        if (insertErr) {
          console.error('Error executing query', insertErr);
          return res.status(500).json({ error: 'Error creating new timeslot' });
        }

        return res.json({
          message: 'New timeslot created successfully',
          slot_id: insertResults.insertId
        });
      });
    }
  });
});

app.post("/new-timeslot", (req, res) => {
  const { date, start_time, end_time, slot_id } = req.body;

  // Your logic here to insert or update the timeslot in the database
  // This is just a placeholder example
  const sql = `
    INSERT INTO Timeslots (slot_id, date, start_time, end_time, nurse_count)
    VALUES (?, ?, ?, ?, 1)
    ON DUPLICATE KEY UPDATE
    nurse_count = nurse_count + 1;
  `;

  db.query(sql, [slot_id, date, start_time, end_time], (err, result) => {
    if (err) {
      // If there's an SQL error, respond with a 500 server error and the error details
      console.error("Error executing query:", err);
      res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    } else {
      // If successful, respond with a 201 created status and the new timeslot ID
      res.status(201).json({
        message: "Timeslot created or updated successfully",
        slot_id: result.insertId || slot_id, // Use the existing slot_id if row was updated
      });
    }
  });
});


// This code is to cancel the nurse schedule
app.post("/cancel-timeslot/:slotId", (req, res) => {
  const { slotId } = req.params;
  const { nurse_id } = req.body; // Nurse's ID from the request

  // Begin transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction", err);
      return res.status(500).json({ error: "Error starting transaction" });
    }

    // First, check if the nurse is marked as available in the NurseAvailability table
    const checkNurseAvailabilitySql = `
      SELECT * FROM NurseAvailability 
      WHERE nurse_id = ? AND slot_id = ? AND is_available = 1`;
    db.query(
      checkNurseAvailabilitySql,
      [nurse_id, slotId],
      (checkErr, checkResults) => {
        if (checkErr) {
          console.error("Error executing query", checkErr);
          return db.rollback(() => {
            res
              .status(500)
              .json({ error: "Error checking nurse availability" });
          });
        }

        if (checkResults.length > 0) {
          // Nurse is available, proceed to set is_available to 0
          const updateNurseAvailabilitySql = `
          UPDATE NurseAvailability
          SET is_available = 0
          WHERE nurse_id = ? AND slot_id = ?`;
          db.query(
            updateNurseAvailabilitySql,
            [nurse_id, slotId],
            (updateErr, updateResults) => {
              if (updateErr) {
                console.error("Error executing query", updateErr);
                return db.rollback(() => {
                  res
                    .status(500)
                    .json({ error: "Error updating nurse availability" });
                });
              }

              if (updateResults.affectedRows > 0) {
                // Successfully updated NurseAvailability, now decrement the nurse_count in Timeslots table
                const updateTimeslotSql = `
              UPDATE Timeslots
              SET nurse_count = nurse_count - 1
              WHERE slot_id = ? AND nurse_count > 0`;
                db.query(
                  updateTimeslotSql,
                  [slotId],
                  (updateErr, updateResults) => {
                    if (updateErr) {
                      console.error("Error executing query", updateErr);
                      return db.rollback(() => {
                        res
                          .status(500)
                          .json({ error: "Error decrementing nurse count" });
                      });
                    }

                    if (updateResults.affectedRows > 0) {
                      // Commit transaction
                      db.commit((commitErr) => {
                        if (commitErr) {
                          console.error(
                            "Error committing transaction",
                            commitErr
                          );
                          return db.rollback(() => {
                            res
                              .status(500)
                              .json({ error: "Error committing transaction" });
                          });
                        }
                        res.json({ message: "Cancellation successful" });
                      });
                    } else {
                      return db.rollback(() => {
                        res
                          .status(400)
                          .json({
                            error:
                              "Could not decrement nurse count, possibly already zero or timeslot not found",
                          });
                      });
                    }
                  }
                );
              } else {
                db.rollback(() => {
                  res
                    .status(400)
                    .json({
                      error:
                        "Nurse is not available for this slot or already cancelled",
                    });
                });
              }
            }
          );
        } else {
          // Nurse is not available for this slot, rollback transaction
          db.rollback(() => {
            res
              .status(400)
              .json({
                error:
                  "You are not scheduled for that day or already cancelled",
              });
          });
        }
      }
    );
  });
});


// Login route for patients
// This code is for logging in for the admin
app.post("/Patients/login", (req, res) => {
  const { username, password } = req.body; // Extract username and password from the request body
  const sql = "SELECT * FROM Patients WHERE username = ? AND password = ?"; // Use parameterized queries to prevent SQL injection
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      // Handle any errors during the query
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length > 0) {
        // User was found, handle login success
        res.json({ message: "Login successful", user: result[0] });
      } else {
        // User not found, handle login failure
        res.status(401).json({ error: "Invalid username or password" });
      }
    }
  });
});

app.get("/patients/:username", (req, res) => {
  const { username } = req.params;
  const sql =
    "SELECT occupational_class, medical_history_description, phone, address FROM Patients WHERE username = ?";

  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("Error executing query", err);
      return res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    }
    if (results.length > 0) {
      const patientData = results[0];
      res.json(patientData);
    } else {
      res.status(404).json({ error: "Patient not found" });
    }
  });
});


// PUT update patient data by username
app.put('/patients/:username', (req, res) => {
  const { username } = req.params;
  const {
    occupational_class,
    medical_history_description,
    phone,
    address,
    password // Ensure you handle passwords securely in your actual implementation
  } = req.body;

  // Perform input validation and sanitation as needed

  const sql = `
    UPDATE Patients SET 
      occupational_class = ?, 
      medical_history_description = ?, 
      phone = ?, 
      address = ?,
      password = ?  // Warning: Passwords should be hashed
    WHERE username = ?
  `;

  const values = [occupational_class, medical_history_description, phone, address, password, username];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
    if (result.affectedRows > 0) {
      res.json({ message: 'Patient information updated successfully' });
    } else {
      res.status(404).json({ error: 'Patient not found or no new data provided' });
    }
  });
});



app.listen(3000, () => {
    console.log('Server started on port 3000');
})
