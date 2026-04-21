const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Notice = require("../models/notice");

const bannedWords = [
  "fuck", "shit", "bitch", "bastard", "asshole", "arsehole", "cunt",
  "dick", "cock", "pussy", "wanker", "twat", "prick", "slag", "whore",
  "nigger", "nigga", "faggot", "retard", "rape", "kill yourself",
  "kys", "porn", "xxx", "sex", "naked", "nude", "escort", "prostitute"
];

function containsBannedWords(text) {
  const lower = (text || "").toLowerCase();
  return bannedWords.some(word => lower.includes(word));
}

function moderateContent(fields) {
  for (const value of Object.values(fields)) {
    if (containsBannedWords(value)) return true;
  }
  return false;
}

router.get("/", auth, async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 }).limit(50);
    res.json(notices);
  } catch { res.status(500).json({ message: "Failed to fetch notices" }); }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, message, category, contactEmail } = req.body;

    if (!title || !message || !contactEmail)
      return res.status(400).json({ message: "Title, message and contact email are required" });

    if (moderateContent({ title, message })) {
      return res.status(400).json({ 
        message: "Your notice contains inappropriate content and cannot be posted. Please review and resubmit." 
      });
    }

    const notice = new Notice({
      title,
      message,
      category: category || "General",
      contactEmail,
      authorEmail: req.userId,
    });

    await notice.save();
    res.status(201).json(notice);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch { res.status(500).json({ message: "Failed to delete" }); }
});

module.exports = router;