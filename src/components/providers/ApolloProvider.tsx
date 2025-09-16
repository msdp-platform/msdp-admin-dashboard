'use client';

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

interface ApolloProviderProps {
  children: React.ReactNode;
}

// Create the Apollo Client instance
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export function ApolloProvider({ children }: ApolloProviderProps) {
  return (
    <div data-apollo-client={client}>
      {children}
    </div>
  );
}
