const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allow frontend to access backend

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const parcelRoutes = require("./routes/parcelRoutes");
app.use("/api/parcels", parcelRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Trackify API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
