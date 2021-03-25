import gql from "graphql-tag";

const CLEAR_CART_MUTATION = gql`
fragment cart on Cart {
  contents {
    nodes {
      key
      product {
        node {
          id
          databaseId
          name
          description
          type
          onSale
          slug
          averageRating
          reviewCount
          image {
            id
            sourceUrl
            srcSet
            altText
            title
          }
          galleryImages {
            nodes {
              id
              sourceUrl
              srcSet
              altText
              title
            }
          }
          ... on SimpleProduct {
            price
            regularPrice
          }
        }
      }
      quantity
      total
      subtotal
      subtotalTax
    }
  }
  appliedCoupons {
    nodes {
      id
      databaseId
      discountType
      amount
      dateExpiry
      products {
        nodes {
          id
        }
      }
      productCategories {
        nodes {
          id
        }
      }
    }
  }
  subtotal
  subtotalTax
  shippingTax
  shippingTotal
  total
  totalTax
  feeTax
  feeTotal
  discountTax
  discountTotal
}

mutation CLEAR_CART_MUTATION( $input: RemoveItemsFromCartInput! ) {
  removeItemsFromCart(input: $input) {
    cartItems {
      quantity
      key
    }
    cart {
      ...cart
    }
  }
}
`;

export default CLEAR_CART_MUTATION;
