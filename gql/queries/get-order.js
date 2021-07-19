import gql from "graphql-tag";

const GET_ORDER = gql`
  query GET_ORDER($idType: OrderIdTypeEnum, $id: ID) {
    order(idType: $idType, id: $id) {
      billing {
        address1
        address2
        city
        company
        country
        email
        firstName
        lastName
        phone
        postcode
        state
      }
      shipping {
        address1
        address2
        city
        company
        country
        email
        firstName
        lastName
        phone
        postcode
        state
      }
      cartHash
      cartTax(format: RAW)
      currency
      datePaid
      total(format: RAW)
      transactionId
      orderNumber
      shippingTotal(format: RAW)
      status
      needsShippingAddress
    }
  }
`;

export default GET_ORDER;
