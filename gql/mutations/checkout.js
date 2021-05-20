import gql from "graphql-tag";
import CustomerFragment from "../fragments/customer-fragment";
import OrderFragment from "../fragments/order-fragment";


const CHECKOUT = gql`
mutation CHECKOUT( $input: CheckoutInput! ) {
  checkout(input: $input) {
    clientMutationId
    order {
      ...MyOrder
    }
    customer {
      ...MyCustomer
    }
    result
    redirect
  }
}
${CustomerFragment.fragments.MyCustomer}
${OrderFragment.fragments.MyOrder}

`;
  
export default CHECKOUT;