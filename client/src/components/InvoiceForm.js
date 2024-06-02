import React, { useState } from 'react';
import axios from 'axios';

const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState({
    sellerDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      panNo: '',
      gstNo: ''
    },
    placeOfSupply: '',
    billingDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: ''
    },
    shippingDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: ''
    },
    placeOfDelivery: '',
    orderDetails: {
      orderNo: '',
      orderDate: ''
    },
    invoiceDetails: {
      invoiceNo: '',
      invoiceDate: '',
      reverseCharge: false
    },
    items: [
      {
        description: '',
        unitPrice: 0,
        quantity: 0,
        discount: 0,
        taxRate: 18
      }
    ],
    signature: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...invoiceData.items];
    items[index][name] = value;
    setInvoiceData({ ...invoiceData, items });
  };

  const handleAddItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', unitPrice: 0, quantity: 0, discount: 0, taxRate: 18 }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/invoices', invoiceData);
      console.log('Invoice created:', response.data);
      window.open(`http://localhost:5000/invoices/${response.data._id}/pdf`, '_blank');
    } catch (error) {
      console.error('There was an error creating the invoice:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Seller Details</h2>
      <input type="text" name="sellerDetails.name" placeholder="Seller Name" onChange={handleChange} />
      <input type="text" name="sellerDetails.address" placeholder="Seller Address" onChange={handleChange} />
      <input type="text" name="sellerDetails.city" placeholder="Seller City" onChange={handleChange} />
      <input type="text" name="sellerDetails.state" placeholder="Seller State" onChange={handleChange} />
      <input type="text" name="sellerDetails.pincode" placeholder="Seller Pincode" onChange={handleChange} />
      <input type="text" name="sellerDetails.panNo" placeholder="Seller PAN No" onChange={handleChange} />
      <input type="text" name="sellerDetails.gstNo" placeholder="Seller GST No" onChange={handleChange} />

      <h2>Billing Details</h2>
      <input type="text" name="billingDetails.name" placeholder="Billing Name" onChange={handleChange} />
      <input type="text" name="billingDetails.address" placeholder="Billing Address" onChange={handleChange} />
      <input type="text" name="billingDetails.city" placeholder="Billing City" onChange={handleChange} />
      <input type="text" name="billingDetails.state" placeholder="Billing State" onChange={handleChange} />
      <input type="text" name="billingDetails.pincode" placeholder="Billing Pincode" onChange={handleChange} />
      <input type="text" name="billingDetails.stateCode" placeholder="Billing State Code" onChange={handleChange} />

      <h2>Shipping Details</h2>
      <input type="text" name="shippingDetails.name" placeholder="Shipping Name" onChange={handleChange} />
      <input type="text" name="shippingDetails.address" placeholder="Shipping Address" onChange={handleChange} />
      <input type="text" name="shippingDetails.city" placeholder="Shipping City" onChange={handleChange} />
      <input type="text" name="shippingDetails.state" placeholder="Shipping State" onChange={handleChange} />
      <input type="text" name="shippingDetails.pincode" placeholder="Shipping Pincode" onChange={handleChange} />
      <input type="text" name="shippingDetails.stateCode" placeholder="Shipping State Code" onChange={handleChange} />

      <h2>Order Details</h2>
      <input type="text" name="orderDetails.orderNo" placeholder="Order Number" onChange={handleChange} />
      <input type="date" name="orderDetails.orderDate" placeholder="Order Date" onChange={handleChange} />

      <h2>Invoice Details</h2>
      <input type="text" name="invoiceDetails.invoiceNo" placeholder="Invoice Number" onChange={handleChange} />
      <input type="date" name="invoiceDetails.invoiceDate" placeholder="Invoice Date" onChange={handleChange} />
      <label>
        Reverse Charge
        <input type="checkbox" name="invoiceDetails.reverseCharge" onChange={(e) => handleChange({ target: { name: 'invoiceDetails.reverseCharge', value: e.target.checked } })} />
      </label>

      <h2>Items</h2>
      {invoiceData.items.map((item, index) => (
        <div key={index}>
          <input type="text" name="description" placeholder="Description" onChange={(e) => handleItemChange(index, e)} />
          <input type="number" name="unitPrice" placeholder="Unit Price" onChange={(e) => handleItemChange(index, e)} />
          <input type="number" name="quantity" placeholder="Quantity" onChange={(e) => handleItemChange(index, e)} />
          <input type="number" name="discount" placeholder="Discount" onChange={(e) => handleItemChange(index, e)} />
          <input type="number" name="taxRate" placeholder="Tax Rate" onChange={(e) => handleItemChange(index, e)} />
        </div>
      ))}
      <button type="button" onClick={handleAddItem}>Add Item</button>

      <h2>Signature</h2>
      <input type="text" name="signature" placeholder="Signature" onChange={handleChange} />

      <button type="submit">Create Invoice</button>
    </form>
  );
};

export default InvoiceForm;
