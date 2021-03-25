import gql from "graphql-tag";

/**
 * Update Cart
 *
 * This query is used for both updating the items in the cart and delete a cart item.
 * When the cart item needs to be deleted, we should pass quantity as 0 in the input along with other fields.
 */
const UPDATE_CART = gql`

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

mutation ($input: UpdateItemQuantitiesInput!) {
  updateItemQuantities(input: $input) {
    cart {
      ...cart
    }
    items {
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
    removed {
      key
      product {
        node {
          id
          databaseId
        }
      }
      variation {
        node {
          id
          databaseId
        }
      }
    }
    updated {
      key
      product {
        node {
          id
          databaseId
        }
      }
      variation {
        node {
          id
          databaseId
        }
      }
    }
  }
}
`;

export default UPDATE_CART;
