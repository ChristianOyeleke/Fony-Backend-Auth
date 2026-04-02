require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const passport = require("./config/passport");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", require("./routes/adminRoutes"));

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
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(` Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(" MongoDB Connection Error:", error);
  }
};

startServer();
