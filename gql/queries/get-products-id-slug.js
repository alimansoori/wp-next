import {gql} from '@apollo/client';

const GET_PRODUCTS_ID_SLUG = gql` 
query GET_PRODUCTS($offset: Int, $size: Int) {
  products(where: {offsetPagination: {offset: $offset, size: $size}}) {
    nodes {
      id,
      slug
    }
  }
}
`;

export default GET_PRODUCTS_ID_SLUG;
