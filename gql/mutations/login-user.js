import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation ($input: LoginInput!) {
    login(input: $input) {
        authToken
        refreshToken
        sessionToken
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
        customer {
          billing {
            country
            state
            city
            address1
            address2
            company
            email
            firstName
            lastName
            phone
            postcode
          }
          calculatedShipping
          databaseId
          date
          displayName
          email
          firstName
          hasCalculatedShipping
          id
          isPayingCustomer
          isVatExempt
          lastName
          orderCount
          metaData {
            key
            value
          }
          role
          sessionToken
          shipping {
            country
            state
            city
            address1
            address2
            company
            email
            firstName
            lastName
            phone
            postcode
          }
          totalSpent
          username
          modified
        }
    }
  }
`;

export default LOGIN_USER;
