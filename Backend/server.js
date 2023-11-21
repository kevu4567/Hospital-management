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

app.post("/Nurses/login", (req, res) => {
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
        res.json({ message: "Login successful", user:{
          id: NurseHome.employeeId
        } });
      } else {
        // User not found, handle login failure
        res.status(401).json({ error: "Invalid username or password" });
      }
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

// This code is tro update Nurse data into the database
app.put("/Nurses/:employeeId", (req, res) => {
  const { employeeId } = req.params;
  const fieldsToUpdate = req.body;

  // Construct an array of the SQL parts for each field to update
  const updateClauses = Object.entries(fieldsToUpdate).map(([key, value]) => {
    return `${key} = ${mysql.escape(value)}`;
  });

  // Join the clauses to form the SQL statement
  const sqlUpdateStatement = updateClauses.join(", ");

  // If no fields are provided to update, send an error response
  if (!sqlUpdateStatement) {
    return res.status(400).json({
      error: "Bad Request",
      message: "No fields provided for update.",
    });
  }

  const sql = `UPDATE Nurses SET ${sqlUpdateStatement} WHERE EmployeeID = ?`;

  db.query(sql, [employeeId], (err, result) => {
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


app.listen(3000, () => {
    console.log('Server started on port 3000');
})