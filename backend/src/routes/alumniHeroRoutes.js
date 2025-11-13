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
        u.User_Fname,
        u.User_Lname,
        a.Graduation_Year,
        a.Course,
        IFNULL(u.Profile_Pic, '/uploads/profile_pics/default_male.png') AS Profile_Pic
      FROM Alumni_Table a
      JOIN User_Table u ON a.User_ID = u.User_ID
      WHERE a.Course = "MCA" AND u.User_ID != ?
      ORDER BY a.Graduation_Year DESC
      LIMIT 20;
      `,
      [currentUserId]
    );

    // Generate full URLs
    const alumni = rows.map((row) => ({
      name: `${row.User_Fname} ${row.User_Lname}`,
      course: `${row.Course} ${row.Graduation_Year}`,
      img: row.Profile_Pic.startsWith("http")
        ? row.Profile_Pic
        : `http://localhost:5000${row.Profile_Pic}`,
    }));

    res.json(alumni);
  } catch (err) {
    console.error("Error fetching alumni for HeroSection:", err);
    res.status(500).json({ error: "Failed to fetch alumni" });
  }
});

module.exports = router;
