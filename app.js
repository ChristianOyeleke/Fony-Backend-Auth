require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Render sets the PORT automatically; 5000 is for local testing
const port = process.env.PORT || 5000;

// 1. CORS CONFIGURATION (Must be at the top)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      // Add your deployed frontend URL here later!
    ],
    credentials: true,
  }),
);

// 2. MIDDLEWARE
app.use(express.json());

// 3. ROUTES
app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", require("./routes/adminRoutes"));

// 4. ERROR HANDLER (Cleaned up)
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
    app.listen(port, () => {
      console.log(` Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(" MongoDB Connection Error:", error);
  }
};

startServer();
