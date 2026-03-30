require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/usersModel");

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const email = process.env.ADMIN_EMAIL;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found with this email");
      process.exit();
    }

    console.log("🔍 Before:", user.role);

    user.role = "admin";
    await user.save();

    console.log("✅ After:", user.role);
    console.log(`🎉 ${user.email} is now an ADMIN`);

    process.exit();

  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit();
  }
};

makeAdmin();