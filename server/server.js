const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Routes
const lostRoutes = require("./routes/lostRoutes");
const foundRoutes = require("./routes/foundRoutes");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.json({
    message: "ABES Lost & Found Backend is running successfully!"
  });
});

// ================= AUTH API =================

app.use("/api/auth", authRoutes);

// ================= LOST ITEMS API =================

app.use("/api/lost", lostRoutes);

// ================= FOUND ITEMS API =================

app.use("/api/found", foundRoutes);

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});