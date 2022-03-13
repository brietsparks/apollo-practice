import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ESTABLISHMENT } from '../graphql';

export interface EstablishmentProps {
  id: string;
}

export function Establishment(props: EstablishmentProps) {
  const { data, loading, error } = useQuery(GET_ESTABLISHMENT, {
    variables: {
      id: props.id
    },
    fetchPolicy: 'cache-only'
  });

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
