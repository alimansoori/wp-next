import { gql } from '@apollo/client';

const GET_PRODUCTS = gql` 
query GET_PRODUCTS($search: String, $taxonomyFilter: [ProductTaxonomyFilterRelationInput], $offset: Int, $size: Int, $orderby: [ProductsOrderbyInput], $include: [Int] ) {
  products(where: {search: $search, include: $include, orderby: $orderby, taxonomyFilter: $taxonomyFilter, offsetPagination: {offset: $offset, size: $size}}) {
    edges {
      node {
        id
        databaseId
        name
        description
        type
        slug
        image {
          altText
          sourceUrl
          title
        }
        paPublishers {
          nodes {
            name
            slug
            uri
          }
        }
        paTranslators {
          nodes {
            name
            slug
            uri
          }
        }
        paWriters {
          nodes {
            name
            slug
            uri
          }
        }
        ... on SimpleProduct {
          price(format: RAW)
          regularPrice(format: RAW)
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
