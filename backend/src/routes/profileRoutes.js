const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const profileController = require("../controllers/profileController");
const authenticateToken = require("../middleware/authMiddleware");

const uploadDir = path.join(__dirname, "../uploads/profile_pics");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/profile", authenticateToken, profileController.getUserProfile);
router.put("/update-settings", authenticateToken, profileController.updateUserSettings);
router.put("/change-password", authenticateToken, profileController.changePassword);
router.post(
  "/upload-pic",
  authenticateToken,
  upload.single("profilePic"),
  profileController.uploadProfilePic
);

module.exports = router;
