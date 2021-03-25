import gql from "graphql-tag";

const ADD_TO_CART = gql`
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

  mutation ($input: AddToCartInput!) {
    addToCart(input: $input) {
      cart {
        ...cart
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
            price
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
