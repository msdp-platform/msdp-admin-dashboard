import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      status
      items
      total
    }
  }
`;

export const GET_METRICS = gql`
  query GetMetrics {
    metrics {
      totalUsers
      totalOrders
      totalRevenue
    }
  }
`;

const httpLink = createHttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
