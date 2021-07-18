import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

import App from './App';
import { GlobalProvider } from './context/store';

import './index.css';

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://graphql-subscriptions-chatbox.herokuapp.com/graphql'
      : 'http://localhost:4000/graphql',
  credentials: 'include',
});

const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'wss://graphql-subscriptions-chatbox.herokuapp.com/graphql'
      : 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </ApolloProvider>,
  // </React.StrictMode>
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
