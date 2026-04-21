console.log("Step 1 - starting");
require("dotenv").config();
console.log("Step 2 - dotenv loaded");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "found" : "MISSING");

const express = require("express");
console.log("Step 3 - express loaded");

const mongoose = require("mongoose");
console.log("Step 4 - mongoose loaded");

const cors = require("cors");
const path = require("path");
console.log("Step 5 - all imports done");

const app = express();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// SECURITY HEADERS
app.use(helmet({ contentSecurityPolicy: false }));

// RATE LIMITING
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests, please try again later." }
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many login attempts, please try again in 15 minutes." }
});
app.use("/api/", limiter);
app.use("/api/auth/", authLimiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("Step 6 - middleware set");

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

console.log("Step 7 - connecting to MongoDB");

try {
  app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/adzuna-jobs", require("./routes/adzuna"));
  console.log("Step 8 - auth route loaded");
  app.use("/api/jobs", require("./routes/jobs"));
  console.log("Step 9 - jobs route loaded");
  app.use("/api/accommodation", require("./routes/accommodation"));
  console.log("Step 10 - accommodation route loaded");
  app.use("/api/communities", require("./routes/communities"));
  console.log("Step 11 - communities route loaded");
  app.use("/api", require("./routes/saved"));
  console.log("Step 12 - saved route loaded");
} catch(err) {
  console.error("ROUTE ERROR:", err.message);
}

const v = path.join(__dirname, "views");
app.get("/", (req, res) => res.sendFile(path.join(v, "index.html")));
app.get("/login", (req, res) => res.sendFile(path.join(v, "login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(v, "register.html")));
app.get("/dashboard", (req, res) => res.sendFile(path.join(v, "dashboard.html")));
app.get("/jobs", (req, res) => res.sendFile(path.join(v, "jobs.html")));
app.get("/accommodation", (req, res) => res.sendFile(path.join(v, "accommodation.html")));
app.get("/communities", (req, res) => res.sendFile(path.join(v, "communities.html")));
app.get("/admin", (req, res) => res.sendFile(path.join(v, "admin.html")));
app.get("/tips", (req, res) => res.sendFile(path.join(v, "tips.html")));
app.get("/map", (req, res) => res.sendFile(path.join(v, "map.html")));
app.get("/services", (req, res) => res.sendFile(path.join(v, "services.html")));
app.get("/noticeboard", (req, res) => res.sendFile(path.join(v, "noticeboard.html")));
app.use("/api/noticeboard", require("./routes/noticeboard"));
app.get("/profile", (req, res) => res.sendFile(path.join(v, "profile.html")));
app.get("/saved", (req, res) => res.sendFile(path.join(v, "saved.html")));
app.use((req, res) => res.status(404).sendFile(path.join(v, "404.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Running at http://localhost:${PORT}`));
console.log("Step 13 - listen called");