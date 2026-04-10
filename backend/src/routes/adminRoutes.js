const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");

// Dashboard
router.get("/stats", adminController.getDashboardStats);

// Project management
router.get("/projects", adminController.getProjects);
router.post("/projects", verifyAdmin, adminController.createProject);
router.put("/projects/:id", verifyAdmin, adminController.updateProject);
router.delete("/projects/:id", verifyAdmin, adminController.deleteProject);

// Donation records
router.get("/donations", adminController.getDonations);
router.get("/donations/:id/transactions", adminController.getProjectTransactions);

// User management
router.get("/users", verifyAdmin, adminController.getAllUsers);
router.get("/users/:id", verifyAdmin, adminController.getUserById);
router.post("/users/add-admin", verifyAdmin, adminController.addAdmin);
router.delete("/users/:id", verifyAdmin, adminController.deleteUser);

module.exports = router;
