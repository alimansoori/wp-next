import gql from "graphql-tag";
import CustomerFragment from "../fragments/customer-fragment";

const UPDATE_CUSTOMER = gql`

mutation ($input: UpdateCustomerInput!, $keysIn: [String], $key: String, $multiple: Boolean) {
  updateCustomer(input: $input) {
    clientMutationId
    customer {
      ...MyCustomer
    }
  }
}
${CustomerFragment.fragments.MyCustomer}
`;

export default UPDATE_CUSTOMER;
