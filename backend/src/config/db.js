const mysql = require("mysql2/promise");
require("dotenv").config(); // Load .env variables

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the connection once when app starts
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Database connected successfully.");
    conn.release(); // release connection back to pool
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

module.exports = pool;
