import { gql } from 'graphql-request';

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refresh {
      token
      refresh_token
    }
  }
`;
