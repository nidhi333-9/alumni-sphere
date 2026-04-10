const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const chatController = require("../controllers/chatController");

router.get("/:partnerId", verifyToken, chatController.getMessages);
router.post("/send", verifyToken, chatController.sendMessage);
router.get("/unread/count", verifyToken, chatController.getUnreadCount);

module.exports = router;
