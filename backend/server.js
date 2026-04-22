require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const { User, Expense } = require("./models");
const auth = require("./auth");

const app = express();
app.use(express.json());
app.use(cors());

/* ----------- DB CONNECT ----------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

/* ----------- ROUTES ----------- */

// Register
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });

  res.send("Registered");
});

// Login
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("User not found");

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) return res.status(400).send("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});

// Add Expense
app.post("/api/expense", auth, async (req, res) => {
  await Expense.create({
    userId: req.user.id,
    title: req.body.title,
    amount: req.body.amount,
    category: req.body.category
  });

  res.send("Expense Added");
});

// Get Expenses
app.get("/api/expenses", auth, async (req, res) => {
  const data = await Expense.find({ userId: req.user.id });
  res.json(data);
});

/* ----------- SERVER ----------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on " + PORT));