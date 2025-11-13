const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const [rows] = await pool.query(
      `
      SELECT 
        a.Alumni_ID,
        u.User_ID,
        u.User_Fname,
        u.User_Lname,
        u.Email_ID,
        a.Graduation_Year,
        a.Course,
        a.Department,
        a.Job_Title,
        a.Company_Name,
        a.Current_City AS currentCity,
        a.Skills AS skills
      FROM Alumni_Table a
      JOIN User_Table u ON a.User_ID = u.User_ID
      WHERE u.User_ID != ?;
      `,
      [currentUserId]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching alumni:", err);
    res.status(500).json({ error: "Failed to fetch alumni" });
  }
});

module.exports = router;
