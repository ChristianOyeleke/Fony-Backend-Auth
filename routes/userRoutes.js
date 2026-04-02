const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware"); // streamifier version
const {
  updateProfile,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  deleteUserByEmail,
} = require("../controllers/userController");
const passport = require("../config/passport");

// ================= REGISTRATION & LOGIN =================
router.post("/register", registerUser);
router.delete("/delete-user", deleteUserByEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/login", loginUser);

// ================= GOOGLE OAUTH =================
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/signin",
  }),
  (req, res) => {
    const token = require("../utils/generateToken")(req.user._id);
    res.redirect(
      `${process.env.CLIENT_URL || "http://localhost:5173"}/?token=${token}`,
    );
  },
);

// ================= PROFILE UPDATE =================
router.put("/profile", protect, upload, updateProfile); // <-- no .single()

module.exports = router;
