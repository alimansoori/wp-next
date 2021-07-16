import gql from "graphql-tag";
import CustomerFragment from "../fragments/customer-fragment";

const GET_CUSTOMER = gql`
  query GET_CUSTOMER($customerId: Int, $id: ID) {
    customer(customerId: $customerId, id: $id) {
      ...MyCustomer
    }
  }
  ${CustomerFragment.fragments.MyCustomer}
`;

export default GET_CUSTOMER;
