const express = require("express");

const {
  createShortUrl,
  redirectUrl,
  getAnalytics,
  getAllUrls,
  deleteUrl,
} = require("../controllers/urlController");

const router = express.Router();

// Create short URL
router.post("/shorten", createShortUrl);

// Get all URLs
router.get("/urls", getAllUrls);

// Delete URL
router.delete("/urls/:id", deleteUrl);

// Get analytics
router.get("/analytics/:code", getAnalytics);

// Redirect short URL
router.get("/:code", redirectUrl);

module.exports = router;