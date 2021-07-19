import gql from "graphql-tag";
import CartFragment from "../fragments/cart-fragment";

/**
 * Update Cart
 *
 * This query is used for both updating the items in the cart and delete a cart item.
 * When the cart item needs to be deleted, we should pass quantity as 0 in the input along with other fields.
 */
const EMPTY_CART = gql`

mutation EMPTY_CART($input: EmptyCartInput!) {
  emptyCart(input: $input) {
    cart {
      ...MyCart
    }
  }
}
${CartFragment.fragments.MyCart}
`;

export default EMPTY_CART;
