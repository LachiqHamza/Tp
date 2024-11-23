import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// GraphQL Mutation to save a new account
const SAVE_COMPTE = gql`
  mutation SaveCompte($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
      id
      solde
      dateCreation
      type
    }
  }
`;

const AddCompte = () => {
  const [solde, setSolde] = useState('');
  const [dateCreation, setDateCreation] = useState('');
  const [type, setType] = useState('COURANT');

  const [saveCompte] = useMutation(SAVE_COMPTE);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the date to 'yyyy/MM/dd' format
    const formattedDate = formatDate(dateCreation);

    try {
      await saveCompte({
        variables: {
          compte: { solde: parseFloat(solde), dateCreation: formattedDate, type },
        },
      });
      alert('Account saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving account');
    }
  };

  // Helper function to format date as yyyy/MM/dd
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding leading 0 if month < 10
    const day = date.getDate().toString().padStart(2, '0'); // Adding leading 0 if day < 10
    return `${year}/${month}/${day}`;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Add New Account</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Solde: </label>
          <input
            type="number"
            value={solde}
            onChange={(e) => setSolde(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Date Creation: </label>
          <input
            type="date"
            value={dateCreation}
            onChange={(e) => setDateCreation(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Type: </label>
          <select value={type} onChange={(e) => setType(e.target.value)} style={styles.input}>
            <option value="COURANT">COURANT</option>
            <option value="EPARGNE">EPARGNE</option>
          </select>
        </div>
        <button type="submit" style={styles.submitButton}>Add Account</button>
      </form>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    fontSize: '1.8rem',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '1rem',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border 0.3s',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default AddCompte;
