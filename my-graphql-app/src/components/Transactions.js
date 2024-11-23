import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

// Define the GraphQL query to get transactions for a specific account (compteId)
const GET_TRANSACTIONS_BY_COMPTE = gql`
  query compteTransactions($id: ID!) {
    compteTransactions(id: $id) {
      id
      montant
      date
      type
      compte {
        id
        solde
        dateCreation
        type
      }
    }
  }
`;

const Transactions = () => {
  const [compteId, setCompteId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Use Apollo Client's `useQuery` hook to fetch transactions for a specific compteId
  const { loading, error, data } = useQuery(GET_TRANSACTIONS_BY_COMPTE, {
    variables: { id: compteId },
    skip: !submitted, // Only execute the query after the form is submitted
  });

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true); // Trigger query after form submission
  };

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Enter Compte ID to view transactions</h2>
      
      {/* Form for user input */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="compteId">Compte ID:</label>
        <input
          type="text"
          id="compteId"
          value={compteId}
          onChange={(e) => setCompteId(e.target.value)}
          placeholder="Enter Compte ID"
        />
        <button type="submit">Fetch Transactions</button>
      </form>

      {/* Display transactions if data is fetched */}
      {submitted && data && (
        <div>
          <h3>Transactions for Compte ID: {compteId}</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Montant</th>
                <th>Date</th>
                <th>Type</th>
                <th>Compte ID</th>
                <th>Compte Solde</th>
                <th>Compte Date Creation</th>
                <th>Compte Type</th>
              </tr>
            </thead>
            <tbody>
              {data.compteTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.montant}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.compte.id}</td>
                  <td>{transaction.compte.solde}</td>
                  <td>{transaction.compte.dateCreation}</td>
                  <td>{transaction.compte.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
