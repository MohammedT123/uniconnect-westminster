const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Job = require("../models/job");

router.get("/", auth, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

module.exports = router;
