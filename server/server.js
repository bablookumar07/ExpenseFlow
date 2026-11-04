
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";

import transactionRoutes from "./routes/transactionRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
// Parse incoming JSON
app.use(express.json({ limit: "10kb" }));

// Health-check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Personal Expense Tracker API is running!",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Transaction routes
app.use("/api/transactions", transactionRoutes);

// Handle undefined routes
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

// Start server after database connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
