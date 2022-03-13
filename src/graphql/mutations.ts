import { gql } from '@apollo/client';

export const CREATE_ESTABLISHMENT = gql`
  mutation createEstablishment($params: CreateEstablishmentParams!) {
    createEstablishment(params: $params) {
      id
      profileId
    }
  }
`;
