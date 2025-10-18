const pool = require("../config/db");
const bcrypt = require("bcrypt");
const path = require("path");

exports.getUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await pool.query(
      `SELECT 
          u.User_ID AS id, 
          u.User_Fname AS firstName, 
          u.User_Lname AS lastName,
          u.Email_ID AS email, 
          u.Profile_Pic AS profilePic,
          a.Graduation_Year AS graduationYear,
          a.Department AS department,
          a.Course AS course,
          a.Job_Title AS jobTitle,
          a.Company_Name AS companyName,
          a.Sector AS sector,
          a.Skills AS skills,
          a.About AS about
       FROM User_Table u
       LEFT JOIN Alumni_Table a ON u.User_ID = a.User_ID
       WHERE u.User_ID = ?`,
      [userId]
    );

    if (!rows.length) return res.status(404).json({ error: "User not found" });

    const user = rows[0];

    if (user.profilePic) {
      user.profilePic = `http://localhost:5000${user.profilePic}`;
    } else {
      user.profilePic = ""; 
    }

    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching profile:", err);
    res.status(500).json({ error: "Server error while fetching profile" });
  }
};

exports.updateUserSettings = async (req, res) => {
  const userId = req.user.id;
  const { profileType, profileSettings, about } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE Alumni_Table
       SET About = ?
       WHERE User_ID = ?`,
      [about, userId]
    );

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("❌ Error updating settings:", err);
    res.status(500).json({ error: "Failed to update settings" });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT Password FROM User_Table WHERE User_ID = ?",
      [userId]
    );

    if (!rows.length)
      return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(oldPassword, rows[0].Password);
    if (!valid)
      return res.status(400).json({ error: "Incorrect old password" });

    const newHash = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE User_Table SET Password = ? WHERE User_ID = ?", [
      newHash,
      userId,
    ]);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("❌ Error changing password:", err);
    res.status(500).json({ error: "Failed to change password" });
  }
};

exports.uploadProfilePic = async (req, res) => {
  const userId = req.user.id;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = `/uploads/profile_pics/${req.file.filename}`;

    await pool.query(
      "UPDATE User_Table SET Profile_Pic = ? WHERE User_ID = ?",
      [filePath, userId]
    );

    res.json({ imagePath: filePath });
  } catch (err) {
    console.error("❌ Error uploading profile picture:", err);
    res.status(500).json({ error: "Failed to upload profile picture" });
  }
};
