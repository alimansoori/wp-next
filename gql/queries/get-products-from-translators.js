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
              name
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
