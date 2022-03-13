import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        establishment(_, { args, toReference }) {
          return toReference({
            __typename: 'Establishment',
            id: args?.id,
          });
        },
      },
    },
    Custodian: {
      fields: {
        custodies: {
          keyArgs: false,
          merge(existing, incoming) {
            return {
              items: [
                ...(existing?.items || []),
                ...(incoming?.items || [])
              ],
              pagination: incoming.pagination
            };
          }
        }
      }
    },
  },
});

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache
});


