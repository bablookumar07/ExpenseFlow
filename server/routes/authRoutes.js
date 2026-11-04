
import express from "express";

import {
  registerUser,
  loginUser,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected account routes
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.delete("/delete-account", protect, deleteAccount);

export default router;
