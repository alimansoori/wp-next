import { gql } from '@apollo/client';

const GET_PRODUCTS = gql` 
query GET_PRODUCTS($search: String, $taxonomyFilter: [ProductTaxonomyFilterRelationInput], $offset: Int, $size: Int, $orderby: [ProductsOrderbyInput], $include: [Int] ) {
  products(where: {search: $search, include: $include, orderby: $orderby, taxonomyFilter: $taxonomyFilter, offsetPagination: {offset: $offset, size: $size}}) {
    edges {
      node {
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
