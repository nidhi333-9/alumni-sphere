const express = require("express");
const router = express.Router();
const { verifyAdmin, verifyToken } = require("../middleware/authMiddleware");
const eventController = require("../controllers/eventController");

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/", verifyAdmin, eventController.createEvent);
router.put("/:id", verifyAdmin, eventController.updateEvent);
router.delete("/:id", verifyAdmin, eventController.deleteEvent);

// Event Registration
router.post("/:id/register", verifyToken, eventController.registerForEvent);
router.get("/:id/registrations", verifyAdmin, eventController.getEventRegistrations);

module.exports = router;
