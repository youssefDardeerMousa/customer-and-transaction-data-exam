import React, { useState, useEffect } from 'react';
 
import axios from 'axios';
import CustomerTable from './Customer/CustomerTable.jsx';
import TransactionGraph from './Customer/TransactionGraph.jsx';

const App = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://youssefdardeermousa.github.io/customer-data/customer.json');
        if (response.data.customers && response.data.customers.length > 0) {
          setSelectedCustomer(response.data.customers[0]);
        }
      } catch (error) {
        console.error("Error fetching customers", error);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">Customer Transactions</h1>
      <CustomerTable setSelectedCustomer={setSelectedCustomer} />
      {selectedCustomer && <TransactionGraph selectedCustomer={selectedCustomer} />}
    </div>
  );
};

export default App;
