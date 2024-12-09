// client/src/api/user.js
import axios from "axios";

// Base URL for your API
const API_URL = "http://localhost:5000/api/users"; // This points to the backend route

// Function to fetch user data
export const fetchUserData = async () => {
  try {
    const response = await axios.get(API_URL); // Sending a GET request to fetch users
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
