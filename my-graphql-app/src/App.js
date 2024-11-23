import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Import your custom styles for modern design

// Import your components
import Comptes from './components/Comptes';
import AddCompte from './components/AddCompte';
import AddTransaction from './components/AddTransaction';
import Transactions from './components/Transactions';
import TransactionStats from './components/TransactionStats';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="header">GraphQL React App</h1>

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          <Link to="/add-compte">
            <button className="nav-btn">Add Compte</button>
          </Link>
          <Link to="/add-transaction">
            <button className="nav-btn">Add Transaction</button>
          </Link>
          <Link to="/comptes">
            <button className="nav-btn">Comptes</button>
          </Link>
          <Link to="/transactions">
            <button className="nav-btn">Transactions</button>
          </Link>
          <Link to="/transaction-stats">
            <button className="nav-btn">Transaction Stats</button>
          </Link>
        </div>

        {/* Route Definitions */}
        <Routes>
          <Route path="/add-compte" element={<AddCompte />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/comptes" element={<Comptes />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transaction-stats" element={<TransactionStats />} />
          <Route path="/" element={
            <div className="welcome">
              
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
