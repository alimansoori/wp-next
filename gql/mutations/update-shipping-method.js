import {gql} from '@apollo/client';

const UPDATE_SHIPPING_METHOD = gql`

mutation ($input: UpdateShippingMethodInput!) {
  updateShippingMethod(input: $input) {
    clientMutationId
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

export default UPDATE_SHIPPING_METHOD;
