import React from 'react';
import {
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client';

import { apolloClient } from './apollo-client';
import { CreateEstablishment } from './components/create-establishment';
import { CustodianEstablishments } from './components/custodian-establishments';

export function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <MyComponent />
    </ApolloProvider>
  );
}

function MyComponent() {
  // const { loading, error, data } = useQuery(QUERY, {
  //   variables: {
  //     establishmentId: 'fd87ca66-714a-4724-b4ac-d4a4f6942dd9'
  //   }
  // });
  //
  // if (error) {
  //   console.log(error);
  // }

  return (
    <div>
      <CreateEstablishment />

      <hr/>

      <CustodianEstablishments />
    </div>
  )
}
