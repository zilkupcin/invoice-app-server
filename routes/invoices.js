const router = require("express").Router();
var mongoose = require("mongoose");
const verify = require("./verifyToken");
const User = require("../models/user.model");
const Invoice = require("../models/invoice.model");

router.get("/", verify, async (req, res) => {
  const userInvoices = await Invoice.find({ userId: req.user._id });

  if (userInvoices) {
    res.json(userInvoices);
  } else {
    res.status(404).send("No invoices found for this user");
  }
});

router.get("/:invoiceId", verify, async (req, res) => {
  const invoiceId = req.params.invoiceId;

  try {
    const invoice = await Invoice.findOne({
      userId: req.user._id,
      _id: invoiceId,
    });

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
  console.log(invoiceId);

  try {
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

  // Validate data
  try {
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

router.post("/add", verify, async (req, res) => {
  const userId = req.user._id;

  const invoiceData = { ...req.body };

  invoiceData.items.forEach(
    (item) => (item._id = new mongoose.mongo.ObjectId())
  );

  const invoice = new Invoice({ ...invoiceData, userId });

  const savedInvoice = await invoice.save();
  res.status(200).send(savedInvoice._id);
});

module.exports = router;
