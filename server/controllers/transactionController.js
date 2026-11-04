
import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get logged-in user's transactions
// @route   GET /api/transactions
// @access  Private

export const getTransactions = asyncHandler(async (req, res) => {
  const { month, year } = req.query;

  // Only fetch transactions belonging to logged-in user
  const filter = {
    user: req.user._id,
  };

  // Validate month and year
  if (month !== undefined || year !== undefined) {
    const parsedMonth = Number(month);
    const parsedYear = Number(year);

    if (
      !month ||
      !year ||
      !Number.isInteger(parsedMonth) ||
      !Number.isInteger(parsedYear) ||
      parsedMonth < 1 ||
      parsedMonth > 12 ||
      parsedYear < 2000 ||
      parsedYear > 2100
    ) {
      res.status(400);
      throw new Error("Please provide a valid month and year");
    }

    const startDate = new Date(
      Date.UTC(parsedYear, parsedMonth - 1, 1)
    );

    const endDate = new Date(
      Date.UTC(parsedYear, parsedMonth, 1)
    );

    filter.date = {
      $gte: startDate,
      $lt: endDate,
    };
  }

  const transactions = await Transaction.find(filter).sort({
    date: -1,
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    count: transactions.length,
    data: transactions,
  });
});


// @desc    Create a transaction for logged-in user
// @route   POST /api/transactions
// @access  Private

export const createTransaction = asyncHandler(async (req, res) => {
  const { title, amount, type, category, date } = req.body;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    amount === undefined ||
    !["income", "expense"].includes(type) ||
    typeof category !== "string" ||
    !category.trim()
  ) {
    res.status(400);
    throw new Error("Please provide valid transaction details");
  }

  if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
    res.status(400);
    throw new Error("Amount must be greater than zero");
  }

  if (date && Number.isNaN(Date.parse(date))) {
    res.status(400);
    throw new Error("Please provide a valid date");
  }

  const transaction = await Transaction.create({
    user: req.user._id,
    title: title.trim(),
    amount: Number(amount),
    type,
    category: category.trim(),
    ...(date ? { date } : {}),
  });

  res.status(201).json({
    success: true,
    message: "Transaction created successfully",
    data: transaction,
  });
});


// @desc    Update logged-in user's transaction
// @route   PUT /api/transactions/:id
// @access  Private

export const updateTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid transaction ID");
  }

  const { title, amount, type, category, date } = req.body;

  // Find transaction only if it belongs to logged-in user
  const transaction = await Transaction.findOne({
    _id: id,
    user: req.user._id,
  });

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      res.status(400);
      throw new Error("Title cannot be empty");
    }
    transaction.title = title.trim();
  }

  if (category !== undefined) {
    if (typeof category !== "string" || !category.trim()) {
      res.status(400);
      throw new Error("Category cannot be empty");
    }
    transaction.category = category.trim();
  }

  if (amount !== undefined) {
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      res.status(400);
      throw new Error("Amount must be greater than zero");
    }
    transaction.amount = Number(amount);
  }

  if (type !== undefined) {
    if (!["income", "expense"].includes(type)) {
      res.status(400);
      throw new Error("Invalid transaction type");
    }
    transaction.type = type;
  }

  if (date !== undefined) {
    if (!date || Number.isNaN(Date.parse(date))) {
      res.status(400);
      throw new Error("Please provide a valid date");
    }
    transaction.date = date;
  }

  const updatedTransaction = await transaction.save();

  res.status(200).json({
    success: true,
    message: "Transaction updated successfully",
    data: updatedTransaction,
  });
});


// @desc    Delete logged-in user's transaction
// @route   DELETE /api/transactions/:id
// @access  Private

export const deleteTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid transaction ID");
  }

  // Find transaction only if it belongs to logged-in user
  const transaction = await Transaction.findOne({
    _id: id,
    user: req.user._id,
  });

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  await transaction.deleteOne();

  res.status(200).json({
    success: true,
    message: "Transaction deleted successfully",
    data: {
      id: transaction._id,
    },
  });
});


// @desc    Get logged-in user's expense breakdown by category
// @route   GET /api/transactions/summary/categories
// @access  Private

export const getCategorySummary = asyncHandler(async (req, res) => {
  const { month, year } = req.query;

  const matchStage = {
    user: new mongoose.Types.ObjectId(req.user._id),
    type: "expense",
  };

  // Optional monthly filtering
  if (month !== undefined || year !== undefined) {
    const parsedMonth = Number(month);
    const parsedYear = Number(year);

    if (
      !month ||
      !year ||
      !Number.isInteger(parsedMonth) ||
      !Number.isInteger(parsedYear) ||
      parsedMonth < 1 ||
      parsedMonth > 12 ||
      parsedYear < 2000 ||
      parsedYear > 2100
    ) {
      res.status(400);
      throw new Error("Please provide a valid month and year");
    }

    matchStage.date = {
      $gte: new Date(Date.UTC(parsedYear, parsedMonth - 1, 1)),
      $lt: new Date(Date.UTC(parsedYear, parsedMonth, 1)),
    };
  }

  const summary = await Transaction.aggregate([
    {
      $match: matchStage,
    },
    {
      $group: {
        _id: "$category",
        totalAmount: {
          $sum: "$amount",
        },
        transactionCount: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        totalAmount: -1,
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        totalAmount: 1,
        transactionCount: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    count: summary.length,
    data: summary,
  });
});
