const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.post('/', invoiceController.createInvoice);
router.get('/:id/pdf', invoiceController.getInvoicePdf);

module.exports = router;
