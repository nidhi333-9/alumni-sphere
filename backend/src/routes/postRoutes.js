const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.Post_ID,
        p.Content,
        p.Image_URL,
        p.Created_At,
        p.Likes_Count,
        p.Comment_Count,
        a.Alumni_ID,
        u.User_Fname,
        u.User_Lname,
        a.Graduation_Year,
        a.Course,
        a.Department
      FROM Post p
      JOIN Alumni_Table a ON p.Alumni_ID = a.Alumni_ID
      JOIN User_Table u ON a.User_ID = u.User_ID
      ORDER BY p.Created_At DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get comments for a post
router.get("/:id/comments", (req, res) => {
  const postId = req.params.id;

  const query = `
    SELECT 
      c.Comment_ID,
      c.Comment AS Comment_Text,
      c.Comment_Date,
      u.User_Fname,
      u.User_Lname
    FROM Post_Comment c
    JOIN User_Table u ON c.User_ID = u.User_ID
    WHERE c.Post_ID = ?
    ORDER BY c.Comment_Date ASC
  `;

  db.query(query, [postId], (err, results) => {
    if (err) {
      console.error("Error fetching comments:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// ✅ Add a new comment
// ✅ Add a new comment
router.post("/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const { userId, commentText } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO Post_Comment (Post_ID, User_ID, Comment, Comment_Date)
       VALUES (?, ?, ?, NOW())`,
      [postId, userId, commentText]
    );

    // Return the new comment object
    res.json({
      success: true,
      comment: {
        Comment_ID: result.insertId,
        Post_ID: postId,
        User_ID: userId,
        Comment: commentText,
        Comment_Date: new Date(),
        User_Fname: "Test", // fetch from db in real case
        User_Lname: "User",
      },
    });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});



module.exports = router;
