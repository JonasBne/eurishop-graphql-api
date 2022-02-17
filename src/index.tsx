import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import config from './config';

import App from './App';

console.log(config.serverUrl);

const client = new ApolloClient({
  uri: config.serverUrl,
  cache: new InMemoryCache(),
});

const root = document.getElementById('app');

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  root,
);
