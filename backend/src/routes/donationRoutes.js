const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        Project_ID AS id,
        Project_title AS title,
        Project_Description AS description,
        Image AS image,
        Fund_Raised AS raised,
        Funds_Required AS target,
        Category AS category
      FROM project
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `
      SELECT 
        Project_ID AS id,
        Project_title AS title,
        Project_Description AS description,
        Image AS image,
        Fund_Raised AS raised,
        Funds_Required AS target,
        Category AS category
      FROM project
      WHERE Project_ID = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.json(rows[0]); 
  } catch (err) {
    console.error("Error fetching project by ID:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
