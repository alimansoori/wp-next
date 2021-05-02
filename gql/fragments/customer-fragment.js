import { gql } from '@apollo/client';
import CustomerAddressFragment from "../fragments/customer-address-fragment";

function CustomerFragment() {
  return null
}

CustomerFragment.fragments = {
  MyCustomer: gql`
    fragment MyCustomer on Customer {
      billing {
        ...MyCustomerAddress
      }
      calculatedShipping
      databaseId
      date
      displayName
      email
      firstName
      hasCalculatedShipping
      id
      isJwtAuthSecretRevoked
      isPayingCustomer
      isVatExempt
      jwtAuthExpiration
      jwtAuthToken
      jwtRefreshToken
      jwtUserSecret
      lastName
      orderCount
      role
      sessionToken
      shipping {
        ...MyCustomerAddress
      }
      totalSpent
      username
      modified
    }
    ${CustomerAddressFragment.fragments.MyCustomerAddress}
  `,
};

export default CustomerFragment