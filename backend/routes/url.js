const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

// Helper function to generate random short code
function generateShortCode() {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Helper function to check if URL is valid
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

// POST /api/shorten - Create short URL
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    // Check if URL is provided
    if (!originalUrl) {
      return res.status(400).json({ error: "Please provide a URL" });
    }

    // Check if URL is valid
    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({ error: "Please provide a valid URL" });
    }

    // Check if URL already exists
    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      return res.json({
        originalUrl: existingUrl.originalUrl,
        shortUrl: `http://localhost:5000/${existingUrl.shortCode}`,
        shortCode: existingUrl.shortCode,
      });
    }

    // Generate unique short code
    let shortCode = generateShortCode();
    let existingShortCode = await Url.findOne({ shortCode });

    while (existingShortCode) {
      shortCode = generateShortCode();
      existingShortCode = await Url.findOne({ shortCode });
    }

    // Create new URL
    const newUrl = new Url({
      originalUrl,
      shortCode,
    });

    await newUrl.save();

    res.json({
      originalUrl: newUrl.originalUrl,
      shortUrl: `http://localhost:5000/${newUrl.shortCode}`,
      shortCode: newUrl.shortCode,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/urls - Get all URLs (for admin page)
router.get("/urls", async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
