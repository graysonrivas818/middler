'use client';

import {
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

  return new NextSSRApolloClient({
    ssrMode: typeof window === 'undefined',
    cache: new NextSSRInMemoryCache({ addTypename: false, include: 'active' }),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
