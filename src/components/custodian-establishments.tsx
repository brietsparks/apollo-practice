import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ESTABLISHMENTS_OF_CUSTODIAN, GetEstablishmentsOfCustodianResult } from '../graphql';

import { zeroUuid } from './data';
import { Establishment } from './establishment';

export interface CustodianEstablishmentsProps {

}

export function CustodianEstablishments(props: CustodianEstablishmentsProps) {
  const { data, error, loading, fetchMore } = useQuery<GetEstablishmentsOfCustodianResult>(GET_ESTABLISHMENTS_OF_CUSTODIAN, {
    variables: {
      params: {
        id: zeroUuid,
      },
      pagination: {
        limit: 2,
        field: 'creationTimestamp',
        sort: 'desc'
      }
    },
    // maybe these are needed?...
    // fetchPolicy: "network-only",
    // nextFetchPolicy: "cache-first"
  });

  const handleClickMore = React.useCallback(() => {
    void fetchMore({
      variables: {
        pagination: {
          limit: 2,
          field: 'creationTimestamp',
          cursor: data?.custodian.custodies.pagination.cursor,
          sort: 'desc'
        }
      },
      updateQuery(prev, next) {
        return {
          custodian: {
            ...prev.custodian,
            custodies: {
              items: [
                ...prev.custodian.custodies.items,
                ...(next?.fetchMoreResult?.custodian.custodies.items || [])
              ],
              pagination: {
                hasMore: next.fetchMoreResult?.custodian.custodies.pagination.hasMore || false,
                cursor: next.fetchMoreResult?.custodian.custodies.pagination.cursor || prev.custodian.custodies.pagination.cursor
              }
            }
          }
        }
      }
    });
  }, [data]);

  return (
    <div>
      {loading && <p>Loading...</p>}

      {error && <p>Error!</p>}

      {data && (
        data.custodian.custodies.items.map(item => {
          const id = item.establishment.id;
          return (
            <Establishment key={id} id={id} />
          );
        })
      )}

      <button onClick={handleClickMore}>More</button>
    </div>
  )
}
