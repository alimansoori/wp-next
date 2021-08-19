import {gql} from '@apollo/client';

const ADD_TO_CART = gql`
mutation ($input: AddToCartInput!) {
  addToCart(input: $input) {
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
`;

export default ADD_TO_CART;
