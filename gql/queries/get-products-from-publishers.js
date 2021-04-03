import { gql } from '@apollo/client';
import ProductFragment from '../fragments/product-fragment';



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

export default GET_PRODUCTS_FROM_PUBLISHERS;
