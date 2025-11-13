// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./config/db");
require("dotenv").config();

const app = express();
app.use(cors());

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173", // your frontend (Vite default)
  credentials: true
}));
app.use(express.json());

// ✅ Serve uploaded files (e.g., profile pictures)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Database test route
app.get("/", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT NOW() AS time");
    res.send(`Backend API is running 👍 (DB time: ${result[0].time})`);
  } catch (err) {
    console.error("DB Connection Error:", err);
    res.status(500).send("Database connection failed ❌");
  }
});

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const alumniRoutes = require("./routes/alumniRoutes");
const alumniHeroRoutes = require("./routes/alumniHeroRoutes");
const postRoutes = require("./routes/postRoutes");
const eventRoutes = require("./routes/eventRoutes");
const jobsRoutes = require("./routes/jobsRoutes");
const profileRoutes = require("./routes/profileRoutes"); // 👈 NEW (ManageAccount)
const feedRoutes = require("./routes/feedRoutes");
const donationRoutes = require("./routes/donationRoutes");


// ✅ Use Routes
app.use("/auth", authRoutes);
app.use("/alumni", alumniRoutes);
app.use("/alumni-hero", alumniHeroRoutes);
app.use("/posts", postRoutes);
app.use("/events-api", eventRoutes);
app.use("/jobs-api", jobsRoutes);
app.use("/api/user", profileRoutes); // 👈 New endpoint for ManageAccount page
app.use("/feeds", feedRoutes); // Feed related routes
app.use("/donations", donationRoutes);

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Something went wrong on the server." });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
