import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Configure environment variables
dotenv.config({ path: "../.env" });

// Initialize Express
const app = express();

// Import routes
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

// Middlewares
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB
import connectDB from "./config/mongodb.js";
connectDB();

// API Routes
app.use("/api", userRoutes);
app.use("/api", quizRoutes);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
