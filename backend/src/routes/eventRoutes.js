const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Get events with optional latest filter
router.get("/", async (req, res) => {
  const type = req.query.type; // "latest" or undefined
  let query = `
    SELECT 
      e.Event_ID,
      e.Event_Name,
      e.Event_Description,
      e.Event_Date,
      e.Event_Type,
      e.Event_Link,
      e.Event_Image, 
      e.Event_Location
    FROM Event_Table e
  `;

  if (type === "latest") {
    query += ` ORDER BY e.Creation_Date DESC LIMIT 5;`; 
  } else {
    query += ` ORDER BY e.Event_Date ASC;`; 
  }

  try {
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

module.exports = router;
