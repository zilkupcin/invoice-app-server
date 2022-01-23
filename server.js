const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const invoiceRoute = require("./routes/invoices");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB db connection established successfuly");
});

app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/invoices", invoiceRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
