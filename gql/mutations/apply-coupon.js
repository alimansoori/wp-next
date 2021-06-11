import gql from "graphql-tag";
import CartFragment from "../fragments/cart-fragment";

const APPLY_COUPON = gql`
mutation ($input: ApplyCouponInput!) {
  applyCoupon(input: $input) {
    cart {
      ...MyCart
    }
    applied {
      code
      discountAmount
      discountTax
    }
  }
}
${CartFragment.fragments.MyCart}
`;

export default APPLY_COUPON;
