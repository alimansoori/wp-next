import {gql} from '@apollo/client';

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
  }
}
`;

export default EMPTY_CART;
