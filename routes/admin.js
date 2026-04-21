const express = require("express");
const router = express.Router();
const Accommodation = require("../models/accommodation");
const Community = require("../models/community");

const ADMIN_PASSWORD = "uniconnect_admin_2026";

function checkAdmin(req, res, next) {
  const key = req.headers["x-admin-key"];
  if (key !== ADMIN_PASSWORD) return res.status(401).json({ message: "Unauthorized" });
  next();
}

// ACCOMMODATION
router.get("/accommodation", checkAdmin, async (req, res) => {
  try {
    const items = await Accommodation.find().sort({ createdAt: -1 });
    res.json(items);
  } catch { res.status(500).json({ message: "Failed" }); }
});

router.post("/accommodation", checkAdmin, async (req, res) => {
  try {
    const item = new Accommodation(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put("/accommodation/:id", checkAdmin, async (req, res) => {
  try {
    const item = await Accommodation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete("/accommodation/:id", checkAdmin, async (req, res) => {
  try {
    await Accommodation.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch { res.status(500).json({ message: "Failed" }); }
});

// COMMUNITIES
router.get("/communities", checkAdmin, async (req, res) => {
  try {
    const items = await Community.find().sort({ createdAt: -1 });
    res.json(items);
  } catch { res.status(500).json({ message: "Failed" }); }
});

router.post("/communities", checkAdmin, async (req, res) => {
  try {
    const item = new Community(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put("/communities/:id", checkAdmin, async (req, res) => {
  try {
    const item = await Community.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete("/communities/:id", checkAdmin, async (req, res) => {
  try {
    await Community.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch { res.status(500).json({ message: "Failed" }); }
});

module.exports = router;