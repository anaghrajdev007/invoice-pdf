import React from 'react';
import InvoiceForm from './components/InvoiceForm';

const App = () => {
  return (
    <div>
      <h1>Create Invoice</h1>
      <h2>It will generate pdf as well</h2>
      <InvoiceForm />
    </div>
  );
};

export default App;
