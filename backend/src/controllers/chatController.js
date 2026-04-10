const pool = require("../config/db");

// Get chat messages between two users
exports.getMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { partnerId } = req.params;

    const [rows] = await pool.query(
      `SELECT * FROM Chat_Message 
       WHERE (Sender_ID = ? AND Receiver_ID = ?) OR (Sender_ID = ? AND Receiver_ID = ?)
       ORDER BY Sent_At ASC`,
      [userId, partnerId, partnerId, userId]
    );

    // Mark messages from partner as read
    await pool.query(
      `UPDATE Chat_Message SET Is_Read = 1 WHERE Sender_ID = ? AND Receiver_ID = ? AND Is_Read = 0`,
      [partnerId, userId]
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    const [result] = await pool.query(
      `INSERT INTO Chat_Message (Sender_ID, Receiver_ID, Message) VALUES (?, ?, ?)`,
      [senderId, receiverId, message]
    );

    res.status(201).json({
      success: true,
      message: {
        Message_ID: result.insertId,
        Sender_ID: senderId,
        Receiver_ID: receiverId,
        Message: message,
        Is_Read: 0,
        Sent_At: new Date(),
      },
    });
  } catch (err) {
    console.error("❌ Error sending message:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

// Get unread message count
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;

    const [[result]] = await pool.query(
      `SELECT COUNT(*) AS unreadCount FROM Chat_Message WHERE Receiver_ID = ? AND Is_Read = 0`,
      [userId]
    );

    res.json({ unreadCount: result.unreadCount });
  } catch (err) {
    console.error("❌ Error fetching unread count:", err);
    res.status(500).json({ error: "Failed to get unread count" });
  }
};
