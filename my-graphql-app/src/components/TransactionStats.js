import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define the GraphQL query to get transaction statistics
const GET_TRANSACTION_STATS = gql`
  query {
    transactionStats {
      count
      sumDepots
      sumRetraits
    }
  }
`;

const TransactionStats = () => {
  // Use Apollo Client's `useQuery` hook to fetch the transaction statistics
  const { loading, error, data } = useQuery(GET_TRANSACTION_STATS);

  if (loading) return <p>Loading transaction statistics...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Transaction Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Total Transactions</th>
            <th>Total Depots</th>
            <th>Total Retraits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.transactionStats.count}</td>
            <td>{data.transactionStats.sumDepots}</td>
            <td>{data.transactionStats.sumRetraits}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionStats;
