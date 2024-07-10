import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import CustomerTable from './Customer/CustomerTable.jsx';
import TransactionGraph from './Customer/TransactionGraph.jsx';
import { Helmet } from 'react-helmet';

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
    <Router basename="/customer-and-transaction-data-exam">
      <div className="container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>CustomerData</title>
          <meta name="description" content="Create an application that retrieves the customer and transaction data from a provided API endpoint and displays it in a user-friendly format." />
        </Helmet>
        <h1 className="text-center my-4">Customer Transactions</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CustomerTable setSelectedCustomer={setSelectedCustomer} />
                {selectedCustomer && <TransactionGraph selectedCustomer={selectedCustomer} />}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
