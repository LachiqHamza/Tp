import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// GraphQL Mutation to add a transaction
const ADD_TRANSACTION = gql`
  mutation AddTransaction($transactionRequest: TransactionRequest!) {
    addTransaction(transactionRequest: $transactionRequest) {
      id
      montant
      date
      type
      compte {
        id
      }
    }
  }
`;

const AddTransaction = () => {
  const [compteId, setCompteId] = useState('');
  const [montant, setMontant] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('DEPOT');

  const [addTransaction] = useMutation(ADD_TRANSACTION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the date as 'yyyy/MM/dd' before sending it
    const formattedDate = formatDate(date);

    try {
      await addTransaction({
        variables: {
          transactionRequest: { compteId, montant: parseFloat(montant), date: formattedDate, type },
        },
      });
      alert('Transaction added successfully!');
    } catch (err) {
      console.error(err);
      alert('Error adding transaction');
    }
  };

  // Helper function to format date as yyyy/MM/dd
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <div className="transaction-form-container">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label>Compte ID:</label>
          <input
            type="text"
            value={compteId}
            onChange={(e) => setCompteId(e.target.value)}
            placeholder="Enter Compte ID"
            required
          />
        </div>
        <div className="form-group">
          <label>Montant:</label>
          <input
            type="number"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            placeholder="Enter Amount"
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="DEPOT">DEPOT</option>
            <option value="RETRAIT">RETRAIT</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Add Transaction</button>
      </form>

      <style jsx>{`
        .transaction-form-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .transaction-form h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .transaction-form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          font-weight: bold;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .submit-button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        .submit-button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default AddTransaction;
