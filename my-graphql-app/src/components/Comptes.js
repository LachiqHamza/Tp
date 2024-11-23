// src/components/Comptes.js

import React from 'react';
import { useQuery, gql } from '@apollo/client';

// GraphQL Query to fetch all accounts
const GET_ALL_COMPTES = gql`
  query GetAllComptes {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

const Comptes = () => {
  const { loading, error, data } = useQuery(GET_ALL_COMPTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Comptes</h2>
      <ul>
        {data.allComptes.map(compte => (
          <li key={compte.id}>
            {compte.type} - {compte.solde} - {compte.dateCreation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comptes;
