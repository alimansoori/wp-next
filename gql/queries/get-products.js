import { gql } from '@apollo/client';
import ProductFragment from '../fragments/product-fragment';



const GET_PRODUCTS = gql` 
query GET_PRODUCTS {
	products {
        edges {
          cursor
          node {
              ...ProductForProductsPage
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
${ProductFragment.fragments.ProductForProductsPage}
`;

export default GET_PRODUCTS;
