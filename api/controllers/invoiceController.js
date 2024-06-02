const Invoice = require('../models/Invoice');
const invoiceService = require('../services/invoiceService');

exports.createInvoice = async (req, res) => {
  try {
    const { items, totalAmount, totalAmountWords } = invoiceService.processInvoiceData(req.body);
    
    const invoice = new Invoice({
      ...req.body,
      items,
      totalAmount,
      totalAmountWords
    });

    await invoice.save();
    res.status(201).send(invoice);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getInvoicePdf = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).send('Invoice not found');
    }

    const htmlTemplate = await invoiceService.generateHtmlTemplate(invoice);
    invoiceService.generatePdf(htmlTemplate, res);
  } catch (error) {
    res.status(400).send(error);
  }
};
