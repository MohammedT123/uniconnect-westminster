const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

function getUserIdFromToken(req) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("No token");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.userId;
}

router.post("/save-item", async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { itemId, type } = req.body;
    if (!itemId || !type) return res.status(400).json({ message: "Missing fields" });
    let update = null;
    if (type === "job") update = { $addToSet: { savedJobs: itemId } };
    if (type === "acc") update = { $addToSet: { savedAcc: itemId } };
    if (type === "community") update = { $addToSet: { savedCommunities: itemId } };
    if (!update) return res.status(400).json({ message: "Invalid type" });
    await User.findByIdAndUpdate(userId, update);
    res.json({ success: true });
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/unsave-item", async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { itemId, type } = req.body;
    let update = null;
    if (type === "job") update = { $pull: { savedJobs: itemId } };
    if (type === "acc") update = { $pull: { savedAcc: itemId } };
    if (type === "community") update = { $pull: { savedCommunities: itemId } };
    if (!update) return res.status(400).json({ message: "Invalid type" });
    await User.findByIdAndUpdate(userId, update);
    res.json({ success: true });
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
});

router.get("/my-saved", async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const user = await User.findById(userId)
      .populate("savedJobs")
      .populate("savedAcc")
      .populate("savedCommunities");
    res.json({
      jobs: user?.savedJobs || [],
      acc: user?.savedAcc || [],
      communities: user?.savedCommunities || [],
    });
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
