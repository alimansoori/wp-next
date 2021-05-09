import gql from "graphql-tag";
import CustomerFragment from "../fragments/customer-fragment";

const UPDATE_CUSTOMER = gql`

mutation ($input: UpdateCustomerInput!) {
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
