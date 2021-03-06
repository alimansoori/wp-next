import { gql } from '@apollo/client';


const GET_PRODUCTS_FROM_PUBLISHERS = gql` 
query GET_PRODUCTS_FROM_PUBLISHERS($search: String, $first: Int) {
	paPublishers(where: {search: $search}) {
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

export default GET_PRODUCTS_FROM_PUBLISHERS;
