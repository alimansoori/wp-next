import { gql } from '@apollo/client';

const GET_PRODUCTS = gql` 
query GET_PRODUCTS($search: String, $offset: Int, $size: Int) {
  products(where: {search: $search, offsetPagination: {offset: $offset, size: $size}}) {
    edges {
      node {
        id
        databaseId
        name
        type
        slug
        image {
          altText
          sourceUrl(size: SHOP_CATALOG)
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
    }
    pageInfo {
      offsetPagination {
        hasMore
        hasPrevious
        total
      }
    }
  }
}
`;

export default GET_PRODUCTS;
