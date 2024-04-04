import React, { useState, useEffect, useMemo } from 'react';
import api from '../api';
import './Report.css'; 

// Update State and Effects
// First, we add necessary state hooks for sorting, searching, and pagination.

const Report = () => {
  const [transactions, setTransactions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch Transactions
  const fetchTransactions = async () => {
    const response = await api.get('/transactions/');
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Implement Sorting

  const getSortIndicator = (columnName) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === 'ascending' ? 'sort-ascending' : 'sort-descending';
    }
    return '';
  };

  const sortedTransactions = useMemo(() => {
    let sortableItems = [...transactions];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [transactions, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // 3. Implement Searching
  // Filter the transactions before sorting them based on the search query.

  const filteredTransactions = useMemo(() => {
    return sortedTransactions.filter(
      transaction =>
        transaction.description.toLowerCase().includes(query.toLowerCase()) ||
        transaction.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [sortedTransactions, query]);

  // Implement Pagination
  // Calculate the necessary parameters for pagination based on the filtered transactions.

  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage, filteredTransactions]);

  // Update the Render Method
  // Include input fields for searching, clickable headers for sorting, and buttons for pagination.

  return (
    <div className='container'>
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <table className='table table-striped table-bordered table-hover'>
        <thead>
          <tr>
            <th onClick={() => requestSort('amount')}>
              Amount
              <span className={`sort-indicator ${getSortIndicator('amount')}`}></span>
            </th>
            <th onClick={() => requestSort('category')}>Category</th>
            <th onClick={() => requestSort('description')}>Description</th>
            <th>Income?</th>
            <th onClick={() => requestSort('date')}>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.description}</td>
              <td>{transaction.is_income ? 'Yes' : 'No'}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        {Array.from({ length: pageCount }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};


export default Report;
