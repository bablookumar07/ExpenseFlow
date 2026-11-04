import Transaction from "../models/Transaction.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Generate JWT Token
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables.");
  }

  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Create user (password is hashed by User model)
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create account. Please try again.",
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to login. Please try again.",
    });
  }
};

// Update User Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailExists = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: req.user._id },
    });

    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered.",
      });
    }

    const user = await User.findById(req.user._id);

    user.name = name.trim();
    user.email = normalizedEmail;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update profile.",
    });
  }
};


// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current and new passwords are required.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters.",
      });
    }

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    if (await user.comparePassword(newPassword)) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password.",
      });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully. Please login again.",
    });
  } catch (error) {
    console.error("Password change error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to change password.",
    });
  }
};


// Delete User Account
export const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password confirmation is required.",
      });
    }

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Account deletion cancelled.",
      });
    }

    // Delete user's transactions first
    await Transaction.deleteMany({ user: user._id });

    // Delete user account
    await User.deleteOne({ _id: user._id });

    return res.status(200).json({
      success: true,
      message: "Account and associated transactions deleted successfully.",
    });
  } catch (error) {
    console.error("Account deletion error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete account.",
    });
  }
};

