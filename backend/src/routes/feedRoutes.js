const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

const uploadDir = path.join(__dirname, "../uploads/post_images");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/", auth, upload.single("image"), async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  if (!content || !content.trim()) {
    return res.status(400).json({ success: false, error: "Content cannot be empty" });
  }

  try {
    const [userRows] = await db.query(
      "SELECT User_Fname, User_Lname, Profile_Pic FROM User_Table WHERE User_ID = ?",
      [userId]
    );

    if (!userRows.length) return res.status(404).json({ success: false, error: "User not found" });

    const user = userRows[0];
    const profilePic = user.Profile_Pic ? `http://localhost:5000${user.Profile_Pic}` : null;

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/post_images/${req.file.filename}`;
    }

    const [result] = await db.query(
      `INSERT INTO Post (Alumni_ID, Content, Image_URL, Created_At, Likes_Count, Comment_Count)
       VALUES (
         (SELECT Alumni_ID FROM Alumni_Table WHERE User_ID = ?),
         ?, ?, NOW(), 0, 0
       )`,
      [userId, content, imageUrl]
    );

    res.json({
      success: true,
      post: {
        Post_ID: result.insertId,
        Content: content,
        Image_URL: imageUrl ? `http://localhost:5000${imageUrl}` : null,
        Likes_Count: 0,
        Comment_Count: 0,
        Created_At: new Date(),
        User: {
          User_Fname: user.User_Fname,
          User_Lname: user.User_Lname,
          Profile_Pic: profilePic,
        },
      },
    });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
