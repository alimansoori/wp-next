import { gql } from '@apollo/client';

function CustomerAddressFragment() {
  return null
}

CustomerAddressFragment.fragments = {
  MyCustomerAddress: gql`
    fragment MyCustomerAddress on CustomerAddress {
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
  `,
};

export default CustomerAddressFragment