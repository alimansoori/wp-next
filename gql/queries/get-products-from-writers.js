import { gql } from '@apollo/client';


const GET_PRODUCTS_FROM_WRITERS = gql` 
query GET_PRODUCTS_FROM_WRITERS($search: String, $first: Int) {
	paWriters(where: {search: $search}, first: $first) {
    edges {
      cursor
      node {
        name
        products(first: $first) {
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
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`;

export default GET_PRODUCTS_FROM_WRITERS;
