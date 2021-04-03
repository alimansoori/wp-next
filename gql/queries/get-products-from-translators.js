import { gql } from '@apollo/client';
import ProductFragment from '../fragments/product-fragment';



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

export default GET_PRODUCTS_FROM_TRANSLATORS;
