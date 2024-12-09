import express from "express";
import {
  registerUser,
  loginUser,
  getUserData,
} from "../controllers/userController.js";

const router = express.Router();

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route to get user data (optional, for testing or admin use)
router.get("/users", getUserData);

export default router;
