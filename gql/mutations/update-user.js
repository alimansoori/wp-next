import {gql} from '@apollo/client';

const UPDATE_USER = gql`

mutation ($input: UpdateUserInput!) {
  updateUser(input: $input) {
    clientMutationId
    user {
      id
      databaseId
      name
      firstName
      lastName
      description
      username
      email
      locale
      jwtAuthExpiration
      jwtAuthToken
      jwtRefreshToken
      jwtUserSecret
      isJwtAuthSecretRevoked
      isRestricted
    }
  }
}
`;

export default UPDATE_USER;
