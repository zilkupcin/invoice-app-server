const router = require("express").Router();
var mongoose = require("mongoose");
const verify = require("./verifyToken");
const User = require("../models/user.model");
const Invoice = require("../models/invoice.model");
const { invoiceValidation } = require("../validation");

router.get("/", verify, async (req, res) => {
  // Find all invoices for this specific user
  const userInvoices = await Invoice.find({ userId: req.user._id });

  // If there are invoices, return them to the client
  if (userInvoices) {
    res.json(userInvoices);
  } else {
    res.status(404).send("No invoices found for this user");
  }
});

router.get("/:invoiceId", verify, async (req, res) => {
  const invoiceId = req.params.invoiceId;

  try {
    // Find the specific invoice
    const invoice = await Invoice.findOne({
      userId: req.user._id,
      _id: invoiceId,
    });

    // Return the invoices in JSON format
    if (invoice) {
      res.json(invoice);
    } else {
      res.json([]);
    }
  } catch (e) {
    res.status(400).send("No invoice found");
  }
});

router.post("/delete/:invoiceId", verify, async (req, res) => {
  const invoiceId = req.params.invoiceId;

  try {
    // Find and delete an invoice with the given ID
    const response = await Invoice.deleteOne({
      userId: req.user._id,
      _id: invoiceId,
    });

    if (response.deletedCount > 0) {
      res.status(200).send("Success");
    } else {
      res.status(400).send("Invoice not found");
    }
  } catch (e) {
    res.status(400).send("Invoice not found");
  }
});

router.post("/edit/:invoiceId", verify, async (req, res) => {
  const invoiceId = req.params.invoiceId;

  // Validate user input
  const { error } = invoiceValidation(req.body);

  if (error) res.status(400).json(error);

  try {
    // Update the invoice with given data
    const invoice = await Invoice.updateOne(
      {
        _id: invoiceId,
        userId: req.user._id,
      },
      req.body
    );

    res.status(200).json(invoice);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.get("/paid/:invoiceId", verify, async (req, res) => {
  const invoiceId = req.params.invoiceId;

  try {
    // Set the specific invoice as paid
    const invoice = await Invoice.updateOne(
      {
        _id: invoiceId,
        userId: req.user._id,
      },
      { status: "paid" }
    );

    res.status(200).json(invoice);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.post("/add", verify, async (req, res) => {
  const userId = req.user._id;

  const invoiceData = { ...req.body };

  // Validate the user input
  const { error } = invoiceValidation(invoiceData);
  if (error) res.status(400).send(error.details[0].message);

  // Validate each invoice item
  invoiceData.items.forEach(
    (item) => (item._id = new mongoose.mongo.ObjectId())
  );

  // Create a new Invoice
  const invoice = new Invoice({ ...invoiceData, userId });

  // Sasve the invoice
  const savedInvoice = await invoice.save();
  res.status(200).send(savedInvoice._id);
});

module.exports = router;
