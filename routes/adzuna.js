const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const APP_ID = process.env.ADZUNA_APP_ID;
const APP_KEY = process.env.ADZUNA_APP_KEY;

router.get("/", auth, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const what = req.query.what || "student part time";
    const where = req.query.where || "London";

    const url = `https://api.adzuna.com/v1/api/jobs/gb/search/${page}?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=20&what=${encodeURIComponent(what)}&where=${encodeURIComponent(where)}&content-type=application/json`;

    const response = await fetch(url);
    const data = await response.json();

    const jobs = (data.results || []).map(job => ({
      _id: job.id,
      title: job.title,
      company: job.company?.display_name || "Unknown company",
      location: job.location?.display_name || "London",
      description: job.description,
      salary: job.salary_min
        ? `£${Math.round(job.salary_min).toLocaleString()} - £${Math.round(job.salary_max).toLocaleString()}`
        : "Competitive",
      type: "Part-time",
      applyUrl: job.redirect_url,
      source: "adzuna"
    }));

    res.json({ jobs, total: data.count || 0 });
  } catch (err) {
    console.error("Adzuna error:", err.message);
    res.status(500).json({ message: "Failed to fetch jobs from Adzuna" });
  }
});

module.exports = router;
