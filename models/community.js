const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ["Sports", "Arts", "Academic", "Cultural", "Social", "Tech"], required: true },
    description: { type: String, required: true },
    members: { type: Number, default: 0 },
    meetingSchedule: { type: String },
    contactEmail: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Community", communitySchema);