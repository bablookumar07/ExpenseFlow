
import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import User from "./models/User.js";
import Transaction from "./models/Transaction.js";

dotenv.config();

const migrateTransactions = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Find your registered account
    const user = await User.findOne({
      email: "babloo@example.com",
    });

    if (!user) {
      throw new Error("Registered user not found");
    }

    // Assign only transactions that have no owner
    const result = await Transaction.updateMany(
      {
        $or: [
          { user: { $exists: false } },
          { user: null },
        ],
      },
      {
        $set: {
          user: user._id,
        },
      }
    );

    console.log("Migration completed successfully!");
    console.log("Account:", user.email);
    console.log("Matched transactions:", result.matchedCount);
    console.log("Updated transactions:", result.modifiedCount);
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

migrateTransactions();
