const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
var mongoose = require("mongoose");
const invoices = require("../data/data.json");
const User = require("../models/user.model");
const Invoice = require("../models/invoice.model");
const { registerValidation, loginValidation } = require("../validation");

// Validation

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) res.status(400).send(error.details[0].message);

  // Check if the user is already in the database
  const userExists = await User.findOne({ username: req.body.username });
  if (userExists) return res.status(400).send("Username already exists");

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) res.status(400).send(error.details[0].message);

  // Check if the username exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
