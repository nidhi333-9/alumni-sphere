const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET alumni for HeroSection
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        u.User_Fname,
        u.User_Lname,
        a.Graduation_Year,
        a.Course,
        IFNULL(u.Profile_Pic, 'https://randomuser.me/api/portraits/lego/1.jpg') AS img
      FROM Alumni_Table a
      JOIN User_Table u ON a.User_ID = u.User_ID
      WHERE a.Course = "MCA"
      ORDER BY a.Graduation_Year DESC
      LIMIT 20;`
    );

    // Map the data into a format suitable for frontend
    const alumni = rows.map((row) => ({
      name: `${row.User_Fname} ${row.User_Lname}`,
      course: `${row.Course} ${row.Graduation_Year}`,
      img: row.img,
    }));

    res.json(alumni);
  } catch (err) {
    console.error("Error fetching alumni for HeroSection:", err);
    res.status(500).json({ error: "Failed to fetch alumni" });
  }
});

module.exports = router;
