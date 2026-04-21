const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Accommodation = require("../models/accommodation");

router.get("/", auth, async (req, res) => {
  try {
    const listings = await Accommodation.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch {
    res.status(500).json({ message: "Failed to fetch accommodation" });
  }
});

module.exports = router;
