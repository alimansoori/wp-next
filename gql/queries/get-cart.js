import {gql} from '@apollo/client';
import CartFragment from "../fragments/cart-fragment";

const GET_CART = gql`
  query GET_CART {
    cart {
      ...MyCart
    }
  }
  ${CartFragment.fragments.MyCart}
`;

export default GET_CART;
