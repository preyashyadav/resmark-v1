import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// MongoDB Atlas URI
const uri = process.env.MONGO_URI;

// Log the URI for debugging purposes
console.log("MongoDB URI:", uri); // Check if this prints the correct URI

// Function to connect to MongoDB using Mongoose only
const connectDB = async () => {
  try {
    if (!uri) {
      console.error("MongoDB URI is not defined in the environment variables.");
      return;
    }

    // Step 1: Connect to MongoDB using Mongoose
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected via Mongoose...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Terminate the process if connection fails
  }
};

export default connectDB;
