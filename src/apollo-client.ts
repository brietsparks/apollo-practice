import { ApolloClient, InMemoryCache, FieldReadFunction } from "@apollo/client";

type CacheRedirects = Record<string, FieldReadFunction>;

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // custodian(_, { args, toReference }) {
        //   return toReference({
        //     __typename: 'Custodian',
        //     id: args?.id,
        //   });
        // },
        establishment(_, { args, toReference }) {
          return toReference({
            __typename: 'Establishment',
            id: args?.id,
          });
        },
      },
    },
    // PaginatedCustodies: {
    //   fields: {
    //     items: {
    //       // not working yet...
    //       merge(existing = [], incoming) {
    //         return [...existing, ...incoming];
    //       }
    //     }
    //   }
    // }
  },
});

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache
});


