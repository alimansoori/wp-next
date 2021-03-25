import gql from "graphql-tag";

const SEARCH_PRODUCTS = gql`
fragment ProductsPageInfo on WPPageInfo {
  endCursor
  hasNextPage
  hasPreviousPage
  startCursor
}

fragment ImageProduct on MediaItem {
  altText
  databaseId
  srcSet
  sourceUrl
}

fragment publisher on PaPublisher {
  id
  databaseId
  count
  name
  slug
  uri
}

fragment translator on PaTranslator {
  id
  databaseId
  count
  name
  slug
  uri
}

fragment writer on PaWriter {
  id
  databaseId
  count
  name
  slug
  uri
}

fragment ProductDetail on SimpleProduct {
  name
  databaseId
  slug
  price(format: RAW)
  regularPrice(format: RAW)
  image {
    ...ImageProduct
  }
  usdPrice {
    fieldGroupName
    regularPriceUsd
    salePriceUsd
  }
  paPublishers {
    edges {
      node {
        ...publisher
      }
    }
  }
  paWriters {
    edges {
      node {
        ...writer
      }
    }
  }
  paTranslators {
    edges {
      node {
        ...translator
      }
    }
  }
}

query getProductsFilter($after: String, $before: String, $first: Int, $last: Int, $where: RootQueryToProductConnectionWhereArgs!) {
  products(where: $where, after: $after, before: $before, first: $first, last: $last) {
    edges {
      cursor
      node {
        ...ProductDetail
      }
    }
    pageInfo {
      ...ProductsPageInfo
    }
  }
}

`;

export default SEARCH_PRODUCTS;
