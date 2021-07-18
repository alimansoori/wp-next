import gql from "graphql-tag";
import CustomerFragment from "../fragments/customer-fragment";
import CartFragment from "../fragments/cart-fragment";

const UPDATE_SHIPPING_METHOD = gql`

mutation ($input: UpdateShippingMethodInput!) {
  updateShippingMethod(input: $input) {
    clientMutationId
    cart {
      ...MyCart
    }
  }
}
${CartFragment.fragments.MyCart}
`;

export default UPDATE_SHIPPING_METHOD;
