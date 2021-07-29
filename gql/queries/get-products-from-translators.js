import { gql } from '@apollo/client';


const GET_PRODUCTS_FROM_TRANSLATORS = gql` 
query GET_PRODUCTS_FROM_TRANSLATORS($search: String, $first: Int) {
	paTranslators(where: {search: $search}) {
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
                regularPrice(format: RAW)
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

export default GET_PRODUCTS_FROM_TRANSLATORS;
