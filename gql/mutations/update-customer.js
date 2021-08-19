import {gql} from '@apollo/client';

const UPDATE_CUSTOMER = gql`

mutation ($input: UpdateCustomerInput!) {
  updateCustomer(input: $input) {
    clientMutationId
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

export default UPDATE_CUSTOMER;
