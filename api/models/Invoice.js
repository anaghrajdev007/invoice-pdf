const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  description: String,
  unitPrice: Number,
  quantity: Number,
  discount: Number,
  taxRate: Number,
  netAmount: Number,
  taxAmount: Number,
  totalAmount: Number
});

const invoiceSchema = new mongoose.Schema({
  sellerDetails: {
    name: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    panNo: String,
    gstNo: String
  },
  placeOfSupply: String,
  billingDetails: {
    name: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    stateCode: String
  },
  shippingDetails: {
    name: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    stateCode: String
  },
  placeOfDelivery: String,
  orderDetails: {
    orderNo: String,
    orderDate: Date
  },
  invoiceDetails: {
    invoiceNo: String,
    invoiceDate: Date,
    reverseCharge: Boolean
  },
  items: [itemSchema],
  totalAmount: Number,
  totalAmountWords: String,
  signature: String
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;
