const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
const newsController = require("../controllers/newsController");

router.get("/", newsController.getAllNews);
router.get("/:id", newsController.getNewsById);
router.post("/", verifyAdmin, newsController.createNews);
router.put("/:id", verifyAdmin, newsController.updateNews);
router.delete("/:id", verifyAdmin, newsController.deleteNews);

module.exports = router;
