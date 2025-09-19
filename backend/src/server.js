const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

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

const postRoutes = require("./routes/postRoutes");
app.use("/posts", postRoutes);

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
