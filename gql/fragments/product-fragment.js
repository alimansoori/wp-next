import { gql } from '@apollo/client';

function ProductFragment() {
  return null
}

ProductFragment.fragments = {
  ProductForProductsPage: gql`
    fragment ProductForProductsPage on Product {
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
    }
  `,
};

export default ProductFragment