// src/ApolloClient.js

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Set up the Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8082/graphql', // Update with your GraphQL API URL
  }),
  cache: new InMemoryCache(),
});

export default client;
