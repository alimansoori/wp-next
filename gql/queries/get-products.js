import { gql } from '@apollo/client';

const GET_PRODUCTS = gql` 
query GET_PRODUCTS($search: String, $first: Int) {
	products(where: {search: $search}, first: $first) {
        edges {
          cursor
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
          endCursor
          hasNextPage
          hasPreviousPage
          seo {
            schema {
              raw
            }
          }
          startCursor
        }
    }
}
`;

export default GET_PRODUCTS;
