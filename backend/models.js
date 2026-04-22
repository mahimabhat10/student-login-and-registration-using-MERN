const mongoose = require("mongoose");

// User
const User = mongoose.model("User", {
  name: String,
  email: { type: String, unique: true },
  password: String
});

// Expense
const Expense = mongoose.model("Expense", {
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now }
});

module.exports = { User, Expense };