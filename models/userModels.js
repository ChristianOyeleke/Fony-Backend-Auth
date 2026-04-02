const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/,
        "Please use a valid email address",
      ],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [
        /^(?:\+234|0)[789][01]\d{8}$/,
        "Please use a valid Nigerian phone number",
      ],
    },
    name: {
      type: String,
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [30, "Name must be at most 30 characters long"],
    },
    googleId: {
      type: String,
      sparse: true,
    },
    profilePicture: {
      type: String,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
