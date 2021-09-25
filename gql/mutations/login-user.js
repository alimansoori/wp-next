import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation ($input: LoginInput!) {
    login(input: $input) {
        authToken
        clientMutationId
        message
        refreshToken
        secondSendAgain
        type
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

export default LOGIN_USER;
