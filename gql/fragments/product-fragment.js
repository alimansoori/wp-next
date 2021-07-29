import { gql } from '@apollo/client';

function ProductFragment() {
  return null
}

ProductFragment.fragments = {
  ProductForProductsPage: gql`
    fragment ProductForProductsPage on Product {
      id
      databaseId
      name
      type
      slug
      image {
        altText
        sourceUrl(size: MEDIUM)
        title
      }
      paPublishers {
        nodes {
          name
        }
      }
      paTranslators {
        nodes {
          name
        }
      }
      paWriters {
        nodes {
          name
        }
      }
      ... on SimpleProduct {
        price(format: RAW)
      }
    }
  `,
};

export default ProductFragment