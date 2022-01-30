const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    userId: { type: String, required: true },
    streetAddress: {
      type: String,
      required: function () {
        return this.status !== "draft";
      },
    },
    city: {
      type: String,
      required: function () {
        return this.status !== "draft";
      },
    },
    postCode: {
      type: String,
      required: function () {
        return this.status !== "draft";
      },
    },
    country: {
      type: String,
      required: function () {
        return this.status !== "draft";
      },
    },
    clientName: {
      type: String,
      required: function () {
        return this.status !== "draft";
      },
    },
    clientEmail: {
      type: String,
      required: function () {
        return this.status !== "draft";
      },
    },
    clientStreetAddress: {
      type: String,
      required: function () {
        return this.status !== "draft";
      },
    },
    clientCity: {
      type: String,
      required: function () {
        return this.status !== "draft";
      },
    },
    clientPostCode: {
      type: String,
      required: function () {
        return this.status !== "draft";
      },
    },
    clientCountry: {
      type: String,
      required: function () {
        return this.status !== "draft";
      },
    },
    date: {
      type: Date,
      required: function () {
        return this.status !== "draft";
      },
    },
    paymentTerms: {
      type: String,
      enum: ["net_1", "net_7", "net_14", "net_30"],
      default: "net_30",
    },
    status: {
      type: String,
      enum: ["draft", "pending", "paid"],
      default: "draft",
    },
    projectDescription: {
      type: String,
      required: function () {
        return this.status !== "draft";
      },
    },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
