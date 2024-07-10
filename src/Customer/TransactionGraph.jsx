import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransactionGraph = ({ selectedCustomer }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://youssefdardeermousa.github.io/transition-data/transition.json');
        setTransactions(response?.data?.transactions);
        console.log("response", response?.data?.transactions);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    fetchTransactions();
  }, []);

  const customerTransactions = transactions
    .filter(transaction => transaction.customer_id  == selectedCustomer.id)
    .map(transaction => ({
      date: transaction.date,
      amount: transaction.amount
    }));

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h3>Transactions for {selectedCustomer.name}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={customerTransactions}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionGraph;
