const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

function signToken(user) {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });
    if (!email.toLowerCase().endsWith("@westminster.ac.uk"))
      return res.status(400).json({ message: "Must use a @westminster.ac.uk email" });
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ token: signToken(user), user });
  } catch(err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });
    const ok = await user.comparePassword(req.body.password);
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });
    res.json({ token: signToken(user), user });
  } catch(err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
