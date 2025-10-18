
const express = require("express");
const router = express.Router();
const pool = require("../config/db"); 

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query( 
      `SELECT Job_ID, Job_Title, Company_Name, Location, Description, 
              Application_Link, Apply_From, Apply_To, Created_At 
       FROM Job_Postings 
       ORDER BY Created_At DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

module.exports = router;
