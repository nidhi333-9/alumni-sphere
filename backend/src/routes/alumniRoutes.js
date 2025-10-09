const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET all alumni with user info
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
   a.Alumni_ID,
   u.User_Fname,
   u.User_Lname,
   a.Graduation_Year,
   a.Course,
   a.Department,
   a.Job_Title,
   a.Company_Name,
   a.Current_City AS currentCity,
   a.Skills AS skills
FROM Alumni_Table a
JOIN User_Table u ON a.User_ID = u.User_ID;
`
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching alumni:", err);
    res.status(500).json({ error: "Failed to fetch alumni" });
  }
});

module.exports = router;