const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
require('dotenv').config(); // Also here, if needed


const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Test
app.get("/", (req, res) => {
  res.send("Backend API is running 👍");
});

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const alumniRoutes = require("./routes/alumniRoutes");
app.use("/alumni", alumniRoutes);

const alumniHeroRoutes = require("./routes/alumniHeroRoutes");
app.use("/alumni-hero", alumniHeroRoutes); // 👈 NEW ROUTE

const postRoutes = require("./routes/postRoutes");
app.use("/posts", postRoutes);

const eventRoutes = require("./routes/eventRoutes");
app.use("/events-api", eventRoutes);

const jobsRoutes = require("./routes/jobsRoutes");
app.use("/jobs-api", jobsRoutes);

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
