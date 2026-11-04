
import express from "express";

import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getCategorySummary,
} from "../controllers/transactionController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All transaction routes require authentication
router.use(protect);

// GET all transactions
router.get("/", getTransactions);

// CREATE a transaction
router.post("/", createTransaction);

// UPDATE a transaction
router.put("/:id", updateTransaction);

// DELETE a transaction
router.delete("/:id", deleteTransaction);

// GET category summary
router.get("/summary/categories", getCategorySummary);

export default router;
