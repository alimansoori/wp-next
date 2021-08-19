import {gql} from '@apollo/client';

const CLEAR_CART_MUTATION = gql`
fragment cart on Cart {
  chosenShippingMethods
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
            price(format: RAW)
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
  availableShippingMethods {
    packageDetails
    supportsShippingCalculator
    rates {
      cost
      id
      instanceId
      label
      methodId
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
  isEmpty
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
