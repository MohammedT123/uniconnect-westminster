const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100 },
    message: { type: String, required: true, maxlength: 500 },
    category: {
      type: String,
      enum: ["General", "Flatmate", "Textbooks", "Events", "Lost & Found", "Other"],
      default: "General"
    },
    contactEmail: { type: String, required: true },
    authorEmail: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);