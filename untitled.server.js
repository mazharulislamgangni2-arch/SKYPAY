const express = require("express");
const helmet = require("helmet");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Security and middleware
app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(express.json({ limit: "1mb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "SKYPAY",
    message: "Server is running",
    time: new Date().toISOString()
  });
});

// Public app configuration
app.get("/api/config", (req, res) => {
  res.json({
    appName: "SKYPAY",
    defaultLanguage: "en",
    supportedLanguages: ["en", "bn"],
    paymentMethods: ["bKash", "Nagad"]
  });
});

// Serve HTML files
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Unknown API route
app.use("/api", (req, res) => {
  res.status(404).json({
    error: "API route not found"
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`SKYPAY server running on port ${PORT}`);
});