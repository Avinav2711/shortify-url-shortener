const shortid = require("shortid");
const validator = require("validator");
const Url = require("../models/url");

/**
 * @desc    Create Short URL
 * @route   POST /api/shorten
 * @access  Public
 */
const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, customAlias } = req.body;

    // Validate URL
    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    if (!validator.isURL(originalUrl)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid URL",
      });
    }

    // Check if URL already exists
    const existingUrl = await Url.findOne({ originalUrl });

    if (existingUrl) {
      return res.status(200).json({
        success: true,
        message: "URL already exists",
        url: {
          originalUrl: existingUrl.originalUrl,
          shortUrl: `${process.env.BASE_URL}/${existingUrl.shortCode}`,
          shortCode: existingUrl.shortCode,
          customAlias: existingUrl.customAlias,
          clicks: existingUrl.clicks,
          createdAt: existingUrl.createdAt,
        },
      });
    }

    // Generate short code
    let shortCode = shortid.generate();

    // Handle custom alias
    if (customAlias && customAlias.trim() !== "") {
      const normalizedAlias = customAlias.trim().toLowerCase();

      const aliasExists = await Url.findOne({
        shortCode: normalizedAlias,
      });

      if (aliasExists) {
        return res.status(409).json({
          success: false,
          message: "Custom alias already exists",
        });
      }

      shortCode = normalizedAlias;
    }

    // Save URL
    const url = await Url.create({
      originalUrl,
      shortCode,
      customAlias:
        customAlias && customAlias.trim() !== ""
          ? customAlias.trim().toLowerCase()
          : undefined,
    });

    return res.status(201).json({
      success: true,
      message: "Short URL created successfully",
      url: {
        originalUrl: url.originalUrl,
        shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
        shortCode: url.shortCode,
        customAlias: url.customAlias,
        clicks: url.clicks,
        createdAt: url.createdAt,
      },
    });
  } catch (err) {
    console.error("Create URL Error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Redirect Short URL
 * @route   GET /:code
 * @access  Public
 */
const redirectUrl = async (req, res) => {
  try {
    console.log("🔥 redirectUrl called");

    const { code } = req.params;

    console.log("Code received:", code);

    const url = await Url.findOne({
      shortCode: code,
    });

    console.log("MongoDB result:", url);

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    // Increase click count
    url.clicks += 1;

    // Update last visited
    url.lastVisited = new Date();

    await url.save();

    console.log("Redirecting to:", url.originalUrl);

    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error("Redirect Error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Get Analytics
 * @route   GET /api/analytics/:code
 * @access  Public
 */
const getAnalytics = async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({
      shortCode: code,
    });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    return res.status(200).json({
      success: true,
      analytics: {
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
        customAlias: url.customAlias,
        clicks: url.clicks,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt,
        lastVisited: url.lastVisited,
      },
    });
  } catch (err) {
    console.error("Analytics Error:", err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Get All URLs
 * @route   GET /api/urls
 * @access  Public
 */
const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({
      createdAt: -1,
    });

    const data = urls.map((url) => ({
      id: url._id,
      originalUrl: url.originalUrl,
      shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
      shortCode: url.shortCode,
      customAlias: url.customAlias,
      clicks: url.clicks,
      createdAt: url.createdAt,
      lastVisited: url.lastVisited,
    }));

    return res.status(200).json({
      success: true,
      count: data.length,
      urls: data,
    });
  } catch (err) {
    console.error("Get All URLs Error:", err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/**
 * @desc    Delete Short URL
 * @route   DELETE /api/urls/:id
 * @access  Public
 */
const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;

    // Find URL by MongoDB ID
    const url = await Url.findById(id);

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    // Delete URL
    await Url.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "URL deleted successfully",
    });
  } catch (err) {
    console.error("Delete URL Error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to delete URL",
    });
  }
};

module.exports = {
  createShortUrl,
  redirectUrl,
  getAnalytics,
  getAllUrls,
  deleteUrl,
};
