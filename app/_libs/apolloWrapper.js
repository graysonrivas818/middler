'use client';

import {
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from '@apollo/experimental-nextjs-app-support/ssr';

import { GRAPHQL_ENDPOINT } from './config'; // ← now pulled from the helper

function makeClient() {
  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    headers: { 'Apollo-Require-Preflight': 'true' },
  });

  // example upload link — keep as you had it
  const uploadLink = new ApolloLink((operation, forward) => {
    if (operation.variables?.file) {
      const formData = new FormData();
      formData.append('file', operation.variables.file);
      operation.setContext({
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData,
      });
    }
    return forward(operation);
  });

  return new NextSSRApolloClient({
    ssrMode: typeof window === 'undefined',
    cache: new NextSSRInMemoryCache({ addTypename: false, include: 'active' }),
    link: ApolloLink.from([uploadLink, httpLink]),
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
