const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    username: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String, required: true },
    country: { type: String, required: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientStreetAddress: { type: String, required: true },
    clientCity: { type: String, required: true },
    clientPostCode: { type: String, required: true },
    clientCountry: { type: String, required: true },
    date: { type: Date, required: true },
    paymentTerms: { type: String, enum: ['net_15', 'net_30'], default:'net_30'},
    status: {type: String, enum: ['draft', 'pending', 'paid'], default:'draft'},
    items: { type: Array, required: true }
}, {
    timestamps: true
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;