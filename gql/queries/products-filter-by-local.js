import gql from "graphql-tag";

const PRODUCTS_FILTER_BY_LOCAL = gql` query ProductsByLocation($slugLocation: ID!, $search: String!) {
	paLocation(idType: SLUG, id: $slugLocation) {
    variations(where: {search: $search, status: "publish", categoryId: 27}) {
      nodes {
        databaseId
        name
        price(format: RAW)
        regularPrice(format: RAW)
        onSale
        parent {
          node {
            name
            databaseId
            price(format: RAW)
          }
        }
        attributes {
          nodes {
            value
            name
            label
            attributeId
          }
        }
        image {
          altText
          sourceUrl
          title(format: RAW)
        }
      }
    }
  }
}
`;

export default PRODUCTS_FILTER_BY_LOCAL;
