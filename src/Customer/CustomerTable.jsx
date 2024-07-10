import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerTable = ({ setSelectedCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersResponse = await axios.get('https://youssefdardeermousa.github.io/customer-data/customer.json');
        const transactionsResponse = await axios.get('https://youssefdardeermousa.github.io/transition-data/transition.json');
        
        setCustomers(customersResponse?.data?.customers);
        setTransactions(transactionsResponse?.data?.transactions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCustomers = customers?.filter(customer =>
    customer?.name?.toLowerCase().includes(filter?.toLowerCase())
  );

  useEffect(() => {
    if (filter && filteredCustomers?.length === 0) {
      setMessage('Not Found Customer with that name');
    } else {
      setMessage('');
    }
  }, [filter, filteredCustomers]);

  const getTransactionTotal = (customerId) => {
    const customerTransactions = transactions?.filter(transaction => transaction.customer_id == customerId);
    const total = customerTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    return total;
  };

  return (
    <div className="container mb-4">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            
          </div>
        </div>
      ) : (
        <>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="🔎︎ Filter by customer name "
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Filter by customer name"
              aria-describedby="basic-addon1"
            />
          </div>
          {message && <p className="text-danger">{message}</p>}
          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Transactions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers?.map(customer => (
                <tr key={customer.id} onClick={() => setSelectedCustomer(customer)} style={{ cursor: 'pointer' }}>
                  <td>{customer.name}</td>
                  <td>{getTransactionTotal(customer.id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CustomerTable;
