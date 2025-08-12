const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/user");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// ✅ Allow frontend from Vercel + local dev
app.use(cors({
  origin: [
    process.env.FRONTEND_URL, // Your deployed frontend
    "http://localhost:5173", // Local dev frontend (optional)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// =======================
// API Routes
// =======================
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.send("Task Manager API is running 🚀");
});
app.options("*", cors({
  origin: "https://task-manager-seven-sandy-96.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5021;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
