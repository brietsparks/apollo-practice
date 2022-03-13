import { gql } from '@apollo/client';

export interface Custody {
  id: string;
  establishment: Establishment;
}

export interface Establishment {
  id: string;
  name: string;
  shortDescription: string;
  profile: {
    image: {
      url: string
    }
  }
}

export const ESTABLISHMENT_FRAGMENT = gql`
  fragment EstablishmentFragment on Establishment {
    id
    name
    shortDescription
    profile {
      image {
        url
      }
    }
  }
`

export interface GetEstablishmentsOfCustodianResult {
  custodian: {
    id: string
    custodies: {
      items: Array<Custody>;
      pagination: {
        cursor?: string;
        hasMore: boolean;
      };
    }
  }
}

export const GET_ESTABLISHMENTS_OF_CUSTODIAN = gql`
  query custodian($params: GetCustodianParams!, $pagination: CursorPaginationParams!) {
    custodian(params: $params) {
      id
      custodies(pagination: $pagination) {
        items {
          id
          establishment {
            ...EstablishmentFragment
          }
        }
        pagination {
          cursor
          hasMore
        }
      }
    }
  }
  ${ESTABLISHMENT_FRAGMENT}
`;

export const GET_ESTABLISHMENT = gql`
  query establishment($id: String!) {
    establishment(id: $id) {
      ...EstablishmentFragment
    }
  }
  ${ESTABLISHMENT_FRAGMENT}
`;
