const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const { redirectUrl } = require("./controllers/urlController");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Health Route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

// API Routes
const urlRoutes = require("./routes/urlRoutes");
app.use("/api", urlRoutes);

// Home Page
app.get("/", (req, res) => {
  res.send("🚀 URL Shortener Backend Running");
});

// Public Redirect Route (NO /api)
app.get("/:code", redirectUrl);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("==================================");
  console.log(`🚀 Server running on ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  console.log("==================================");
});