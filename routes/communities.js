const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Community = require("../models/community");

router.get("/", auth, async (req, res) => {
  try {
    const communities = await Community.find().sort({ members: -1 });
    res.json(communities);
  } catch {
    res.status(500).json({ message: "Failed to fetch communities" });
  }
});

module.exports = router;
