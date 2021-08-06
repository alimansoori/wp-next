import {gql} from '@apollo/client';
import CartFragment from "../fragments/cart-fragment";

const ADD_TO_CART = gql`
mutation ($input: AddToCartInput!) {
  addToCart(input: $input) {
    cart {
      ...MyCart
    }
    cartItem {
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
            altText
          }
          galleryImages {
            nodes {
              id
              sourceUrl
              altText
            }
          }
        }
      }
      variation {
        node {
          id
          databaseId
          name
          description
          type
          onSale
          price(format: RAW)
          regularPrice
          salePrice
          image {
            id
            sourceUrl
            altText
          }
          attributes {
            nodes {
              id
              attributeId
              name
              value
            }
          }
        }
      }
      quantity
      total
      subtotal
      subtotalTax
    }
  }
}
${CartFragment.fragments.MyCart}
`;

export default ADD_TO_CART;
