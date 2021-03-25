import { gql } from '@apollo/client';

function UserFragment() {
  return null
}

UserFragment.fragments = {
  UserThatLogin: gql`
    fragment UserThatLogin on User {
      id
      databaseId
      name
      firstName
      lastName
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
  `,
};

export default UserFragment