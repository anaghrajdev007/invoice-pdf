const pdf = require('html-pdf');
const ejs = require('ejs');
const path = require('path');

exports.processInvoiceData = (data) => {
  const items = data.items.map(item => {
    const netAmount = item.unitPrice * item.quantity - item.discount;
    const taxAmount = netAmount * (item.taxRate / 100);
    const totalAmount = netAmount + taxAmount;

    return {
      ...item,
      netAmount,
      taxAmount,
      totalAmount
    };
  });

  const totalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0);
  const totalAmountWords = convertNumberToWords(totalAmount);

  return { items, totalAmount, totalAmountWords };
};

exports.generateHtmlTemplate = async (invoice) => {
  const templatePath = path.join(__dirname, '../templates/invoiceTemplate.ejs');
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { invoice }, (err, str) => {
      if (err) reject(err);
      else resolve(str);
    });
  });
};

exports.generatePdf = (htmlTemplate, res) => {
  pdf.create(htmlTemplate).toStream((err, stream) => {
    if (err) return res.status(500).send(err);
    res.setHeader('Content-type', 'application/pdf');
    stream.pipe(res);
  });
};

const convertNumberToWords = (amount) => {
  // Simple conversion logic or use a library like 'number-to-words'
  return amount.toString();
};
