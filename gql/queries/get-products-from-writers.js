import { gql } from '@apollo/client';
import ProductFragment from '../fragments/product-fragment';



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
              ...ProductForProductsPage
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
${ProductFragment.fragments.ProductForProductsPage}
`;

export default GET_PRODUCTS_FROM_WRITERS;
